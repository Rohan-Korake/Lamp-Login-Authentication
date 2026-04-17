import { resetInputs } from "./resetInputs.js";
import { toggleSwitch } from "./toggleSwitch.js";
import { formToggle } from "./formToggle.js";
import { userLogin } from "./login.js";
import { signUp } from "./signUp.js";
import { forgotPass } from "./forgotPassword.js";
import { changePassword } from "./changePassword.js";
import { hideComponent, showElement } from "./handleVisibility.js";

window.addEventListener("DOMContentLoaded", () => {
  initialElement();
  resetInputs();
  toggleSwitch();
  formToggle();
  userLogin();
  signUp();
  forgotPass();
  changePassword();
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
