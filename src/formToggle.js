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
  document
    .getElementById("forgotPasswordLink")
    .addEventListener("click", () => {
      resetInputs();
      hideElement("loginForm");
      hideComponent("signUpForm");
      hideElement("cancelButton");
      showElement("backToLoginButton");
      showElement("forgotPasswordForm");
    });

  // Hide the forgot password card and display log in form
  document.getElementById("backToLoginButton").addEventListener("click", () => {
    resetInputs();
    hideElement("forgotPasswordForm");
    hideComponent("signUpForm");
    showElement("loginForm");
  });

  //Show signup form and hide other form
  document.getElementById("singUplink").addEventListener("click", () => {
    resetInputs();
    hideElement("loginForm");
    showElement("signUpForm");
    hideComponent("forgotPasswordForm");
  });

  //Show login form hide other form
  document.getElementById("loginFormLink").addEventListener("click", () => {
    resetInputs();
    hideElement("forgotPasswordForm");
    hideComponent("signUpForm");
    showElement("loginForm");
  });

  //show reset password form and hide welcome page
  document.getElementById("changePassword").addEventListener("click", () => {
    resetInputs();
    hideElement("welcomePage");
    hideElement("loginForm");
    showElement("authPage");
    showElement("changePasswordForm");
  });

  // show welcome page and hide change password form
  document.getElementById("backToHomeButton").addEventListener("click", () => {
    resetInputs();
    hideElement("changePasswordForm");
    hideElement("authPage");
    showElement("welcomePage");
  });
}
