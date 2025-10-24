// Sons (garde tes fichiers existants)
const sounds = {
  1: new Audio("../../sounds/1.mp3"),
  2: new Audio("../../sounds/2.mp3"),
  3: new Audio("../../sounds/3.mp3"),
  4: new Audio("../../sounds/4.mp3"),
};
Object.values(sounds).forEach(a => a.load());

// Séquence correcte
const CORRECT_SEQUENCE = ["3", "1", "4", "2"];
let seq = [];

// Compteur
const counter = document.createElement("p");
counter.id = "counter";
counter.style.cssText = "font-size:22px;color:#ffaa00;margin-top:20px;text-shadow:0 0 10px rgba(255,150,0,.4)";
counter.textContent = "Touches jouées : 0/4";
document.querySelector(".piano").after(counter);

const message = document.getElementById("message");
document.querySelectorAll(".key").forEach(k => {
  k.addEventListener("click", () => {
    const n = k.dataset.note;
    seq.push(n);

    k.classList.add("active");
    const s = sounds[n];
    if (s) { s.currentTime = 0; s.play().catch(()=>{}); }
    setTimeout(()=>k.classList.remove("active"),150);

    counter.textContent = `Touches jouées : ${seq.length}/4`;

    if (seq.length === 4) {
      if (seq.join("") === CORRECT_SEQUENCE.join("")) {
        message.textContent = "✨ La serrure cède…";
        message.style.color = "#33ff77";
        message.classList.add("visible");

        // Flag pour lancer le chrono de 20 min au prochain chargement
        localStorage.setItem("justReturned", "true");

        // Retour EXACT à la page où le temps s’est arrêté
        const last = localStorage.getItem("lastPage") || "../../index.html";
        setTimeout(() => { location.href = last; }, 1200);
      } else {
        message.textContent = "❌ Mauvaise séquence… recommencez.";
        message.style.color = "#ff4444";
        message.classList.add("visible");
      }
      seq = [];
      counter.textContent = "Touches jouées : 0/4";
    }
  });
});

// Empêche le retour arrière
history.pushState(null, "", location.href);
onpopstate = () => {
  history.pushState(null, "", location.href);
  alert("🚪 Impossible de revenir en arrière...");
};