import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qnaPath = path.join(__dirname, '../data/qna.json');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/qna', (req, res) => {
  // Read qna.json file
  fs.readFile(qnaPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
      return;
    }

    const qnaData = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * qnaData.length);
    const randomQuestion = qnaData[randomIndex].question;
    res.send(randomQuestion);
  });
});

router.post('/check-answer', (req, res) => {
    const questionIndex = req.body.questionIndex;
  
    fs.readFile(qnaPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the file');
        return;
      }
  
      const qnaData = JSON.parse(data);
  
      if (questionIndex < 0 || questionIndex >= qnaData.length) {
        res.status(400).send('Invalid question index');
        return;
      }
  
      const correctAnswer = qnaData[questionIndex].answer.toLowerCase().trim();
      const userAnswer = req.body.answer.toLowerCase().trim();
  
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) {
        const nextQuestionIndex = (questionIndex + 1) % qnaData.length;
        const nextQuestion = qnaData[nextQuestionIndex].question;
        res.send({ result: 'Correct!', nextQuestion });
      } else {
        res.send({ result: `Wrong! The correct answer is: ${correctAnswer}` });
      }
    });
  });
  

export default router;
xq