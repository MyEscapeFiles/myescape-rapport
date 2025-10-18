// === CONFIGURATION ===
const DURATION = 60 * 60 * 1000; // 60 minutes
const EXTENSION = 20 * 60 * 1000; // +20 minutes
const END_PAGE = "../../pages/rapport_affaire/fin_alternative.html";

// === INITIALISATION DU CHRONO ===
function startTimer() {
  if (!localStorage.getItem("escapeStart")) {
    localStorage.setItem("escapeStart", Date.now());
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

// === MISE À JOUR DU CHRONO ===
function updateTimer() {
  const start = parseInt(localStorage.getItem("escapeStart"), 10);
  const elapsed = Date.now() - start;
  const timeLeft = DURATION - elapsed;

  if (timeLeft <= 0) {
    window.location.href = END_PAGE;
    return;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// === LANCEMENT ===
startTimer();