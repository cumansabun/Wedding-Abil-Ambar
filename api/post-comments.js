import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'comments.json');
    const { name, message, presence } = req.body;

    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    const newComment = {
      id: Date.now(),
      name,
      message,
      presence,
      createdAt: new Date().toISOString()
    };

    data.unshift(newComment);
    writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ success: true, data: newComment });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
