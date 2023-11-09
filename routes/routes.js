import express from 'express';
import path from 'path';

const router = express.Router();

// 기본 라우트 설정
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

export default router;
