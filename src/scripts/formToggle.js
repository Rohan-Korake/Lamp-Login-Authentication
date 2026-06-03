import { resetInputs } from "./resetInputs.js";
import { hideElement, showElement, hideComponent } from "./handleVisibility.js";

export function formToggle() {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  // Hide the forgot password card initially
  if (forgotPasswordForm) {
    hideComponent("forgotPasswordForm");
    hideComponent("signUpForm");
  }

  // Display the forgot password card and hide log in form
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", () => {
      resetInputs();
      hideElement("loginForm");
      hideComponent("signUpForm");
      hideElement("cancelButton");
      showElement("backToLoginButton");
      showElement("forgotPasswordForm");
    });
  }

  // Hide the forgot password card and display log in form
  const backToLoginButton = document.getElementById("backToLoginButton");
  if (backToLoginButton) {
    backToLoginButton.addEventListener("click", () => {
      resetInputs();
      hideElement("forgotPasswordForm");
      hideComponent("signUpForm");
      showElement("loginForm");
    });
  }

  //Show signup form and hide other form
  const singUplink = document.getElementById("singUplink");
  if (singUplink) {
    singUplink.addEventListener("click", () => {
      resetInputs();
      hideElement("loginForm");
      showElement("signUpForm");
      hideComponent("forgotPasswordForm");
    });
  }

  //Show login form hide other form
  const loginFormLink = document.getElementById("loginFormLink");
  if (loginFormLink) {
    loginFormLink.addEventListener("click", () => {
      resetInputs();
      hideElement("forgotPasswordForm");
      hideComponent("signUpForm");
      showElement("loginForm");
    });
  }

  //show reset password form and hide welcome page
  const changePassword = document.getElementById("changePassword");
  if (changePassword) {
    changePassword.addEventListener("click", () => {
      resetInputs();
      hideElement("welcomePage");
      hideElement("loginForm");
      showElement("authPage");
      showElement("changePasswordForm");
    });
  }

  // show welcome page and hide change password form
  const backToHomeButton = document.getElementById("backToHomeButton");
  if (backToHomeButton) {
    backToHomeButton.addEventListener("click", () => {
      resetInputs();
      hideElement("changePasswordForm");
      hideElement("authPage");
      showElement("welcomePage");
    });
  }

  const resetFormBackButton = document.getElementById("resetFormBackButton");
  if (resetFormBackButton) {
    resetFormBackButton.addEventListener("click", () => {
      resetInputs();
      hideElement("resetPasswordForm");
      showElement("loginForm");
    });
  }
}
