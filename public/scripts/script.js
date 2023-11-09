// JavaScript 문제 및 정답 배열
const questions = [
  "배열의 끝에 요소를 추가하고 새 길이를 반환하는 메서드는?",
  "배열에서 마지막 요소를 제거하고 반환하는 메서드는?",
  // ... 나머지 문제들 추가
];
const answers = [
  "push",
  "pop",
  // ... 나머지 정답들 추가
];

// 랜덤 문제 생성 함수
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

// 정답 확인 함수
function checkAnswer() {
  const userAnswer = document.getElementById("answer").value;
  const currentQuestion = document.getElementById("question").innerText;

  const questionIndex = questions.indexOf(currentQuestion);
  const correctAnswer = answers[questionIndex];

  if (userAnswer === correctAnswer) {
    alert("정답입니다!");
  } else {
    alert(`틀렸습니다. 정답은 '${correctAnswer}' 입니다.`);
  }
}

// 초기화: 페이지 로드 시 랜덤 문제 표시
document.getElementById("question").innerText = getRandomQuestion();