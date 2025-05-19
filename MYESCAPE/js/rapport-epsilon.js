console.log("✅ Script rapport-epsilon.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("goToNext");
  const globalError = document.getElementById("global-error");

  const validations = {
    alien: "Xyloth",
    heure_incident: "15h37",
    temperature: "11G",
    pression: "8J",
    refroidissement: "G25",
    matricule_01: "SMITH",
    matricule_02: "TAYLOR",
    matricule_03: "WILLIAMS",
    matricule_04: "JOHNSON",
    matricule_05: "ELIOT",
    code_infirmerie: "3048",
  };

  function showErrorAfterElement(element, message) {
    let error = element.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.marginTop = "5px";
      element.parentNode.insertBefore(error, element.nextSibling);
    }
    error.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    if (globalError) {
      globalError.style.display = "none";
      globalError.textContent = "";
    }
  }

  function isFormValid() {
    let valid = true;
    let errorCount = 0;
    clearErrors();

    // Sélections
    const alien = document.getElementById("alien");
    if (alien.value.trim() !== validations.alien) {
      showErrorAfterElement(alien, "Erreur ! N'hésitez pas à consulter la section indice.");
      valid = false;
      errorCount++;
    }

    const heure = document.getElementById("heure_incident");
    if (heure.value.trim() !== validations.heure_incident) {
      showErrorAfterElement(heure, "Erreur ! N'hésitez pas à consulter la section indice.");
      valid = false;
      errorCount++;
    }

    // Champs texte
    const textIds = ["temperature", "pression", "refroidissement", "code_infirmerie"];
    textIds.forEach(id => {
      const input = document.getElementById(id);
      if (!input || input.value.trim() !== validations[id]) {
        showErrorAfterElement(input, "Erreur ! N'hésitez pas à consulter la section indice.");
        valid = false;
        errorCount++;
      }
    });

    // Matricules
    const matricules = ["matricule_01", "matricule_02", "matricule_03", "matricule_04", "matricule_05"];
    matricules.forEach(name => {
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      const fieldset = document.querySelector(`input[name="${name}"]`).closest("fieldset");
      if (!checked || checked.value !== validations[name]) {
        showErrorAfterElement(fieldset, "Erreur ! N'hésitez pas à consulter la section indice.");
        valid = false;
        errorCount++;
      }
    });

    // Affichage du message général
    if (!valid && globalError) {
      globalError.style.display = "block";
      globalError.textContent =
        errorCount === 1
          ? "⚠️ Il doit y avoir une erreur quelque part..."
          : "⚠️ Il doit y avoir plusieurs erreurs dans le rapport...";
    }

    return valid;
  }

  nextButton.addEventListener("click", function () {
    if (isFormValid()) {
      window.location.href = "suite-epsilon.html";
    }
  });
});
