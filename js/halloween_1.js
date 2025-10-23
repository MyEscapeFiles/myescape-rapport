document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("heure").value.trim().toLowerCase();

  if (reponse === "21h36" || reponse === "21:36") {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_02.html";
    }, 2500);
  } else {
    alert("Réponse incorrecte !");
  }
});