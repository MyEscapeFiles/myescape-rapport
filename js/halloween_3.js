document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  // ingrédients cochés (en minuscules)
  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(cb => cb.value.trim().toLowerCase());

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

  // température 270–273
  const temp = parseInt(document.getElementById("temp").value, 10);
  const tempOK = Number.isInteger(temp) && temp >= 270 && temp <= 273;

  // vérifie que la réponse est correcte
  const ingOK = correct.every(item => checked.includes(item)) && checked.length === correct.length;

  if (ingOK && tempOK) {
    msg.textContent = "";
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");
    setTimeout(() => {
      window.location.href = "./halloween_04.html";
    }, 2500);
  } else {
    msg.textContent = "❌ N'hésitez pas à consulter la section indice";
  }
});