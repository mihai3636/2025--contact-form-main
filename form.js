console.log("Hello world!");

const form = document.querySelector("form");

function validateField(field) {
  const errorEl =
    field.type === "radio"
      ? field.closest("fieldset").querySelector(".error-message")
      : field.parentElement.querySelector(".error-message");

  if (!field.validity.valid) {
    console.log("Field is invalid: ", field);
    errorEl.textContent = field.dataset.error || "This field is required";

    return false;
  }
  errorEl.textContent = "";

  // console.log(`field is valid: `, field);
  return true;
}

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => {
    let isValid = validateField(input);
    if (isValid) {
      input.classList.remove("user-invalid");
      return;
    }
    input.classList.add("user-invalid");
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;
  const fields = form.querySelectorAll("input, textarea");

  fields.forEach((field) => {
    console.log(`Checking  ${field.name}`);
    const fieldValid = validateField(field);

    if (!fieldValid) {
      isValid = false;
    }
  });

  if (isValid) {
    console.log("submitting");
    // send the form data
    form.reset();
  } else {
    form.querySelector(":invalid").focus();
  }
});
