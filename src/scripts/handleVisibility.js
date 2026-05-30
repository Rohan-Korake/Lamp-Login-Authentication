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

// reset all input feilds and error fields
export function hideInfoFields() {
  document.getElementById("logOutError").style.display = "none";

  const fieldError = document.querySelectorAll(".field-error");
  fieldError.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });

  const formError = document.querySelectorAll(".form-error");
  formError.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });

  const formSuccess = document.querySelectorAll(".form-success");
  formSuccess.forEach((element) => {
    element.innerText = "";
    element.style.display = "none";
  });
}
