document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("code").value.trim().toLowerCase();

  // Zone de message d'erreur (créée si inexistante)
  let msg = document.getElementById("error-msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "error-msg";
    msg.style.color = "#ff4444";
    msg.style.fontWeight = "bold";
    msg.style.marginTop = "15px";
    document.getElementById("questionnaire").appendChild(msg);
  }

  if (reponse === "051741") {
    msg.textContent = ""; // efface le message d'erreur
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_03.html";
    }, 2500);
  } else {
    msg.textContent = "❌ Mauvaise combinaison !";
  }
});