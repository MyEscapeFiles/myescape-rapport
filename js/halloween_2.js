document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("code").value.trim().toLowerCase();

  if (reponse === "170541") {
    // affiche l'écran de transition
    const overlay = document.getElementById("transition-screen");
    const chrono = document.getElementById("transition-timer");
    overlay.classList.add("active");

    // récupère le vrai temps restant depuis le chrono global
    const start = parseInt(localStorage.getItem("escapeStart"), 10);
    const DURATION = 60 * 60 * 1000;
    const timeLeft = DURATION - (Date.now() - start);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    chrono.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // redirection après 2 secondes
    setTimeout(() => {
      window.location.href = "./halloween_03.html";
    }, 2000);
  } else {
    alert("Mauvaise combinaison !");
  }
});