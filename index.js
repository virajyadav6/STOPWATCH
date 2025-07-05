const display = document.getElementById('display');
const playBtn = document.querySelector('.fa-circle-play');
const stopBtn = document.querySelector('.fa-circle-stop');
const resetBtn = document.querySelector('.fa-rotate-left');
const lapBtn = document.querySelector('.fa-stopwatch');
const lapsContainer = document.getElementById('laps-container');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;
let lapCount = 0;

function timeToString(time) {
  let totalSeconds = Math.floor(time / 1000);
  let hh = Math.floor(totalSeconds / 3600);
  let mm = Math.floor((totalSeconds % 3600) / 60);
  let ss = totalSeconds % 60;
  let ms = time % 1000; // Full 0–999 ms

  let formattedHH = hh.toString().padStart(2, '0');
  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');
  let formattedMS = ms.toString().padStart(3, '0'); // pad to 3 digits

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function start() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10); // update every 10ms for smoother appearance
}

function stop() {
  if (!running) return;
  running = false;
  clearInterval(timerInterval);
}

function reset() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = '00:00.00';
  lapsContainer.innerHTML = '';
  console.clear();
}

function lap() {
  if (!running) return;

  lapCount++;
  const lapTime = timeToString(elapsedTime);

  const lapBubble = document.createElement('div');
  lapBubble.classList.add('lap-bubble');
  lapBubble.textContent = `Lap ${lapCount}: ${lapTime}`;

  lapsContainer.appendChild(lapBubble);
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

playBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
