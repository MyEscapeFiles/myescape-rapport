// === CONFIG ===
const NORMAL_DURATION = 60 * 60 * 1000;   // 60 min
const BONUS_DURATION  = 20 * 60 * 1000;   // 20 min
const PIANO_PAGE      = "../../pages/rapport_affaire01/fin_alternative.html";
const FINAL_END_PAGE  = "../../pages/rapport_affaire01/fin_definitive.html";

// Sauvegarde en continu la page courante (sauf le piano)
if (!location.pathname.includes("fin_alternative.html")) {
  localStorage.setItem("lastPage", location.href);
}

// Reset au tout début du jeu
if (location.pathname.includes("halloween_01.html")) {
  localStorage.removeItem("escapeStart");
  localStorage.removeItem("escapeDuration");
  localStorage.removeItem("justReturned");
  localStorage.removeItem("cameFromPiano");
}

// --- démarrage ---
function startTimer() {
  const now = Date.now();

  // Si on revient du piano -> on lance le NOUVEAU chrono de 20 min
  if (localStorage.getItem("justReturned")) {
    localStorage.setItem("escapeStart", now);
    localStorage.setItem("escapeDuration", String(BONUS_DURATION));
    localStorage.setItem("cameFromPiano", "true");
    localStorage.removeItem("justReturned");
  }

  // Si aucun chrono actif -> chrono principal 60 min
  if (!localStorage.getItem("escapeStart")) {
    localStorage.setItem("escapeStart", String(now));
    localStorage.setItem("escapeDuration", String(NORMAL_DURATION));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function updateTimer() {
  const start    = parseInt(localStorage.getItem("escapeStart")   || "0", 10);
  const duration = parseInt(localStorage.getItem("escapeDuration")|| "0", 10);
  if (!start || !duration) return;

  const elapsed  = Date.now() - start;
  const timeLeft = duration - elapsed;

  if (timeLeft <= 0) {
    // Si on était déjà en bonus -> FIN DÉFINITIVE
    if (localStorage.getItem("cameFromPiano")) {
      location.href = FINAL_END_PAGE;
    } else {
      // Sinon -> 1ère fin (piano). On fige la page où ça s'est arrêté
      localStorage.setItem("lastPage", location.href);
      location.href = PIANO_PAGE;
    }
    return;
  }

  // Affichage du timer si présent
  const m = Math.floor(timeLeft / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  const el = document.getElementById("timer");
  if (el) el.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

startTimer();