// routes.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qnaPath = path.join(__dirname, 'qna.json');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/randomQuestion', (req, res) => {
  // Read qna.json file
  fs.readFile(qnaPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching questions');
    } else {
      const qna = JSON.parse(data);
      // Randomly select a question
      const randomIndex = Math.floor(Math.random() * qna.length);
      const randomQuestion = qna[randomIndex].question;
      res.json({ question: randomQuestion, index: randomIndex });
    }
  });
});

router.post('/checkAnswer', (req, res) => {
  const { index, answer } = req.body;
  fs.readFile(qnaPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching questions');
    } else {
      const qna = JSON.parse(data);
      const correctAnswer = qna[index].answer;

      // Check if the submitted answer matches the correct answer
      const result = answer === correctAnswer;

      res.json({ result });
    }
  });
});

export default router;
