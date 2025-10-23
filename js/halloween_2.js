document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("code").value.trim().toLowerCase();

  if (reponse === "3742") {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_03.html";
    }, 2500);
  } else {
    alert("Mauvaise combinaison !");
  }
});