import { resetInputs } from "./resetInputs.js";

export function hideElement(element) {
  let domElement = document.getElementById(element);
  if (domElement) {
    domElement.style.display = "none";
    domElement.style.animation = "hiddenAnimation 1s forwards ease";
  }
  resetInputs();
}

export function showElement(element) {
  let domElement = document.getElementById(element);
  if (domElement) {
    domElement.style.display = "flex";
    domElement.style.animation = "showAnimation 1s forwards ease";
  }
  resetInputs();
}

export function hideComponent(component) {
  let domComponent = document.getElementById(component);
  if (domComponent) {
    domComponent.style.display = "none";
  }
}

export function showError(element, message) {
  const ele = document.getElementById(element);
  ele.style.display = "flex";
  ele.innerText = message;
}

export function hideError(element) {
  const ele = document.getElementById(element);
  ele.style.display = "none";
  ele.innerText = "";
}

export function showSuccess(element, message) {
  const ele = document.getElementById(element);
  ele.style.display = "flex";
  ele.innerText = message;
}

export function hideInfoFields() {
  document.getElementById("loginFormError").style.display = "none";
  document.getElementById("forgotPasswordFormError").style.display = "none";
  document.getElementById("signUpFormError").style.display = "none";

  const formerror = document.querySelectorAll(".field-error");
  formerror.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });

  const formsuccess = document.querySelectorAll(".form-success");
  formsuccess.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });
}
