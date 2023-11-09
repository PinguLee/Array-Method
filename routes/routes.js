import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/qna.json', (req, res) => {
  // 이곳에서 JSON 파일의 경로를 설정해야 합니다
  res.sendFile(path.join(__dirname, '../data', 'data.json'));
});

export default router;