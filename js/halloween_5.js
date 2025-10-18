document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("phrase").value.trim().toLowerCase();

  const bonneReponse = "je les ai tuées, j’ai brisé le rite, les sorcières ne sont plus.";
  const bonneReponse2 = "je les ai tuees, j'ai brise le rite, les sorcieres ne sont plus."; // sans accents

  if (reponse === bonneReponse || reponse === bonneReponse2) {
    const overlay = document.getElementById("transition-screen");
    const chrono = document.getElementById("transition-timer");
    overlay.classList.add("active");

    const start = parseInt(localStorage.getItem("escapeStart"), 10);
    const DURATION = 60 * 60 * 1000;
    const timeLeft = DURATION - (Date.now() - start);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    chrono.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    setTimeout(() => {
      window.location.href = "./halloween_06.html"; // redirection finale (victoire)
    }, 2500);
  } else {
    alert("La phrase n'est pas exacte... le rituel reste incomplet.");
  }
});