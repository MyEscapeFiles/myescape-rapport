console.log("✅ Script suite-epsilon.js chargé");

document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("goToNext");
  const globalError = document.getElementById("global-error");

  const validations = {
    etape1: "SJTWE",
    etape2: "9",
    etape3: "2050100",
    etape4: "HELP",
    code_lancement: "547"
  };

  function showErrorBelow(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("p");
      error.className = "error-message";
      error.style.color = "red";
      error.style.marginTop = "5px";
      input.parentNode.insertBefore(error, input.nextSibling);
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

    const ids = ["etape1", "etape2", "etape3", "etape4", "code_lancement"];

    ids.forEach(id => {
      const input = document.getElementById(id);
      const userInput = input.value.trim().toUpperCase();
      const expected = validations[id];

      if (userInput !== expected) {
        showErrorBelow(input, "Erreur ! N'hésitez pas à consulter la section indice.");
        valid = false;
        errorCount++;
      }
    });

    if (!valid && globalError) {
      globalError.textContent =
        errorCount > 1
          ? "❌ Il doit y avoir plusieurs erreurs dans le rapport..."
          : "❌ Il doit y avoir une erreur quelque part...";
      globalError.style.display = "block";
    }

    return valid;
  }

  nextButton.addEventListener("click", function () {
    if (isFormValid()) {
      window.location.href = "fin-epsilon.html";
    }
  });
});
