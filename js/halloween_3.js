document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  // ingrédients corrects
  const correct = ["lait", "huile", "miel", "vinaigre", "beurre", "romarin", "noix"];
  const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(x => x.value.toLowerCase());

  // vérifie si les cases cochées correspondent exactement aux bonnes réponses
  const isCorrect =
    checked.length === correct.length &&
    checked.every(v => correct.includes(v));

  if (isCorrect) {
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
      window.location.href = "./halloween_04.html";
    }, 2000);
  } else {
    alert("Certains ingrédients ne sont pas corrects...");
  }
});