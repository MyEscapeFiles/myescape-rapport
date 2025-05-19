console.log("✅ Script suite-lesdisparus.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("goToNext");
  const globalError = document.getElementById("global-error");

  const validations = {
    question1: "SECTE PHENIX ETERNEL",
    age: "12",
    sexe: "homme",
    situation: "orphelin",
    criteres: ["traumatise", "isole", "obeissant", "intelligent", "bonne-sante"],
    "date-enlevement": "21 DECEMBRE",
    pays: "ISLANDE",
    ville: "EDIGATA",
    rue: "22 RUE CENDRES"
  };

  function showErrorAfter(element, message) {
    const existing = element.parentNode.querySelector(".error-message");
    if (!existing) {
      const error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.marginTop = "5px";
      error.textContent = message;
      element.insertAdjacentElement("afterend", error);
    } else {
      existing.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    globalError.style.display = "none";
    globalError.textContent = "";
  }

  function isFormValid() {
    clearErrors();
    let errors = 0;

    const addError = (input, message) => {
      showErrorAfter(input, message);
      errors++;
    };

    const trimVal = (name) =>
      document.querySelector(`[name="${name}"]`)?.value.trim().toUpperCase();

    // Question 1
    const q1 = document.querySelector('input[name="question1"]');
    if (q1.value.trim().toUpperCase() !== validations.question1) {
      addError(q1, "Erreur ! Ce n'est pas la bonne réponse.");
    }

    // Âge
    const age = document.querySelector('input[name="age"]');
    if (age.value.trim() !== validations.age) {
      addError(age, "Erreur ! Ce n'est pas le bon âge.");
    }

    // Sexe
    const sexeChecked = document.querySelector('input[name="sexe"]:checked');
    const sexeFieldset = document.querySelector('input[name="sexe"]').closest("fieldset");
    if (!sexeChecked || sexeChecked.value !== validations.sexe) {
      addError(sexeFieldset.lastElementChild, "Erreur ! Mauvais choix.");
    }

    // Situation familiale
    const situation = document.querySelector('input[name="situation"]');
    if (situation.value.trim().toLowerCase() !== validations.situation) {
      addError(situation, "Erreur ! Ce n'est pas la bonne situation.");
    }

    // Critères
    const selected = Array.from(document.querySelectorAll('input[name="criteres"]:checked')).map(c => c.value).sort();
    const expected = [...validations.criteres].sort();
    const criteresFieldset = document.querySelector('input[name="criteres"]').closest("fieldset");

    if (JSON.stringify(selected) !== JSON.stringify(expected)) {
      addError(criteresFieldset.lastElementChild, "Erreur ! Les critères ne correspondent pas.");
    }

    // Date d'enlèvement
    const date = document.getElementById("date-enlevement");
    if (date.value.trim().toUpperCase() !== validations["date-enlevement"]) {
      addError(date, "Erreur ! Ce n'est pas la bonne date.");
    }

    // Pays
    const pays = document.getElementById("pays");
    if (pays.value.trim().toUpperCase() !== validations.pays) {
      addError(pays, "Erreur ! Ce n'est pas le bon pays.");
    }

    // Ville
    const ville = document.getElementById("ville");
    if (ville.value.trim().toUpperCase() !== validations.ville) {
      addError(ville, "Erreur ! Ce n'est pas la bonne ville.");
    }

    // Rue
    const rue = document.getElementById("rue");
    if (rue.value.trim().toUpperCase() !== validations.rue) {
      addError(rue, "Erreur ! Ce n'est pas la bonne adresse.");
    }

    return errors;
  }

  nextButton.addEventListener("click", function () {
    const errors = isFormValid();
    if (errors === 0) {
      window.location.href = "fin_lesdisparus.html";
    } else {
      globalError.textContent =
        errors === 1
          ? "Il doit y avoir une erreur quelque part..."
          : "Il doit y avoir plusieurs erreurs dans le rapport...";
      globalError.style.display = "block";
      nextButton.insertAdjacentElement("afterend", globalError);
    }
  });
});
