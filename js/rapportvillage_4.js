console.log("✅ Script rapportvillage_4.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const validations = {
    "code-ascenseur": "331130"
  };

  // Message d’erreur global
  const globalError = document.createElement("p");
  globalError.id = "global-error";
  globalError.className = "error-message";
  globalError.style.color = "red";
  globalError.style.marginTop = "20px";
  globalError.style.display = "none";
  form.appendChild(globalError);

  function showErrorAfter(element, message) {
    const existing = element.parentNode.querySelector(".error-message");
    if (!existing) {
      const error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.marginTop = "6px";
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

    const ascenseur = document.getElementById("code-ascenseur");
    if (ascenseur.value.trim() !== validations["code-ascenseur"]) {
      showErrorAfter(ascenseur, "Erreur ! N'hésitez pas à consulter la section indice.");
      errors++;
    }

    if (errors > 0) {
      e.preventDefault();
      globalError.textContent =
        errors === 1
          ? "Il doit y avoir une erreur quelque part..."
          : "Il doit y avoir plusieurs erreurs dans le rapport...";
      globalError.style.display = "block";
    }
  });
});
