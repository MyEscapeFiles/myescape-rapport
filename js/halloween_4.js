document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("mot").value.trim().toUpperCase();

  if (reponse === "EMUNDA") {
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
      window.location.href = "./halloween_fin.html"; // redirection finale
    }, 2000);
  } else {
    alert("Le mot est incorrect... la malédiction continue.");
  }
});