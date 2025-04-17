let timerId = null;
let ms = 0,
  seconds = 0,
  minutes = 0,
  hours = 0;

const startBtn = document.getElementById("start");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const displayEl = document.getElementById("display");
const lapList = document.getElementById("lap-list");

const startOperation = () => {
  if (startBtn.innerText === "Эхлэх") {
    startBtn.innerText = "Зогсоох";
    startBtn.classList.add("stop");
    startTimer();
  } else {
    startBtn.innerText = "Эхлэх";
    startBtn.classList.remove("stop");
    stopTimer();
  }
};

const formattedTime = (num) => {
  return num.toString().padStart(2, "0");
};

const startTimer = () => {
  if (timerId === null) {
    timerId = setInterval(() => {
      ms += 10;
      if (ms === 1000) {
        ms = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
            if (hours === 24) {
              hours = 0;
            }
          }
        }
      }
      display();
    }, 10);
  }
};

const stopTimer = () => {
  clearInterval(timerId);
  timerId = null;
};

const display = () => {
  displayEl.innerText = `${formattedTime(hours)}:${formattedTime(
    minutes
  )}:${formattedTime(seconds)}:${formattedTime(Math.floor(ms / 10))}`;
};

const resetTimer = () => {
  stopTimer();
  ms = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  display();
  lapList.innerHTML = "";
};

const lapAdd = () => {
  const cardEl = `
        <div class="card-container">
            <h4>LAP</h4>
            <p>${formattedTime(hours)}:${formattedTime(
    minutes
  )}:${formattedTime(seconds)}:${formattedTime(Math.floor(ms / 10))}</p>
        </div>
    `;
  lapList.innerHTML += cardEl;
};

startBtn.addEventListener("click", startOperation);
lapBtn.addEventListener("click", lapAdd);
resetBtn.addEventListener("click", resetTimer);
