import { showLoader, hideLoader } from './main.js';
import { showSuccess } from './handleVisibility.js';
export function forgotPass() {
  document
    .getElementById('forgotPasswordForm')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoader();
      const registeredEmail = document.getElementById('registeredEmail').value;

      try {
        const response = await fetch(
          'https://authentication-service-vdxw.onrender.com/auth/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: registeredEmail,
            }),
          }
        );

        console.log(response);
        hideLoader();
        const status = response.status;
        const body = data;

        switch (status) {
          case 200:
            showSuccess(
              'forgotPasswordFormsuccess',
              'Email sent successfully.'
            );
            break;

          default:
            showError('forgotPasswordFormError', 'Unexpected error');
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
