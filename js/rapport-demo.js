console.log("✅ Script rapport-demo.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("questionnaire");
  const button = document.getElementById("goToNext");

  const validations = {
    nom: "collombel",
    prenom: "elsa",
    age: "28",
    metier: "influenceuse beauté",
    heure: ["20h", "20h00", "20h01"],
    arme: "lampe"
  };

  // Message global sous le bouton
  const globalError = document.createElement("p");
  globalError.id = "global-error";
  globalError.className = "error-message";
  globalError.style.color = "red";
  globalError.style.marginTop = "20px";
  globalError.style.display = "none";
  button.insertAdjacentElement("afterend", globalError);

  function showErrorAfter(element) {
    let existing = element.parentNode.querySelector(".error-message");
    if (!existing) {
      const error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.marginTop = "6px";
      error.textContent = "Erreur ! N'hésitez pas à consulter la section indice.";
      element.insertAdjacentElement("afterend", error);
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    globalError.style.display = "none";
    globalError.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let errors = 0;

    // NOM
    const nom = document.getElementById("nom");
    if (nom.value.trim().toLowerCase() !== validations.nom) {
      showErrorAfter(nom);
      errors++;
    }

    // PRENOM
    const prenom = document.getElementById("prenom");
    if (prenom.value.trim().toLowerCase() !== validations.prenom) {
      showErrorAfter(prenom);
      errors++;
    }

    // ÂGE
    const age = document.getElementById("age");
    if (age.value.trim() !== validations.age) {
      showErrorAfter(age);
      errors++;
    }

    // MÉTIER
    const metier = document.getElementById("metier");
    if (metier.value.trim().toLowerCase() !== validations.metier) {
      showErrorAfter(metier);
      errors++;
    }

    // HEURE
    const heure = document.getElementById("heure");
    const heureVal = heure.value.trim().toLowerCase();
    if (!validations.heure.includes(heureVal)) {
      showErrorAfter(heure);
      errors++;
    }

    // ARME
    const arme = document.querySelector('input[name="arme"]:checked');
    const armeFieldset = document.querySelector('fieldset');
    if (!arme || arme.value.trim().toLowerCase() !== validations.arme) {
      showErrorAfter(armeFieldset.lastElementChild);
      errors++;
    }

    if (errors > 0) {
      globalError.textContent = errors === 1
        ? "Erreur détectée dans le rapport..."
        : "Plusieurs erreurs détectées dans le rapport...";
      globalError.style.display = "block";
    } else {
      window.location.href = "fin-demo.html";
    }
  });
});
