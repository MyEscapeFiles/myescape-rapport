// === CONFIGURATION ===
const DURATION = 20 * 1000; // 1 heure
const EXTENSION = 20 * 60 * 1000; // +20 minutes
const END_PAGE = "../../pages/rapport_affaire01/fin_alternative.html";

// === SAUVEGARDE DE LA PAGE ACTUELLE ===
if (!window.location.pathname.includes("fin_alternative.html")) {
  localStorage.setItem("lastPage", window.location.href);
}

// === RESET DU CHRONO UNIQUEMENT AU DÉBUT DU JEU ===
if (window.location.pathname.includes("halloween_01.html")) {
  localStorage.removeItem("escapeStart");
  localStorage.removeItem("justReturned"); // reset total
}

// === INITIALISATION DU CHRONO ===
function startTimer() {
  // si aucun chrono n’existe encore → on démarre
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

  // === FIN DU TEMPS ===
  if (timeLeft <= 0 && !localStorage.getItem("justReturned")) {
    window.location.href = END_PAGE;
    return;
  }

  // === Si retour du piano (ajout de temps déjà effectué)
  if (localStorage.getItem("justReturned")) {
    setTimeout(() => localStorage.removeItem("justReturned"), 5000);
  }

  // === Affichage du chrono en minutes:secondes
  const minutes = Math.max(Math.floor(timeLeft / 60000), 0);
  const seconds = Math.max(Math.floor((timeLeft % 60000) / 1000), 0);

  const timerEl = document.getElementById("timer");
  if (timerEl) {
    timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

// === LANCEMENT ===
startTimer();