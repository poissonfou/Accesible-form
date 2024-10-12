const radioInputContainers = document.querySelectorAll(".form__radiobox");

function selectRadioInput(container) {
  if (container.classList.contains("radio__selected")) {
    container.children[0].checked = false;
    container.classList.remove("radio__selected");
    return;
  }

  const otherContainer = document.querySelector(".radio__selected");
  if (otherContainer) {
    otherContainer.children[0].checked = false;
    otherContainer.classList.remove("radio__selected");
  }

  container.children[0].checked = true;
  container.classList.add("radio__selected");
}

radioInputContainers.forEach((container) => {
  container.addEventListener("click", () => selectRadioInput(container));
});

const consentBox = document.getElementById("consent-box");

function changeCheckbox() {
  consentBox.children[0].checked = !consentBox.children[0].checked;
}

consentBox.addEventListener("click", changeCheckbox);

consentBox.children[0].addEventListener("click", changeCheckbox);

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const firstName = form.get("first_name").trim();
  const lastName = form.get("last_name").trim();
  const email = form.get("email").trim();
  const generalRadio = form.get("general");
  const supportRadio = form.get("support");
  const message = form.get("message");
  const consentCheckbox = form.get("consent");

  console.log(generalRadio, supportRadio, consentCheckbox);

  let hasError = false;
  const regex = /^\s*$/;

  if (!firstName.length || regex.test(firstName)) {
    hasError = true;
    const input = document.getElementById("first-name");
    input.setAttribute("aria-invalid", true);
    const errorMsg = document.getElementById("error-firstname");
    errorMsg.removeAttribute("hidden");
  }

  if (!lastName.length || regex.test(lastName)) {
    hasError = true;
    const input = document.getElementById("last-name");
    input.setAttribute("aria-invalid", true);
    const errorMsg = document.getElementById("error-lastname");
    errorMsg.removeAttribute("hidden");
  }

  if (!email.length || !email.includes("@") || regex.test(email)) {
    hasError = true;
    const input = document.getElementById("email");
    input.setAttribute("aria-invalid", true);
    const errorMsg = document.getElementById("error-email");
    errorMsg.removeAttribute("hidden");
  }

  if (generalRadio == null && supportRadio == null) {
    hasError = true;
    const errorMsg = document.getElementById("error-fieldset");
    errorMsg.removeAttribute("hidden");
  }

  if (!message.length || regex.test(message)) {
    console.log("here");
    hasError = true;
    const input = document.getElementById("message");
    input.setAttribute("aria-invalid", true);
    const errorMsg = document.getElementById("error-message");
    errorMsg.removeAttribute("hidden");
  }

  if (consentCheckbox == null) {
    hasError = true;
    const errorMsg = document.getElementById("error-checkbox");
    errorMsg.removeAttribute("hidden");
  }

  if (hasError) return;

  const inputs = document.querySelectorAll("input");
  const textarea = document.querySelector("textarea");
  textarea.value = "";
  inputs.forEach((input) => {
    input.value = "";
    input.checked = false;
  });

  const radioSelected = document.querySelector(".radio__selected");
  radioSelected.classList.remove("radio__selected");

  const popup = document.getElementById("popup");
  popup.classList.add("popup--active");
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  setTimeout(() => popup.classList.remove("popup--active"), 2500);
});
