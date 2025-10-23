document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("phrase").value.trim().toLowerCase();

  const bonneReponse = "je les ai tuées, j’ai brisé le rite, les sorcières ne sont plus.";
  const bonneReponse2 = "je les ai tuees, j'ai brise le rite, les sorcieres ne sont plus.";

  if (reponse === bonneReponse || reponse === bonneReponse2) {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_06.html";
    }, 2500);
  } else {
    alert("La phrase n'est pas exacte... le rituel reste incomplet.");
  }
});