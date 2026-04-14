import { showError, hideError } from "./toggleVisibility.js";
import { showLoader, hideLoader } from "./main.js";

export function signUp() {
  document
    .getElementById("signUpForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoader();
      hideError("signUpFormError");
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const newEmail = document.getElementById("newEmail").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword != confirmPassword) {
        showError("confirmPasswordError", "Passwords do not match");
        hideLoader();
        return;
      } else {
        hideError("confirmPasswordError");
      }

      try {
        const response = await fetch(
          "https://authentication-service-vdxw.onrender.com/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: newEmail,
              password: confirmPassword,
              name: `${firstName.trim()} ${lastName.trim()}`,
            }),
          },
        );

        const data = await response.json();
        hideLoader();
        const status = response.status;
        const body = data;

        switch (status) {
          case 400:
          case 401:
          case 403:
          case 500:
            showError("signUpFormError", body.message);
            break;

          case 200:
            hideError("signUpFormError");
            hideElement("signUpForm");
            showElement("loginPage");
            break;

          default:
            showError("signUpFormError", "Unexpected error");
        }
      } catch (error) {
        hideLoader();
        showError("signUpFormError", "No internet connection");
      }
    });
}
