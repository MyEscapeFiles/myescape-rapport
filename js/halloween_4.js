document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  const mot = document.getElementById("mot").value.trim().toLowerCase();
  const p1 = document.getElementById("phrase1").value.trim().toLowerCase();
  const p2 = document.getElementById("phrase2").value.trim().toLowerCase();
  const p3 = document.getElementById("phrase3").value.trim().toLowerCase();

  const msg = document.getElementById("error-msg");

  // 🔧 Fonction de normalisation ultra-complète
  const normalize = str => str
    .normalize("NFD") // retire accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;!?'"’"]/g, "") // supprime ponctuation
    .replace(/\s+/g, " ") // espaces multiples
    .trim()
    .toLowerCase();

  const n1 = normalize(p1);
  const n2 = normalize(p2);
  const n3 = normalize(p3);
  const nMot = normalize(mot);

  // 🔠 Fonction de correspondance floue
  const includesAny = (input, patterns) =>
    patterns.some(p => input === p || input.includes(p));

  // ✅ Variantes acceptées
  const motsCle = ["emunda"];

  const phrases1 = [
    "je les ai tues", "je les ai tue", "je les ai tué", "je les ai tués", 
    "je les ai tuees", "je les ai tuees.", "je les ai tuee"
  ];

  const phrases2 = [
    "j ai brise le rite", "jai brise le rite", "j ai brisé le rite",
    "jai brisé le rite", "j ai brise le rit", "jai brise le rit",
    "jai briser le rite", "j ai briser le rite"
  ];

  const phrases3 = [
    "les sorcieres ne sont plus", "les sorcieres ne sont plus.",
    "les sorcieres ne sont pluss", "les sorcieres ne sont plues"
  ];

  const isValidMot = includesAny(nMot, motsCle);
  const validP1 = includesAny(n1, phrases1);
  const validP2 = includesAny(n2, phrases2);
  const validP3 = includesAny(n3, phrases3);

  if (isValidMot && validP1 && validP2 && validP3) {
    msg.textContent = "";
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");
    setTimeout(() => {
      window.location.href = "./halloween_05.html";
    }, 2500);
  } else {
    msg.textContent = "❌ Ce mot ou ces phrases ne semblent pas rompre la malédiction...";
  }
});