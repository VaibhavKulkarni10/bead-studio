# Bead Studio - Progress Tracker

## Tech Stack
- Frontend: React (Create React App)
- Backend: Express server (server.js) on port 3001
- AI: Claude API (claude-sonnet-4-20250514)
- Styling: Inline styles (purple theme #6c3fc5)
- Deployment: Not yet (will use Vercel)

## How to Run
1. Open VS Code
2. Open Git Bash terminal
3. cd bead-studio
4. Terminal 1: node server.js (keeps running)
5. Terminal 2: npm run build && npx serve -s build
6. Open browser at whatever port serve gives you

## Pages Built
- [x] App.js - navigation bar with all routes
- [x] Home.js - landing page with 5 feature cards
- [x] DesignInspiration.js - working AI feature ✅
- [x] Inventory.js - bead tracker + shopping assistant ✅
- [x] Tutorials.js - AI generated tutorials ✅
- [x] Pricing.js - cost calculator + Etsy descriptions ✅
- [ ] FaceAnalysis.js - webcam + face shape detection (next session)

## Features Done
- [x] React app setup
- [x] Navigation between pages
- [x] Express backend server
- [x] Claude API connection working
- [x] Design Inspiration ✅
- [x] Inventory Tracker ✅
- [x] Shopping Assistant ✅
- [x] Tutorials ✅
- [x] Pricing Helper ✅

## Next Session - Continue With
- Face Analysis (webcam + MediaPipe face detection)
- This is the big portfolio hero feature

## Important Files
- src/api.js - handles all Claude API calls
- server.js - backend server (run with node server.js)
- .env - contains API key (never push this to GitHub)

## GitHub
- https://github.com/VaibhavKulkarni10/bead-studio