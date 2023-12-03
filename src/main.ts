import { touchTypingLayout, layoutKeys } from '@/config/layout';
import '@/styles/index.css';
import './three';

const settingsShowBtn = document.querySelector('#settings-show-button');
const settingContainer: HTMLDivElement | null = document.querySelector('#settings');
const settingLoaderBtn = document.querySelector('#settings-loader');
const settingsTextArea = document.querySelector('#settings-textarea');
const targetContainer = document.querySelector('#target-content');
const resetBtn = document.querySelector('#reset-btn');
const resultContainer = document.querySelector('#result');
const keyboardContainer = document.querySelector('#keyboard');

let lastCorrectIndex = 0;
let currentIndex = 0;
let timeInSeconds = 200;
let totalCharacters = 0;

//

function generateRandomText(n: number, t: number) {
  const words = [];
  const characters = touchTypingLayout[['leftHand', 'rightHand'][Math.round(Math.random() * 1)] as 'rightHand' | 'leftHand'];
  const charactersLength = characters.length;

  for (let i = 0; i < n; i++) {
    let word = '';
    const wordLength = Math.floor(Math.random() * 10) + 1; // Random word length between 1 and 10 characters

    for (let j = 0; j < wordLength; j++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      word += characters[randomIndex];
    }

    words.push(word);
  }

  const lines = [];
  for (let i = 0; i < t; i++) {
    const line = words.slice((i * n) / t, ((i + 1) * n) / t).join(' ');
    lines.push(line);
  }

  return lines.join('\n');
}

const showSpeedResult = () => {
  const result = document.querySelector('#result');
  if (result) {
    const speed = Math.floor((lastCorrectIndex / totalCharacters) * 60);
    result.innerHTML = `<h1>Speed: ${speed} WPM</h1>`;
    return result;
  }
};
const renderTime = (timeInSeconds: number) => {
  const timeContainer = document.querySelector('#time-container');
  let result = '';
  let time = timeInSeconds;
  if (time == 0) {
    return showSpeedResult();
  }
  while (time != 0) {
    result = result == '' ? (time % 60) + result : (time % 60) + ':' + result;
    time = Math.floor(time / 60);
  }
  if (timeContainer) timeContainer.textContent = result;
  return time;
};
let intervalId: number;
const runTimeInterval = () => {
  if (intervalId) clearInterval(intervalId);
  renderTime(timeInSeconds--);
  intervalId = setInterval(() => {
    let time = renderTime(timeInSeconds--);
    if (time == 0) cancelTimeInterval();
  }, 1000);
};
const cancelTimeInterval = () => {
  clearInterval(intervalId);
};
const showTypingContent = () => {
  const targetContent = generateRandomText(100, 10);
  console.log(targetContainer);
  totalCharacters = targetContent.split('').length;

  let linesTowriteHtml = targetContent
    .split('')
    .map((char, index) => `<span class="character character-${index}">${char}</span>`)
    .join('');
  if (targetContainer) targetContainer.innerHTML = linesTowriteHtml;
};

//Render the keys
const keyboardLayoutDesignhtml = layoutKeys
  .map(row => `<div class="row">${row.map(key => `<div class="key ${key.size} key-${key.code}">${key.label}</div>`).join('')}</div>`)
  .join('');
if (keyboardContainer) keyboardContainer.innerHTML = keyboardLayoutDesignhtml;

// Handling the events
document.addEventListener('keydown', function (event) {
  if (currentIndex == -1) currentIndex = 0;
  const targetCharacter = document.querySelector(`.character-${currentIndex}`);
  if (!targetCharacter) return;
  console.log(totalCharacters, currentIndex);
  if (event.code.startsWith('Control') || event.code.startsWith('Shift') || event.code.startsWith('Meta') || event.code.startsWith('Alt')) {
  } else if (event.code === 'Backspace') {
    targetCharacter.classList.remove('written');
    targetCharacter.classList.remove('error');

    currentIndex--;
  } else {
    if (targetCharacter.innerHTML == event.key) {
      targetCharacter.classList.add('written');
      currentIndex++;
      lastCorrectIndex++;
    } else {
      currentIndex++;
      targetCharacter.classList.add('error');
    }
  }
  event.preventDefault();
  const pressedKey = document.querySelector(`.key-${event.code}`);
  if (!pressedKey) return;
  pressedKey.classList.add('active');
});
document.addEventListener('keyup', function (event) {
  event.preventDefault();
  const pressedKey = document.querySelector(`.key-${event.code}`);
  if (!pressedKey) return;
  pressedKey.classList.remove('active');
});

// settingLoaderBtn.addEventListener('click', function (event) {
//   settingsTextArea.style.display = 'block';
// });
if (settingsShowBtn)
  settingsShowBtn.addEventListener('click', function (event) {
    if (settingContainer) settingContainer.style.display = 'block';
  });
if (resetBtn)
  resetBtn.addEventListener('click', function (event) {
    currentIndex = 0;
    lastCorrectIndex = 0;
    timeInSeconds = 200;
    showTypingContent();
    runTimeInterval();
  });
showTypingContent();
runTimeInterval();
