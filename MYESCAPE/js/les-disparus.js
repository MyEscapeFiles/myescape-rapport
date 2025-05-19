console.log("✅ Script les-disparus.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("goToNext");
  const globalError = document.getElementById("global-error");

  const validations = {
    question1: "TON FRERE EST ENCORE EN VIE",
    entree: "cuisine",
    cachette: "salon",
    sortie: "entree"
  };

  function showErrorAfter(element, message) {
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
    globalError.style.display = "none";
    globalError.textContent = "";
  }

  function isFormValid() {
    clearErrors();
    let errors = 0;

    // Texte (question 1)
    const q1Input = document.getElementById("question1");
    const q1 = q1Input.value.trim().toUpperCase();
    if (q1 !== validations.question1) {
      showErrorAfter(q1Input, "Erreur ! N'hésitez pas à consulter la section indice.");
      errors++;
    }

    // Radios
    ["entree", "cachette", "sortie"].forEach(name => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      const fieldset = document.getElementById(`fieldset-${name}`);
      if (!selected || selected.value !== validations[name]) {
        showErrorAfter(fieldset.lastElementChild, "Erreur ! N'hésitez pas à consulter la section indice.");
        errors++;
      }
    });

    return errors;
  }

  nextButton.addEventListener("click", function () {
    const errors = isFormValid();
    if (errors === 0) {
      window.location.href = "suite-lesdisparus.html";
    } else {
      globalError.textContent =
        errors === 1
          ? "Il doit y avoir une erreur quelque part..."
          : "Il doit y avoir plusieurs erreurs dans le rapport...";
      globalError.style.display = "block";

      // ✅ Repositionne le message sous le bouton
      nextButton.insertAdjacentElement("afterend", globalError);
    }
  });
});
