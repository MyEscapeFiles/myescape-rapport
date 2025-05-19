console.log("✅ Script rapportvillage_3.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  const validations = {
    "etage-lucas": "-42",
    obscura: "MORROW",
    vauss: "ASTRATECH SOLUTION",
    cellule: "Fou-Reine-Tour-Cavalier-Pion-Roi"  // ✅ Corrigé ici
  };

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

    // Étage Lucas
    const lucas = document.getElementById("etage-lucas");
    if (lucas.value.trim() !== validations["etage-lucas"]) {
      showErrorAfter(lucas, "Erreur ! N'hésitez pas à consulter la section indice.");
      errors++;
    }

    // Obscura
    const obscura = document.getElementById("obscura");
    if (obscura.value.trim().toUpperCase() !== validations.obscura) {
      showErrorAfter(obscura, "Erreur ! N'hésitez pas à consulter la section indice.");
      errors++;
    }

    // VAUSS
    const vauss = document.getElementById("vauss");
    if (vauss.value.trim().toUpperCase() !== validations.vauss) {
      showErrorAfter(vauss, "Erreur ! N'hésitez pas à consulter la section indice.");
      errors++;
    }

    // Cellule
    const cellule = document.querySelector('input[name="cellule"]:checked');
    const celluleFieldset = document.querySelector('input[name="cellule"]').closest("fieldset");

    if (!cellule || cellule.value.trim() !== validations.cellule) {
      showErrorAfter(celluleFieldset.lastElementChild, "Erreur ! N'hésitez pas à consulter la section indice.");
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
