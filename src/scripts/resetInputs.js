import { hideInfoFields } from "./handleVisibility.js";
export function resetInputs() {
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  loginForm && loginForm.reset();
  signUpForm && signUpForm.reset();
  forgotPasswordForm && forgotPasswordForm.reset();
  hideInfoFields();
}
