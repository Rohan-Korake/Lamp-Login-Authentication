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
