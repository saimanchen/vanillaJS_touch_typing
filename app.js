const message = document.querySelector('.message');
const button = document.querySelector('button');
const textareaInputField = document.querySelector('textarea');
let startTime, endTime;

const texts = [
  'Touch typing is a style of typing without looking at the keyboard. Each keyboard key has assigned a corresponding finger. To type faster you should follow this convention.',
  'If you want to quickly start learning touch typing, just click the button below.',
  'Touch typing is a very important skill nowadays. Practically all of desk jobs involve using a computer.', 
  'If you use a laptop or a desktop at work, you use a keyboard to enter text. Although voice typing has become so sophisticated and it is working like a charm, using a keyboard is still the most accurate way to enter text.'
];

const startGame = () => {
  const randomNum = Math.floor(Math.random() * texts.length);
  message.innerText = texts[randomNum];
  textareaInputField.focus();
  const date = new Date();
  startTime = date.getTime();
};

const wordCounter = string => {
  let response;

  if(string === '') {
    response = 0;
  } else {
    response = string.split(' ').length;
  }
  return response;
};

const compareString = (string1, string2) => {
  const words1 = string1.split(' ');
  const words2 = string2.split(' ');
  let count = 0;

  words1.forEach((item, index) => {
    if(item === words2[index]) {
      count++;
    }
  });

  return Math.round(count / words1.length * 100);
}

const eraseTextarea = () => textareaInputField.value = '';

const endGame = () => {
  const date = new Date();
  endTime = date.getTime();
  const playTimeInSeconds = (endTime - startTime) / 1000;
  const inputValue = textareaInputField.value;
  const wordCount = wordCounter(inputValue);
  const speed = Math.round(wordCount / playTimeInSeconds * 60);
  const percentage = compareString(message.innerText, inputValue);

  message.innerText = `You typed ${speed} words/min with an accuracy of ${percentage} %`;
  eraseTextarea();
};

button.addEventListener('click', () => {
  if(button.innerText === 'Start typing') {
    button.innerText = 'Stop typing';
    textareaInputField.disabled = false;
    startGame();
  } else {
    button.innerText = 'Start typing';
    textareaInputField.disabled = true;
    endGame();
  }
});