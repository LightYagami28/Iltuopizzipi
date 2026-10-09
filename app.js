const messages = [
  "Sono passati 6 anni...",
  "6 anni di amore vero.",
  "6 anni in cui ti sceglierei ogni giorno.",
  "Mi hai reso un uomo migliore.",
  "Mi hai regalato la gioia più grande...",
  "Sei una mamma meravigliosa.",
  "Sei la mia casa, la mia pace, la mia forza.",
  "E non vedo l'ora di chiamarti...",
  "Mia Moglie ❤️",
];

const button = document.querySelector("#loveButton");
const message = document.querySelector("#message");
const heartLayer = document.querySelector("#heartLayer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let sequenceTimers = [];
let heartTimer;
let completed = false;

function clearSequence() {
  for (const timer of sequenceTimers) window.clearTimeout(timer);
  sequenceTimers = [];
}

function stopHearts() {
  window.clearInterval(heartTimer);
  heartTimer = undefined;
  heartLayer.replaceChildren();
}

function showMessage(index) {
  message.classList.remove("is-visible");
  const timer = window.setTimeout(() => {
    message.textContent = messages[index];
    message.classList.add("is-visible");
    if (index === messages.length - 1) {
      message.classList.add("is-final");
      completed = true;
      button.disabled = false;
      if (!reduceMotion.matches) startHearts();
    }
  }, 500);
  sequenceTimers.push(timer);
}

function startLove() {
  clearSequence();
  stopHearts();
  completed = false;
  message.textContent = "";
  message.classList.remove("is-visible", "is-final");
  button.disabled = true;

  messages.forEach((_, index) => {
    const timer = window.setTimeout(() => showMessage(index), 2500 * (index + 1) - 500);
    sequenceTimers.push(timer);
  });
}

function startHearts() {
  if (heartTimer || reduceMotion.matches || document.hidden) return;
  heartTimer = window.setInterval(() => {
    if (heartLayer.childElementCount >= 16) return;
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${Math.random() * 15 + 15}px`;
    heartLayer.append(heart);
    window.setTimeout(() => heart.remove(), 6100);
  }, 500);
}

button.addEventListener("click", startLove);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHearts();
  else if (completed) startHearts();
});
reduceMotion.addEventListener("change", () => {
  if (reduceMotion.matches) stopHearts();
  else if (completed) startHearts();
});
