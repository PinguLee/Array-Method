document.addEventListener('DOMContentLoaded', function () {
  const answerForm = document.getElementById('answerForm');
  answerForm.addEventListener('submit', function (event) {
    event.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지

    const userAnswer = document.getElementById('answerInput').value;
    const questionIndex = document.getElementById('question').dataset.index;

    fetch('/check-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: userAnswer, questionIndex: questionIndex }),
    })
      .then(response => response.json())
      .then(data => {
        const resultContainer = document.getElementById('result');
        resultContainer.innerText = data.result;

        if (data.nextQuestion) {
          document.getElementById('question').innerText = data.nextQuestion;
        } else {
          document.getElementById('question').innerText = 'All questions answered!';
        }
      })
      .catch(error => console.error('Error:', error));
  });

  displayRandomQuestion();
});

function displayRandomQuestion() {
  fetch('/qna')
    .then(response => response.text())
    .then(data => {
      const questionContainer = document.getElementById('question');
      questionContainer.innerText = data;
    });
}
