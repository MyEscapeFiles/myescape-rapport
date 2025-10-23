// === CONFIGURATION DU PIANO ===
const sounds = {
  1: new Audio("../../sounds/1.mp3"),
  2: new Audio("../../sounds/2.mp3"),
  3: new Audio("../../sounds/3.mp3"),
  4: new Audio("../../sounds/4.mp3")
};

Object.values(sounds).forEach(s => s.load());

// Séquence correcte
const correctSequence = ["3", "1", "4", "2"];
let playerSequence = [];

const keys = document.querySelectorAll(".key");
const message = document.getElementById("message");

// === Compteur ===
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

    // Son + effet
    key.classList.add("active");
    const sound = sounds[note];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
    setTimeout(() => key.classList.remove("active"), 150);

    // Mise à jour compteur
    counter.textContent = `Touches jouées : ${playerSequence.length}/4`;

    if (playerSequence.length === 4) {
      if (playerSequence.join("") === correctSequence.join("")) {
        message.textContent = "✨ Une porte s’ouvre… Vous avez 20 minutes pour sortir.";
        message.classList.add("visible");

        // ✅ Lance un nouveau chrono de 20 minutes
        localStorage.removeItem("escapeStart");
        localStorage.setItem("justReturned", "true");

        setTimeout(() => {
          const lastPage = localStorage.getItem("lastPage") || "../../index.html";
          window.location.href = lastPage;
        }, 3000);
      } else {
        message.textContent = "❌ La séquence est incorrecte... Recommencez.";
        message.classList.add("visible");
      }

      // Reset
      playerSequence = [];
      counter.textContent = "Touches jouées : 0/4";
    }
  });
});
