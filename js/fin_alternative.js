// === CONFIGURATION DU PIANO ===
const sounds = {
  1: new Audio("../../sounds/1.mp3"),
  2: new Audio("../../sounds/2.mp3"),
  3: new Audio("../../sounds/3.mp3"),
  4: new Audio("../../sounds/4.mp3")
};

// Précharge les sons
Object.values(sounds).forEach(s => s.load());

// Séquence correcte
const correctSequence = ["3", "1", "4", "2"];
let playerSequence = [];

const keys = document.querySelectorAll(".key");
const message = document.getElementById("message");

// === Compteur de touches ===
const counter = document.createElement("p");
counter.id = "counter";
counter.style.fontSize = "22px";
counter.style.color = "#ffaa00";
counter.style.marginTop = "20px";
counter.textContent = "Touches jouées : 0/4";
document.querySelector(".piano").after(counter);

keys.forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playerSequence.push(note);

    // Effet visuel + son
    key.classList.add("active");
    const sound = sounds[note];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
    setTimeout(() => key.classList.remove("active"), 150);

    // Met à jour le compteur
    counter.textContent = `Touches jouées : ${playerSequence.length}/4`;

    // Quand 4 notes sont jouées
    if (playerSequence.length === 4) {
      if (playerSequence.join("") === correctSequence.join("")) {
        message.textContent = "✨ Une porte s’ouvre… Vous sentez l’air frais de la liberté.";
        message.classList.add("visible");

        // 🔁 Ajoute 20 minutes au chrono global
        const start = parseInt(localStorage.getItem("escapeStart"), 10);
        localStorage.setItem("escapeStart", start - 20 * 60 * 1000);
        localStorage.setItem("justReturned", "true");

        // ✅ Ne plus rediriger vers la page du piano
        setTimeout(() => {
          const lastPage = localStorage.getItem("lastPage") || "../../index.html";
          window.location.href = lastPage;
        }, 2500);
      } else {
        message.textContent = "❌ La séquence est incorrecte... Recommencez.";
        message.classList.add("visible");
      }

      // Réinitialise le compteur et la séquence
      playerSequence = [];
      counter.textContent = "Touches jouées : 0/4";
    }
  });
});
