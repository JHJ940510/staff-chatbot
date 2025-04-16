let qnaData = [];

fetch('qna.json')
  .then(response => response.json())
  .then(data => qnaData = data);

function toggleChat() {
  const chat = document.getElementById('chat-container');
  chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
  if (chat.style.display === 'flex') {
    openChat();
  }
}

function openChat() {
  const body = document.getElementById('chat-body');
  body.innerHTML = '';
  addMessage('🤖 무엇을 도와드릴까요?', 'bot');
}

const userInput = document.getElementById('user-input');
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById('user-input');
  const question = input.value.trim();
  if (!question) return;
  addMessage('🙋‍♀️ ' + question, 'user');
  input.value = '';

  let answer = "답변이 확인되지않습니다. 메인 페이지 우측 상단에 '문의사항'에 입력해주시면 확인 후 안내드리겠습니다.";
  for (let item of qnaData) {
    if (question.includes(item.question)) {
      answer = item.answer;
      break;
    }
  }

  addMessage('🤖 ' + answer, 'bot');
}

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.textContent = text;
  document.getElementById('chat-body').appendChild(msg);
  document.getElementById('chat-body').scrollTop = document.getElementById('chat-body').scrollHeight;
}
