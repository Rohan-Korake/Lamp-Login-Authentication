import { resetInputs } from './resetInputs.js';
import { hideElement, showElement, hideComponent } from './handleVisibility.js';

export function formToggle() {
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');

  // Hide the forgot password card initially
  if (forgotPasswordForm) {
    hideComponent('forgotPasswordForm');
    hideComponent('signUpForm');
  }

  // Display the forgot password card and hide log in form
  forgotPasswordLink.addEventListener('click', function () {
    resetInputs();
    hideElement('loginForm');
    hideComponent('signUpForm');
    hideElement('cancelButton');
    showElement('backToLoginButton');
    showElement('forgotPasswordForm');
  });

  // Hide the forgot password card and display log in form
  document.getElementById('backToLoginButton').addEventListener('click', () => {
    resetInputs();
    hideElement('forgotPasswordForm');
    hideComponent('signUpForm');
    showElement('loginForm');
  });

  //Show signup form and hide other form
  document.getElementById('singUplink').addEventListener('click', () => {
    resetInputs();
    hideElement('loginForm');
    showElement('signUpForm');
    hideComponent('forgotPasswordForm');
  });

  //Show login form hide other form
  document.getElementById('loginFormLink').addEventListener('click', () => {
    resetInputs();
    hideElement('forgotPasswordForm');
    hideComponent('signUpForm');
    showElement('loginForm');
  });

  //show reset password form and hide welcome page
  document.getElementById('changePassword').addEventListener('click', () => {
    resetInputs();
    hideElement('welcomePage');
    hideComponent('loginForm');
    hideComponent('backToLoginButton');
    showElement('formContainer');
    showElement('forgotPasswordForm');
    showElement('loginPage');
    showElement('cancelButton');
  });

  // show welcome page and hide reset password form
  document.getElementById('cancelButton').addEventListener('click', () => {
    resetInputs();
    hideElement('forgotPasswordForm');
    hideElement('loginPage');
    showElement('welcomePage');
  });
}
