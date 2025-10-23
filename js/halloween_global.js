// === CONFIGURATION ===
const NORMAL_DURATION = 10 * 1000;      // 1h de jeu
const BONUS_DURATION = 10 * 1000;       // 20 min après réussite du piano
const END_PAGE = "../../pages/rapport_affaire01/fin_alternative.html";       // fin temporaire (piano)
const FINAL_END_PAGE = "../../pages/rapport_affaire01/fin_definitive.html";  // fin définitive

// === SAUVEGARDE DE LA PAGE ACTUELLE (sauf le piano) ===
if (!window.location.pathname.includes("fin_alternative.html")) {
  localStorage.setItem("lastPage", window.location.href);
}

// === RESET AU DÉBUT DU JEU ===
if (window.location.pathname.includes("halloween_01.html")) {
  localStorage.removeItem("escapeStart");
  localStorage.removeItem("escapeDuration");
  localStorage.removeItem("justReturned");
  localStorage.removeItem("cameFromPiano");
}

// === INITIALISATION DU CHRONO ===
function startTimer() {
  const now = Date.now();

  // Si aucun chrono n'existe → création
  if (!localStorage.getItem("escapeStart")) {
    const duration = localStorage.getItem("justReturned")
      ? BONUS_DURATION
      : NORMAL_DURATION;

    localStorage.setItem("escapeStart", now);
    localStorage.setItem("escapeDuration", duration);

    // Si on vient du piano, on le marque pour savoir que le prochain échec = fin définitive
    if (localStorage.getItem("justReturned")) {
      localStorage.setItem("cameFromPiano", "true");
      localStorage.removeItem("justReturned");
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// === MISE À JOUR DU CHRONO ===
function updateTimer() {
  const start = parseInt(localStorage.getItem("escapeStart"), 10);
  const duration = parseInt(localStorage.getItem("escapeDuration"), 10);
  if (!start || !duration) return;

  const elapsed = Date.now() - start;
  const timeLeft = duration - elapsed;

  if (timeLeft <= 0) {
    // Si le joueur avait déjà eu le bonus → vraie fin
    if (localStorage.getItem("cameFromPiano")) {
      window.location.href = FINAL_END_PAGE;
    } else {
      // Sinon → première fin (le piano)
      window.location.href = END_PAGE;
    }
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