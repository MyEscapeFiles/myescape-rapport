document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  // ingrédients cochés
  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // bonnes réponses
  const correct = ["lait", "huile", "miel", "romarin", "noix", "beurre", "vinaigre"];

  // vérifie que tous les bons ingrédients sont cochés et qu’il n’y en a pas d’autres
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