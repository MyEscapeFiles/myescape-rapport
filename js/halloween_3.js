document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  const correct = ["farine", "lait", "oeufs", "miel", "romarin"];

  const isCorrect = correct.every(item => checked.includes(item)) && checked.length === correct.length;

  if (isCorrect) {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_04.html";
    }, 2500);
  } else {
    alert("Ce ne sont pas les bons ingrédients...");
  }
});