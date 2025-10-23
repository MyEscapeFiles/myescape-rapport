// === CONFIGURATION ===
const DURATION = 60 * 60 * 1000; // 1 heure
const EXTENSION = 20 * 60 * 1000; // +20 minutes
const END_PAGE = "../../pages/rapport_affaire01/fin_alternative.html";

// === SAUVEGARDE DE LA PAGE ACTUELLE ===
localStorage.setItem("lastPage", window.location.href);

// === RESET DU CHRONO UNIQUEMENT AU DÉBUT DU JEU ===
if (window.location.pathname.includes("halloween_01.html")) {
  localStorage.removeItem("escapeStart");
  localStorage.removeItem("justReturned"); // on nettoie le flag si retour au début
}

// === INITIALISATION DU CHRONO ===
function startTimer() {
  if (!localStorage.getItem("escapeStart")) {
    localStorage.setItem("escapeStart", Date.now());
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

// === MISE À JOUR DU CHRONO PRINCIPAL ===
function updateTimer() {
  const start = parseInt(localStorage.getItem("escapeStart"), 10);
  const elapsed = Date.now() - start;
  const timeLeft = DURATION - elapsed;

  // Si le chrono est écoulé ET qu'on ne vient pas du piano, on redirige
  if (timeLeft <= 0 && !localStorage.getItem("justReturned")) {
    window.location.href = END_PAGE;
    return;
  }

  // Si on vient du piano, on supprime le flag après quelques secondes
  if (localStorage.getItem("justReturned")) {
    setTimeout(() => localStorage.removeItem("justReturned"), 3000);
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// === MISE À JOUR DU CHRONO DANS LES ÉCRANS DE TRANSITION ===
function updateTransitionTimer() {
  const timerOverlay = document.getElementById("transition-timer");
  if (!timerOverlay) return;

  const start = parseInt(localStorage.getItem("escapeStart"), 10);
  const elapsed = Date.now() - start;
  const timeLeft = DURATION - elapsed;

  const minutes = Math.max(Math.floor(timeLeft / 60000), 0);
  const seconds = Math.max(Math.floor((timeLeft % 60000) / 1000), 0);

  timerOverlay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// === LANCEMENT ===
startTimer();