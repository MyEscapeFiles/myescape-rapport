console.log("✅ Script rapportvillage_2.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("questionnaire");

  const validations = {
    coeur: "HAUT",
    pic: "GAUCHE",
    carreau: "DROITE",
    trefle: "DROITE"
  };

  const globalError = document.createElement("p");
  globalError.id = "global-error";
  globalError.className = "error-message";
  globalError.style.color = "red";
  globalError.style.marginTop = "15px";
  globalError.style.textAlign = "center";
  globalError.style.display = "none";

  // Insère le message sous le bouton
  const button = form.querySelector('button[type="submit"]');
  button.insertAdjacentElement("afterend", globalError);

  function showErrorAfter(element, message) {
    let existing = element.parentNode.querySelector(".error-message");
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
    button.insertAdjacentElement("afterend", globalError);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();
    let errors = 0;

    ["coeur", "pic", "carreau", "trefle"].forEach(name => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      const fieldset = document.querySelector(`input[name="${name}"]`).closest("fieldset");

      if (!selected || selected.value.toUpperCase() !== validations[name]) {
        showErrorAfter(fieldset.lastElementChild, "Erreur, n'hésitez pas à consulter la section indice.");
        errors++;
      }
    });

    if (errors > 0) {
      globalError.textContent = "Erreur, n'hésitez pas à consulter la section indice.";
      globalError.style.display = "block";
    } else {
      // Si tout est correct → aller à la page suivante
      window.location.href = "rapportvillage_3.html";
    }
  });
});
