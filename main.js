const settingsShowBtn = document.querySelector('#settings-show-button');
const settingContainer = document.querySelector('#settings');
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
const layoutKeys = [
  [
    { label: 'Esc', value: 'Esc', shift: '', fn: '', size: 'size-1', code: 'Escape' },
    { label: 'F1', value: 'F1', shift: '', fn: '', size: 'size-1', code: 'F1' },
    { label: 'F2', value: 'F2', shift: '', fn: '', size: 'size-1', code: 'F2' },
    { label: 'F3', value: 'F3', shift: '', fn: '', size: 'size-1', code: 'F3' },
    { label: 'F4', value: 'F4', shift: '', fn: '', size: 'size-1', code: 'F4' },
    { label: 'F5', value: 'F5', shift: '', fn: '', size: 'size-1', code: 'F5' },
    { label: 'F6', value: 'F6', shift: '', fn: '', size: 'size-1', code: 'F6' },
    { label: 'F7', value: 'F7', shift: '', fn: '', size: 'size-1', code: 'F7' },
    { label: 'F8', value: 'F8', shift: '', fn: '', size: 'size-1', code: 'F8' },
    { label: 'F9', value: 'F9', shift: '', fn: '', size: 'size-1', code: 'F9' },
    { label: 'F10', value: 'F10', shift: '', fn: '', size: 'size-1', code: 'F10' },
    { label: 'Num', value: 'Num', shift: '', fn: '', size: 'size-1', code: 'NumLock' },
    { label: 'Pause \nBreak', value: 'Pause and break', shift: '', fn: '', size: 'size-1', code: 'Pause and break' },
    { label: 'Delete', value: 'Delete', shift: '', fn: '', size: 'size-1', code: 'Delete' },
  ],
  [
    { label: '`', value: '`', shift: '~', fn: '', size: 'size-2', code: 'Backquote' },
    { label: '1', value: '1', shift: '!', fn: '', size: 'size-2', code: 'Digit1' },
    { label: '2', value: '2', shift: '@', fn: '', size: 'size-2', code: 'Digit2' },
    { label: '3', value: '3', shift: '#', fn: '', size: 'size-2', code: 'Digit3' },
    { label: '4', value: '4', shift: '$', fn: '', size: 'size-2', code: 'Digit4' },
    { label: '5', value: '5', shift: '%', fn: '', size: 'size-2', code: 'Digit5' },
    { label: '6', value: '6', shift: '^', fn: '', size: 'size-2', code: 'Digit6' },
    { label: '7', value: '7', shift: '&', fn: '7', size: 'size-2', code: 'Digit7' },
    { label: '8', value: '8', shift: '*', fn: '8', size: 'size-2', code: 'Digit8' },
    { label: '9', value: '9', shift: '(', fn: '9', size: 'size-2', code: 'Digit9' },
    { label: '0', value: '0', shift: ')', fn: '/', size: 'size-2', code: 'Digit0' },
    { label: '-', value: '-', shift: '_', fn: '', size: 'size-2', code: 'Minus' },
    { label: '=', value: '=', shift: '+', fn: '', size: 'size-2', code: 'Equal' },
    { label: 'Backspace', value: '', shift: '', fn: '', size: 'size-3', code: 'Backspace' },
  ],
  [
    { label: 'Tab', value: '', shift: '', fn: '', size: 'size-3', code: 'Tab' },
    { label: 'q', value: 'q', shift: 'Q', fn: '', size: 'size-2', code: 'KeyQ' },
    { label: 'w', value: 'w', shift: 'W', fn: '', size: 'size-2', code: 'KeyW' },
    { label: 'e', value: 'e', shift: 'E', fn: '', size: 'size-2', code: 'KeyE' },
    { label: 'r', value: 'r', shift: 'R', fn: '', size: 'size-2', code: 'KeyR' },
    { label: 't', value: 't', shift: 'T', fn: '', size: 'size-2', code: 'KeyT' },
    { label: 'y', value: 'y', shift: 'Y', fn: '', size: 'size-2', code: 'KeyY' },
    { label: 'u', value: 'u', shift: 'U', fn: '4', size: 'size-2', code: 'KeyU' },
    { label: 'i', value: 'i', shift: 'I', fn: '5', size: 'size-2', code: 'KeyI' },
    { label: 'o', value: 'o', shift: 'O', fn: '6', size: 'size-2', code: 'KeyO' },
    { label: 'p', value: 'p', shift: 'P', fn: '*', size: 'size-2', code: 'KeyP' },
    { label: '[', value: '[', shift: '{', fn: '', size: 'size-2', code: 'BracketLeft' },
    { label: ']', value: ']', shift: '}', fn: '', size: 'size-2', code: 'BracketRight' },
    { label: '\\', value: '|', shift: '=', fn: '', size: 'size-2', code: 'Backslash' },
  ],
  [
    { label: 'Caps Lock', value: '', shift: '', fn: '', size: 'size-4', code: 'CapsLock' },
    { label: 'a', value: 'a', shift: 'A', fn: '', size: 'size-2', code: 'KeyA' },
    { label: 's', value: 's', shift: 'S', fn: '', size: 'size-2', code: 'KeyS' },
    { label: 'd', value: 'd', shift: 'D', fn: '', size: 'size-2', code: 'KeyD' },
    { label: 'f', value: 'f', shift: 'F', fn: '', size: 'size-2', code: 'KeyF' },
    { label: 'g', value: 'g', shift: 'G', fn: '', size: 'size-2', code: 'KeyG' },
    { label: 'h', value: 'h', shift: 'H', fn: '', size: 'size-2', code: 'KeyH' },
    { label: 'j', value: 'j', shift: 'J', fn: '1', size: 'size-2', code: 'KeyJ' },
    { label: 'k', value: 'k', shift: 'K', fn: '2', size: 'size-2', code: 'KeyK' },
    { label: 'l', value: 'l', shift: 'L', fn: '3', size: 'size-2', code: 'KeyL' },
    { label: ';', value: ';', shift: ':', fn: '-', size: 'size-2', code: 'Semicolon' },
    { label: "'", value: "'", shift: '"', fn: '', size: 'size-2', code: 'Quote' },
    { label: 'Enter', value: '', shift: '', fn: '', size: 'size-4', code: 'Enter' },
  ],
  [
    { label: 'Shift', value: '', shift: '', fn: '', size: 'size-5', code: 'ShiftLeft' },
    { label: 'z', value: 'z', shift: 'Z', fn: '', size: 'size-2', code: 'KeyZ' },
    { label: 'x', value: 'x', shift: 'X', fn: '', size: 'size-2', code: 'KeyX' },
    { label: 'c', value: 'c', shift: 'C', fn: '', size: 'size-2', code: 'KeyC' },
    { label: 'v', value: 'v', shift: 'V', fn: '', size: 'size-2', code: 'KeyV' },
    { label: 'b', value: 'b', shift: 'B', fn: '', size: 'size-2', code: 'KeyB' },
    { label: 'n', value: 'n', shift: 'N', fn: '', size: 'size-2', code: 'KeyN' },
    { label: 'm', value: 'm', shift: 'M', fn: '', size: 'size-2', code: 'KeyM' },
    { label: ',', value: ',', shift: '<', fn: '', size: 'size-2', code: 'Comma' },
    { label: '.', value: '.', shift: '>', fn: '', size: 'size-2', code: 'Period' },
    { label: '/', value: '/', shift: '?', fn: '', size: 'size-2', code: 'Slash' },
    { label: 'Shift', value: '', shift: '', fn: '', size: 'size-5', code: 'ShiftRight' },
  ],
  [
    { label: 'Ctrl', value: '', shift: '', fn: '', size: 'size-6', code: 'ControlLeft' },
    { label: 'Fn', value: '', shift: '', fn: '', size: 'size-6', code: 'fn' },
    { label: 'Cmd', value: '', shift: '', fn: '', size: 'size-6', code: 'MetaLeft' },
    { label: 'Alt', value: '', shift: '', fn: '', size: 'size-6', code: 'AltLeft' },
    { label: 'Space', value: '', shift: '', fn: '', size: 'size-7', code: 'Space' },
    { label: 'Alt', value: '', shift: '', fn: '', size: 'size-6', code: 'AltRight' },
    { label: 'Ctrl', value: '', shift: '', fn: '', size: 'size-6', code: 'ControlRight' },
  ],
];
function generateRandomText(n, t) {
  const touchTypingLayout = {
    leftHand: [
      '1',
      '2',
      '3',
      '4',
      '5',
      'q',
      'w',
      'e',
      'r',
      't',
      'a',
      's',
      'd',
      'f',
      'g',
      'z',
      'x',
      'c',
      'v',
      'b',
      '!',
      '@',
      '#',
      '$',
      '%',
      'Q',
      'W',
      'E',
      'R',
      'T',
      'A',
      'S',
      'D',
      'F',
      'G',
      'Z',
      'X',
      'C',
      'V',
      'B',
    ],
    rightHand: [
      '6',
      '7',
      '8',
      '9',
      '0',
      'y',
      'u',
      'i',
      'o',
      'p',
      'h',
      'j',
      'k',
      'l',
      ';',
      'n',
      'm',
      ',',
      '.',
      '/',
      '^',
      '&',
      '*',
      '(',
      ')',
      'Y',
      'U',
      'I',
      'O',
      'P',
      'H',
      'J',
      'K',
      'L',
      ':',
      'N',
      'M',
      '<',
      '>',
      '?',
    ],
  };
  const words = [];
  const characters = touchTypingLayout[['leftHand', 'rightHand'][Math.round(Math.random() * 1)]];
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
  const speed = Math.floor((lastCorrectIndex / totalCharacters) * 60);
  result.innerHTML = `<h1>Speed: ${speed} WPM</h1>`;
  return result;
};
const renderTime = timeInSeconds => {
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
  timeContainer.textContent = result;
  return result;
};
let intervalId = null;
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
  targetContainer.innerHTML = linesTowriteHtml;
};

//Render the keys
const keyboardLayoutDesignhtml = layoutKeys
  .map(row => `<div class="row">${row.map(key => `<div class="key ${key.size} key-${key.code}">${key.label}</div>`).join('')}</div>`)
  .join('');
keyboardContainer.innerHTML = keyboardLayoutDesignhtml;

// Handling the events
document.addEventListener('keydown', function (event) {
  if (currentIndex == -1) currentIndex = 0;
  const targetCharacter = document.querySelector(`.character-${currentIndex}`);
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
  pressedKey.classList.add('active');
});
document.addEventListener('keyup', function (event) {
  event.preventDefault();
  const pressedKey = document.querySelector(`.key-${event.code}`);
  pressedKey.classList.remove('active');
});

// settingLoaderBtn.addEventListener('click', function (event) {
//   settingsTextArea.style.display = 'block';
// });
settingsShowBtn.addEventListener('click', function (event) {
  settingContainer.style.display = 'block';
});
resetBtn.addEventListener('click', function (event) {
  currentIndex = 0;
  lastCorrectIndex = 0;
  timeInSeconds = 200;
  showTypingContent();
  runTimeInterval();
});
showTypingContent();
runTimeInterval();
