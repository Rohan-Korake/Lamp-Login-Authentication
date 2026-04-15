import { showError, hideError, hideElement } from './toggleVisibility.js';
import { showLoader, hideLoader } from './main.js';

export function signUp() {
  document
    .getElementById('signUpForm')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoader();
      hideError('signUpFormError');
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const newEmail = document.getElementById('newEmail').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (newPassword != confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        hideLoader();
        return;
      } else {
        hideError('confirmPasswordError');
      }

      let missingRequirements = [];
      if (confirmPassword.length < 8 || confirmPassword.length > 32)
        missingRequirements.push('8–32 characters');
      if (!/[A-Z]/.test(confirmPassword)) missingRequirements.push('uppercase');
      if (!/[a-z]/.test(confirmPassword)) missingRequirements.push('lowercase');
      if (!/[0-9]/.test(confirmPassword)) missingRequirements.push('number');
      if (!/[!@#$%^&*(),.?\":{}|<>]/.test(confirmPassword))
        missingRequirements.push('symbol');

      if (missingRequirements.length > 0) {
        hideLoader();
        showError(
          'confirmPasswordError',
          `Password must include ${missingRequirements.join(' , ')}.`
        );
        return;
      }

      try {
        const response = await fetch(
          'https://authentication-service-vdxw.onrender.com/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: newEmail,
              password: confirmPassword,
              name: `${firstName.trim()} ${lastName.trim()}`,
            }),
          }
        );

        const data = await response.json();
        hideLoader();
        const status = response.status;
        const body = data;

        switch (status) {
          case 400:
            showError(
              'confirmPasswordError',
              'Invalid input. Please try again'
            );
            break;

          case 401:
          case 403:
          case 409:
          case 500:
            showError('signUpFormError', body.message);
            break;

          case 200:
            hideError('signUpFormError');
            hideElement('signUpForm');
            showElement('loginPage');
            break;

          default:
            showError('signUpFormError', 'Unexpected error');
        }
      } catch (error) {
        hideLoader();
        if (!navigator.onLine) {
          showError('loginFormError', 'No internet connection');
        } else {
          showError(
            'loginFormError',
            'Server unavailable. Please try again later.'
          );
        }
      }
    });
}
