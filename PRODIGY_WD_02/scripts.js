// scripts.js
let startTime;
let updatedTime;
let difference = 0;
let timerID;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

function startPauseStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerID = setInterval(updateDisplay, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerID);
        startPauseButton.textContent = 'Start';
        running = false;
        difference = updatedTime - startTime;
    }
}

function resetStopwatch() {
    clearInterval(timerID);
    display.textContent = '00:00:00.00';
    startPauseButton.textContent = 'Start';
    lapTimesList.innerHTML = '';
    running = false;
    difference = 0;
    lapCounter = 0;
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapTimesList.appendChild(lapTime);
    }
}

startPauseButton.addEventListener('click', startPauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
