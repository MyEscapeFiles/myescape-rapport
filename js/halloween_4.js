document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  const mot = document.getElementById("mot").value.trim().toLowerCase();
  const phrase = document.getElementById("phrase").value.trim().toLowerCase();

  // Zone de message d'erreur
  let msg = document.getElementById("error-msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "error-msg";
    msg.style.color = "#ff4444";
    msg.style.fontWeight = "bold";
    msg.style.marginTop = "15px";
    document.getElementById("questionnaire").appendChild(msg);
  }

  const bonnePhrase1 = "je les ai tuées, j’ai brisé le rite, les sorcières ne sont plus.";
  const bonnePhrase2 = "je les ai tuees, j'ai brise le rite, les sorcieres ne sont plus.";

  if (
    mot === "emunda" &&
    (phrase === bonnePhrase1 || phrase === bonnePhrase2)
  ) {
    msg.textContent = ""; // efface le message d'erreur
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_05.html";
    }, 2500);
  } else {
    msg.textContent = "❌ Ce mot ou cette phrase ne semblent pas rompre la malédiction...";
  }
});