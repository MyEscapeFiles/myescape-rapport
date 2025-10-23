const sounds = {
  1: new Audio("../../sounds/1.mp3"),
  2: new Audio("../../sounds/2.mp3"),
  3: new Audio("../../sounds/3.mp3"),
  4: new Audio("../../sounds/4.mp3")
};

// Séquence correcte
const correctSequence = ["3", "1", "4", "2"];
let playerSequence = [];

const keys = document.querySelectorAll(".key");
const message = document.getElementById("message");

keys.forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playerSequence.push(note);

    // Effet visuel + son
    key.classList.add("active");
    sounds[note]?.play();
    setTimeout(() => key.classList.remove("active"), 150);

    // Quand 4 notes sont jouées
    if (playerSequence.length === 4) {
      if (playerSequence.join("") === correctSequence.join("")) {
        message.textContent = "✨ Une porte s’ouvre… Vous sentez l’air frais de la liberté.";
        message.classList.add("visible");

        // Ajoute 20 minutes au chrono
        const start = parseInt(localStorage.getItem("escapeStart"), 10);
        localStorage.setItem("escapeStart", start - 20 * 60 * 1000);
        localStorage.setItem("justReturned", "true");

        // Retourne à la dernière page du joueur
        setTimeout(() => {
          const lastPage = localStorage.getItem("lastPage") || "../../index.html";
          window.location.href = lastPage;
        }, 2500);
      } else {
        message.textContent = "❌ La séquence est incorrecte...";
        message.classList.add("visible");
      }

      playerSequence = []; // reset
    }
  });
});