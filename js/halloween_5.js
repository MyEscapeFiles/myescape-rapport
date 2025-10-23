document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("phrase").value.trim().toLowerCase();

  const bonneReponse = "je les ai tuées, j’ai brisé le rite, les sorcières ne sont plus.";
  const bonneReponse2 = "je les ai tuees, j'ai brise le rite, les sorcieres ne sont plus.";

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

  if (reponse === bonneReponse || reponse === bonneReponse2) {
    msg.textContent = ""; // efface le message d'erreur
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_06.html";
    }, 2500);
  } else {
    msg.textContent = "❌ La phrase n'est pas exacte... le rituel reste incomplet.";
  }
});