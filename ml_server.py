from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from mediapipe.tasks.python.vision import FaceLandmarker, FaceLandmarkerOptions
from mediapipe.tasks.python.core.base_options import BaseOptions
import cv2
import numpy as np
from PIL import Image
import io
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("FastAPI server ready!")

options = FaceLandmarkerOptions(
    base_options=BaseOptions(model_asset_path='ml/face_landmarker.task'),
    num_faces=1
)

def get_face_measurements(landmarks, img_width, img_height):
    def get_point(idx):
        lm = landmarks[idx]
        return (lm.x * img_width, lm.y * img_height)
    
    def distance(p1, p2):
        return np.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)
    
    left_cheek = get_point(234)
    right_cheek = get_point(454)
    chin = get_point(152)
    forehead = get_point(10)
    left_jaw = get_point(172)
    right_jaw = get_point(397)
    left_forehead = get_point(70)
    right_forehead = get_point(300)
    
    face_width = distance(left_cheek, right_cheek)
    face_height = distance(forehead, chin)
    jaw_width = distance(left_jaw, right_jaw)
    forehead_width = distance(left_forehead, right_forehead)
    
    return {
        'face_width': face_width,
        'face_height': face_height,
        'jaw_width': jaw_width,
        'forehead_width': forehead_width,
        'height_to_width_ratio': face_height / face_width,
        'jaw_to_cheek_ratio': jaw_width / face_width,
        'forehead_to_cheek_ratio': forehead_width / face_width
    }

def classify_face_shape(measurements):
    h_w = measurements['height_to_width_ratio']
    jaw_cheek = measurements['jaw_to_cheek_ratio']
    fore_cheek = measurements['forehead_to_cheek_ratio']
    
    if h_w >= 1.5:
        return 'Oblong'
    elif h_w >= 1.2:
        if jaw_cheek < 0.75:
            return 'Heart'
        elif fore_cheek < jaw_cheek:
            return 'Heart'
        else:
            return 'Oval'
    elif h_w >= 0.9:
        if jaw_cheek >= 0.9 and fore_cheek >= 0.9:
            return 'Square'
        else:
            return 'Round'
    else:
        return 'Round'

def detect_skin_tone(img_rgb, landmarks, img_width, img_height):
    cheek_points = [
        landmarks[234],
        landmarks[454],
        landmarks[50],
        landmarks[280]
    ]
    
    pixels = []
    for point in cheek_points:
        x = int(point.x * img_width)
        y = int(point.y * img_height)
        region = img_rgb[max(0,y-10):y+10, max(0,x-10):x+10]
        if region.size > 0:
            avg_color = region.mean(axis=(0,1))
            pixels.append(avg_color)
    
    avg_skin = np.mean(pixels, axis=0)
    r, g, b = avg_skin
    
    if r > 200 and g > 170:
        tone = 'Fair'
    elif r > 170 and g > 130:
        tone = 'Light'
    elif r > 140 and g > 100:
        tone = 'Medium'
    elif r > 100 and g > 70:
        tone = 'Tan'
    else:
        tone = 'Deep'
    
    return tone

@app.post("/analyse-face")
async def analyse_face(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img_pil = Image.open(io.BytesIO(contents)).convert('RGB')
        img_np = np.array(img_pil)
        img_width, img_height = img_pil.size

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=img_np
        )

        with FaceLandmarker.create_from_options(options) as landmarker:
            result = landmarker.detect(mp_image)

        if not result.face_landmarks:
            return {"error": "No face detected. Please try again with a clearer photo."}

        landmarks = result.face_landmarks[0]
        measurements = get_face_measurements(landmarks, img_width, img_height)
        face_shape = classify_face_shape(measurements)
        skin_tone = detect_skin_tone(img_np, landmarks, img_width, img_height)

        return {
            "face_shape": face_shape,
            "skin_tone": skin_tone,
            "measurements": {
                "height_to_width_ratio": round(measurements['height_to_width_ratio'], 4),
                "jaw_to_cheek_ratio": round(measurements['jaw_to_cheek_ratio'], 4),
                "forehead_to_cheek_ratio": round(measurements['forehead_to_cheek_ratio'], 4)
            }
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)