export async function askClaude(prompt) {
  const response = await fetch('http://localhost:3001/api/claude', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.content[0].text;
}