document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("heure").value.trim().toLowerCase();

  if (reponse === "23H19" || reponse === "23:19" || reponse === "23h19") {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_02.html";
    }, 2500);
  } else {
    alert("Réponse incorrecte !");
  }
});