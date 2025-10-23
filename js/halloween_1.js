document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  const reponse = document.getElementById("heure").value.trim().toLowerCase();

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

  if (reponse === "23h19" || reponse === "23:19" || reponse === "23h19") {
    msg.textContent = ""; // efface le message d’erreur
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_02.html";
    }, 2500);
  } else {
    msg.textContent = "❌ Réponse incorrecte !";
  }
});