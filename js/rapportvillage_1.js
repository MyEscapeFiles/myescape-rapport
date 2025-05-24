console.log(" Script rapportvillage.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const globalError = document.createElement("p");
  globalError.id = "global-error";
  globalError.className = "error-message";
  globalError.style.color = "red";
  globalError.style.marginTop = "15px";
  globalError.style.display = "none";
  form.appendChild(globalError);

  const validations = {
    heure: "04:00:08",
    esperance: "SUD",
    attente: "OUEST",
    deuil: "NORD"
  };

  function showErrorAfter(element, message) {
    let existing = element.nextElementSibling;
    if (!existing || !existing.classList.contains("error-message")) {
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

  form.addEventListener("submit", function (e) {
    clearErrors();
    let errors = 0;

    const heure = document.getElementById("heure");
    if (heure.value.trim() !== validations.heure) {
      showErrorAfter(heure, "Erreur ! HH:MM:SS");
      errors++;
    }

    const esperance = document.getElementById("esperance");
    if (esperance.value.trim().toUpperCase() !== validations.esperance) {
      showErrorAfter(esperance, "Erreur ! Mauvaise direction.");
      errors++;
    }

    const attente = document.getElementById("attente");
    if (attente.value.trim().toUpperCase() !== validations.attente) {
      showErrorAfter(attente, "Erreur ! Mauvaise direction.");
      errors++;
    }

    const deuil = document.getElementById("deuil");
    if (deuil.value.trim().toUpperCase() !== validations.deuil) {
      showErrorAfter(deuil, "Erreur ! Mauvaise direction.");
      errors++;
    }

    if (errors > 0) {
      e.preventDefault();
      globalError.textContent = errors === 1
        ? "Il doit y avoir une erreur quelque part..."
        : "Il doit y avoir plusieurs erreurs dans le rapport...";
      globalError.style.display = "block";
    }
  });
});
