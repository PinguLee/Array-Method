document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qna');
  const questionDiv = document.getElementById('question');
  const resultDiv = document.getElementById('result');
  const answerInput = document.getElementById('answer');
  let questionIndex = null;

  const getRandomQuestion = () => {
    fetch('/randomQuestion')
      .then((response) => response.json())
      .then((data) => {
        questionDiv.textContent = data.question;
        questionIndex = data.index;
        answerInput.focus(); // 답 입력 창에 자동으로 포커스를 맞춤
      })
      .catch((error) => {
        console.error('Error fetching random question:', error);
      });
  };

  getRandomQuestion();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const answer = answerInput.value;

    try {
      const response = await fetch('/checkAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: questionIndex, answer }),
      });

      const data = await response.json();

      if (data.result) {
        alert('정답');
        answerInput.value = '';
        resultDiv.innerHTML = '';
        getRandomQuestion();
      } else {
        resultDiv.innerHTML = data.exampleCode.replace(/\n/g, '<br>');
        alert('오답');
        answerInput.value = '';
        answerInput.focus(); // 오답일 경우 다시 답 입력 창에 포커스를 맞춤
      }
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  });
});
