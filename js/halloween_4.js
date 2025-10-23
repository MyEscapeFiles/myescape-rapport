document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();
  const reponse = document.getElementById("mot").value.trim().toLowerCase();

  if (reponse === "emunda") {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_05.html";
    }, 2500);
  } else {
    alert("Ce mot ne semble pas briser la malédiction...");
  }
});
