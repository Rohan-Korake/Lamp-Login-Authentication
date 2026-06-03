import {
  hideElement,
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

export function changePassword() {
  const changePasswordForm = document.getElementById("changePasswordForm");
  if (changePasswordForm) {
    changePasswordForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInfoFields();
      setCurrentRequest("changePassword");
      handleChangePassRequest();
    });
  }
}

// handle change password request
export async function handleChangePassRequest() {
  showLoader();
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newChangePassword").value;

  let missingRequirements = validatePassword(newPass);

  if (missingRequirements.length > 0) {
    hideLoader();
    showError(
      "newChangePasswordError",
      `Password must include ${missingRequirements.join(" , ")}.`,
    );
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        oldPassword: oldPass,
        newPassword: newPass,
      }),
    });

    const body = await response.json();
    hideLoader();
    const status = response.status;

    switch (status) {
      case 400:
        showError(
          "changePasswordFormError",
          body.message || "Invalid old Password",
        );
        break;

      case 401:
        showError("changePasswordFormError", body.message || "Session expired");
        break;

      case 404:
        showError("changePasswordFormError", body.message || "User not found");
        break;

      case 200:
        showSuccess(
          "changePasswordFormSuccess",
          body.message || "Password changed successfully.",
        );
        break;

      case 500:
        hideElement("authPage");
        showElement("serverErrorContainer");
        break;

      default:
        showError("changePasswordFormError", "Unexpected error");
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
