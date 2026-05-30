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

function initialElement() {
  hideComponent("welcomePage");
  showElement("loginPage");
}

export function showLoader() {
  document.getElementById("loadingPage").style.display = "flex";
  document.querySelector(".loader").classList.add("active");
}

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
