document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qna');
  const questionDiv = document.getElementById('question');
  const resultDiv = document.getElementById('result');
  const answerInput = document.getElementById('answer');
  let usedIndices = new Set(); // 이미 출제한 문제의 인덱스를 저장하는 Set 객체

  const getRandomQuestion = () => {
    fetch('/randomQuestion')
      .then((response) => response.json())
      .then((data) => {
        if (!usedIndices.has(data.index)) { // 이미 출제한 문제가 아니라면 문제 출제
          questionDiv.textContent = data.question;
          questionIndex = data.index;
          answerInput.focus(); // 답 입력 창에 자동으로 포커스를 맞춤
          usedIndices.add(questionIndex); // 출제한 문제의 인덱스를 Set에 추가
        } else { // 이미 출제한 문제일 경우 다시 문제를 출제
          getRandomQuestion();
        }
      })
      .catch((error) => {
        console.error('Error fetching random question:', error);
      });
  };

  getRandomQuestion();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const answer = answerInput.value;

    if (answer === '') {
      return; // 입력창이 비어있으면 제출하지 못하도록 return
    }

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
        // 정답일 때, 테두리와 배경색을 초기화
        resultDiv.style.border = 'none';
        resultDiv.style.backgroundColor = 'initial';
        getRandomQuestion();
      } else {
        resultDiv.innerHTML = data.exampleCode.replace(/\n/g, '<br>');
        alert('오답');
        answerInput.value = '';
        answerInput.focus(); // 오답일 경우 다시 답 입력 창에 포커스를 맞춤
        // 오답일 때, 테두리와 배경색을 추가
        resultDiv.style.border = '2px solid #FF6347';
        resultDiv.style.padding = '20px';
        resultDiv.style.borderRadius = '8px';
        resultDiv.style.backgroundColor = '#FFE4E1';
      }
    } catch (error) {
      console.error('Error checking answer:', error);
    }
  });
});
