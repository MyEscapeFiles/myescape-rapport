document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  // ingrédients cochés
  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // bonnes réponses
  const correct = ["lait", "huile", "miel", "romarin", "noix", "beurre", "vinaigre"];

  // zone de message (créée si inexistante)
  let msg = document.getElementById("error-msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "error-msg";
    msg.style.color = "#ff4444";
    msg.style.fontWeight = "bold";
    msg.style.marginTop = "15px";
    document.getElementById("questionnaire").appendChild(msg);
  }

  // vérifie que la réponse est correcte
  const isCorrect = correct.every(item => checked.includes(item)) && checked.length === correct.length;

  if (isCorrect) {
    msg.textContent = ""; // efface le message d'erreur
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_04.html";
    }, 2500);
  } else {
    msg.textContent = "❌ Ce ne sont pas les bons ingrédients...";
  }
});
