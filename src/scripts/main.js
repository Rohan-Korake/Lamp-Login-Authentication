import { resetInputs } from "./resetInputs.js";
import { toggleSwitch } from "./toggleSwitch.js";
import { formToggle } from "./formToggle.js";
import { handleLoginRequest, userLogin } from "./login.js";
import { signUp, validateInput } from "./signUp.js";
import { forgotPass, handleForgotPassRequest } from "./forgotPassword.js";
import { changePassword, handleChangePassRequest } from "./changePassword.js";
import { handleLogoutRequest, logout } from "./logout.js";
import { hideComponent, hideElement, showElement } from "./handleVisibility.js";

window.addEventListener("DOMContentLoaded", () => {
  initialElement();
  resetInputs();
  toggleSwitch();
  formToggle();
  userLogin();
  signUp();
  forgotPass();
  changePassword();
  logout();
});

// validate password
export function validatePassword(password) {
  let missingRequirements = [];
  if (password.length < 8 || password.length > 32)
    missingRequirements.push("8–32 characters");
  if (!/[A-Z]/.test(password)) missingRequirements.push("uppercase");
  if (!/[a-z]/.test(password)) missingRequirements.push("lowercase");
  if (!/[0-9]/.test(password)) missingRequirements.push("number");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    missingRequirements.push("symbol");

  return missingRequirements;
}

// handle initial Element visibility
function initialElement() {
  hideComponent("welcomePage");
  showElement("loginPage");
}

// handle loader start
export function showLoader() {
  document.getElementById("loadingPage").style.display = "flex";
  document.querySelector(".loader").classList.add("active");
}

// handle loader stop
export function hideLoader() {
  document.getElementById("loadingPage").style.display = "none";
  document.querySelector(".loader").classList.remove("active");
}

// handle eye opener event
document.querySelectorAll(".toggle-eye").forEach((icon) => {
  icon.addEventListener("click", () => {
    const targetId = icon.getAttribute("data-target");
    const input = document.getElementById(targetId);

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";

    icon.classList.toggle("fa-eye", !isHidden);
    icon.classList.toggle("fa-eye-slash", isHidden);
  });
});

let currectRequest = null;
// update the current request
export function setCurrentRequest(requestName) {
  currectRequest = requestName;
}

// handle retry API request event
document.getElementById("retryButton").addEventListener("click", () => {
  hideElement("serverErrorContainer");
  switch (currectRequest) {
    case "signUp":
      validateInput();
      break;

    case "login":
      handleLoginRequest();
      break;

    case "forgotPassword":
      handleForgotPassRequest();
      break;

    case "changePassword":
      handleChangePassRequest();
      break;

    case "logout":
      handleLogoutRequest();
      break;

    default:
      location.reload();
      break;
  }
});
