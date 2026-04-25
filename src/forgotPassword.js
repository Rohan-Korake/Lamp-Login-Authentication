import { showLoader, hideLoader, setCurrentRequest } from "./main.js";
import {
  hideError,
  hideInfoFields,
  showError,
  showSuccess,
} from "./handleVisibility.js";
export function forgotPass() {
  document
    .getElementById("forgotPasswordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInfoFields();
      setCurrentRequest("forgotPassword");
      handleForgotPassRequest();
    });
}

export async function handleForgotPassRequest() {
  showLoader();
  const registeredEmail = document.getElementById("registeredEmail").value;

  try {
    const response = await fetch(
      "https://authentication-service-vdxw.onrender.com/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: registeredEmail,
        }),
      },
    );

    const data = await response.json();
    hideLoader();
    const status = response.status;
    const body = data;

    switch (status) {
      case 400:
        showError("forgotPasswordFormError", "Invalid input");
        break;

      case 401:
        showError("forgotPasswordFormError", body.message || "Invalid input");
        break;

      case 500:
        hideElement("authPage");
        showElement("serverErrorContainer");
        break;

      case 200:
        showSuccess("forgotPasswordFormSuccess", "Email sent successfully.");
        break;

      default:
        showError("forgotPasswordFormError", "Unexpected error");
    }
  } catch (error) {
    hideLoader();
    if (!navigator.onLine) {
      showError("forgotPasswordFormError", "No internet connection");
    } else {
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}
