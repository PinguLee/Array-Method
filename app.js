import express from 'express';
import path from 'path';
import routes from './routes/routes';

const app = express();
const port = process.env.port || 3000;

// 정적 파일 서빙을 위해 index.html을 제공할 디렉토리 설정
app.use(express.static(path.join(__dirname, '/')));

// 라우팅을 위해 routes.js 파일을 사용
app.use('/', routes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
