document.getElementById("questionnaire").addEventListener("submit", e => {
  e.preventDefault();

  // Récupère la sélection dans l'ordre des clics
  const checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // Ingrédients autorisés globalement
  const allowed = ["lait", "huile", "miel", "romarin", "noix", "beurre", "vinaigre"];

  // Ordre imposé :
  // - les 4 premiers : lait, huile, miel, noix (dans n'importe quel ordre)
  // - ensuite : beurre
  // - ensuite (à la fin) : romarin + vinaigre (dans n'importe quel ordre)
  const firstGroup = ["lait", "huile", "miel", "noix"];
  const middle = "beurre";
  const lastGroup = ["romarin", "vinaigre"];

  // Vérification basique : que les ingrédients choisis appartiennent à la liste autorisée
  const allValid = checked.every(i => allowed.includes(i));
  if (!allValid || checked.length !== allowed.length) {
    alert("Certains ingrédients sont manquants ou incorrects.");
    return;
  }

  // Vérifie la structure d'ordre
  const firstPart = checked.slice(0, 4);
  const middlePart = checked[4];
  const lastPart = checked.slice(5);

  const firstOK = firstPart.every(i => firstGroup.includes(i));
  const middleOK = middlePart === middle;
  const lastOK = lastPart.every(i => lastGroup.includes(i)) && lastPart.length === 2;

  if (firstOK && middleOK && lastOK) {
    const overlay = document.getElementById("transition-screen");
    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = "./halloween_04.html";
    }, 2500);
  } else {
    alert("L’ordre des ingrédients n’est pas correct !");
  }
});