document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qna');
  const questionDiv = document.getElementById('question');
  const resultDiv = document.getElementById('result');
  let questionIndex = null;

  const getRandomQuestion = () => {
    fetch('/randomQuestion')
      .then((response) => response.json())
      .then((data) => {
        questionDiv.textContent = data.question;
        questionIndex = data.index;
      })
      .catch((error) => {
        console.error('Error fetching random question:', error);
      });
  };

  getRandomQuestion();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const answer = document.getElementById('answer').value;

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
          alert('정답');
          getRandomQuestion();
        } else {
          // If the answer is incorrect, display the exampleCode
          resultDiv.textContent = data.exampleCode;
          alert('오답');
        }
      })
      .catch((error) => {
        console.error('Error checking answer:', error);
      });
  });
});
