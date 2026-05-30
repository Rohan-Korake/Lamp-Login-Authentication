import { resetInputs } from "./resetInputs.js";
import { hideInfoFields } from "./handleVisibility.js";
export function toggleSwitch() {
  const toggleSwitch = document.getElementById("btnState");

  toggleSwitch.addEventListener("click", function () {
    resetInputs();
    hideInfoFields();
    toggleState();
  });
}

// handle the lamp state
let isLampOn = false;
export function toggleState() {
  isLampOn = !isLampOn;
  const btnSurface = document.getElementById("btnSurface");
  const glowState = document.getElementById("glowState");
  const unlitState = document.getElementById("unlitState");
  const glowLamp = document.getElementById("glowLamp");
  const unlitLamp = document.getElementById("unlitLamp");
  const formContainer = document.getElementById("formContainer");
  const usernameLabel = document.getElementById("usernameLabel");
  const passwordLabel = document.getElementById("passwordLabel");
  const registeredEmailLabel = document.getElementById("registeredEmailLabel");

  btnSurface.style.justifyContent = isLampOn ? "flex-end" : "flex-start";

  passwordLabel.style.display = isLampOn ? "block" : "none";
  usernameLabel.style.display = isLampOn ? "block" : "none";
  registeredEmailLabel.style.display = isLampOn ? "block" : "none";

  glowState.style.display = isLampOn ? "block" : "none";
  unlitState.style.display = isLampOn ? "none" : "block";

  glowLamp.style.display = isLampOn ? "block" : "none";
  unlitLamp.style.display = isLampOn ? "none" : "block";

  formContainer.style.visibility = isLampOn ? "visible" : "hidden";
  formContainer.style.animation = isLampOn
    ? "showAnimation 1s forwards ease"
    : "hiddenAnimation 1s forwards ease";

  if (isLampOn) {
    resetInputs();
    hideInfoFields();
  }
}
