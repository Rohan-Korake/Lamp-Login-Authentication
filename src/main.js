import { resetInputs } from "./resetInputs.js";
import { toggleSwitch } from "./toggleSwitch.js";
import { formToggle } from "./formToggle.js";
import { userLogin } from "./login.js";
import { hideComponent, showElement } from "./toggleVisibility.js";

window.addEventListener("DOMContentLoaded", () => {
  initialElement();
  resetInputs();
  toggleSwitch();
  formToggle();
  userLogin();
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
