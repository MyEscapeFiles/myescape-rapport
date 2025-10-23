// === CONFIGURATION ===
const DURATION = 60 * 60 * 1000; // 1 heure
const EXTENSION = 20 * 60 * 1000; // +20 minutes
const END_PAGE = "../../pages/rapport_affaire01/fin_alternative.html";

// === SAUVEGARDE DE LA PAGE ACTUELLE (sauf le piano) ===
if (!window.location.pathname.includes("fin_alternative.html")) {
  localStorage.setItem("lastPage", window.location.href);
}

// === RESET DU CHRONO UNIQUEMENT AU DÉBUT DU JEU ===
if (window.location.pathname.includes("halloween_01.html")) {
  localStorage.removeItem("escapeStart");
  localStorage.removeItem("justReturned"); // reset complet
}

// === INITIALISATION DU CHRONO ===
function startTimer() {
  // Si aucun chrono actif, on en crée un
  if (!localStorage.getItem("escapeStart")) {
    localStorage.setItem("escapeStart", Date.now());
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// === MISE À JOUR DU CHRONO ===
function updateTimer() {
  const start = parseInt(localStorage.getItem("escapeStart"), 10);
  if (!start) return;

  const elapsed = Date.now() - start;
  const timeLeft = DURATION - elapsed;

  // === Si le temps est écoulé
  if (timeLeft <= 0) {
    // ✅ Si on vient juste du piano → on ne redirige pas
    if (localStorage.getItem("justReturned")) {
      // on retire le flag après 5 secondes pour éviter le double blocage
      setTimeout(() => localStorage.removeItem("justReturned"), 5000);
      return;
    }

    // sinon on va à la page de fin
    window.location.href = END_PAGE;
    return;
  }

  // === Si retour du piano → on supprime le flag au bout de quelques secondes
  if (localStorage.getItem("justReturned")) {
    setTimeout(() => localStorage.removeItem("justReturned"), 5000);
  }

  // === Affichage du chrono
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const timerEl = document.getElementById("timer");

  if (timerEl) {
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// === LANCEMENT ===
startTimer();