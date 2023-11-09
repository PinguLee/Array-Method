// script.js (browser side)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qna');
  const questionDiv = document.getElementById('question');
  const resultDiv = document.getElementById('result');

  // Function to get a random question
  const getRandomQuestion = () => {
    fetch('/randomQuestion')
      .then((response) => response.json())
      .then((data) => {
        questionDiv.textContent = data.question;
        questionDiv.dataset.index = data.index;
      })
      .catch((error) => {
        console.error('Error fetching random question:', error);
      });
  };

  // Get a random question when the page loads
  getRandomQuestion();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const answer = document.getElementById('answer').value;
    const questionIndex = questionDiv.dataset.index;

    fetch('/checkAnswer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index: questionIndex, answer }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          resultDiv.textContent = '정답입니다!';
        } else {
          resultDiv.textContent = '틀렸습니다. 다시 시도해보세요.';
        }
        // Get a new random question after checking the answer
        getRandomQuestion();
      })
      .catch((error) => {
        console.error('Error checking answer:', error);
      });
  });
});
