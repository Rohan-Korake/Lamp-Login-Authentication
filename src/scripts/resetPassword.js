import {
  hideElement,
  hideError,
  hideInfoFields,
  showElement,
  showError,
  showSuccess,
} from "./handleVisibility.js";
import {
  hideLoader,
  setCurrentRequest,
  showLoader,
  validatePassword,
} from "./main.js";
import { API_URL } from "./config.js";

export function resetPassword() {
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInfoFields();
      setCurrentRequest("Reset Password");
      await handleResetPasswordRequest();
    });
  }
}

export async function handleResetPasswordRequest() {
  showLoader();
  const newPassword = document.getElementById("resetNewPassword").value;
  const confirmPassword = document.getElementById("resetConfirmPassword").value;

  if (newPassword != confirmPassword) {
    showError("resetConfirmPasswordError", "Passwords do not match");
    hideLoader();
    return;
  } else {
    hideError("resetConfirmPasswordError");
  }

  let missingRequirements = validatePassword(confirmPassword);

  if (missingRequirements.length > 0) {
    hideLoader();
    showError(
      "resetConfirmPasswordError",
      `Password must include ${missingRequirements.join(" , ")}.`,
    );
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newPassword: confirmPassword,
      }),
    });

    const body = await response.json();
    hideLoader();
    const status = response.status;

    switch (status) {
      case 400:
        showError("resetPasswordFormError", body.message || "Invalid token.");
        break;

      case 401:
        showError(
          "resetPasswordFormError",
          body.message || "Invalid reset link.",
        );
        break;

      case 402:
        showError(
          "resetPasswordFormError",
          body.message || "Invalid reset link data.",
        );
        break;

      case 200:
        showSuccess(
          "resetPasswordFormSuccess",
          "Password updated successfully. Redirecting to login...",
        );
        redirectToLogin();
        break;

      default:
        showError("resetPasswordFormError", "Unexpected error");
        break;
    }
  } catch (error) {
    hideLoader();
    if (!navigator.onLine) {
      showError("changePasswordFormError", "No internet connection");
    } else {
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}

// after successful reset password automatically redirect to login page
const redirectToLogin = () => {
  setTimeout(() => {
    window.location.href = "http://localhost:5500";
  }, 3000);
};
