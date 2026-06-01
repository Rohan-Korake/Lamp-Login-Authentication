import {
  showError,
  hideError,
  hideElement,
  showSuccess,
  showElement,
} from "./handleVisibility.js";
import { resetInputs } from "./resetInputs.js";
import { showLoader, hideLoader, setCurrentRequest } from "./main.js";
import { API_URL } from "./config.js";

export function signUp() {
  document
    .getElementById("signUpForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      hideError("signUpFormError");
      setCurrentRequest("signUp");
      validateInput();
    });
}

// validate the user input before sending to server
export async function validateInput() {
  showLoader();
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

  let missingRequirements = [];
  if (confirmPassword.length < 8 || confirmPassword.length > 32)
    missingRequirements.push("8–32 characters");
  if (!/[A-Z]/.test(confirmPassword)) missingRequirements.push("uppercase");
  if (!/[a-z]/.test(confirmPassword)) missingRequirements.push("lowercase");
  if (!/[0-9]/.test(confirmPassword)) missingRequirements.push("number");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(confirmPassword))
    missingRequirements.push("symbol");

  if (missingRequirements.length > 0) {
    hideLoader();
    showError(
      "confirmPasswordError",
      `Password must include ${missingRequirements.join(" , ")}.`,
    );
    return;
  }
  handleSignUpRquest(newEmail, confirmPassword, firstName, lastName);
}

// handle signUp request
export async function handleSignUpRquest(
  newEmail,
  confirmPassword,
  firstName,
  lastName,
) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newEmail,
        password: confirmPassword,
        username: `${firstName.trim()} ${lastName.trim()}`,
      }),
    });

    const body = await response.json();
    hideLoader();
    const status = response.status;

    switch (status) {
      case 400:
        showError("confirmPasswordError", "Invalid input. Please try again");
        break;

      case 401:
        showError("signUpFormError", body.message || "Unauthorized");
        break;

      case 403:
        showError("signUpFormError", body.message || "Access denied");
        break;

      case 409:
        showError("newEmailError", "This email is already registered");
        break;

      case 500:
        hideElement("authPage");
        showElement("serverErrorContainer");
        break;

      case 200:
        resetInputs();
        hideError("signUpFormError");
        showSuccess(
          "signUpFormSuccess",
          "User Registered. Verification email sent. Please verify.",
        );
        break;

      default:
        showError("signUpFormError", "Unexpected error");
    }
  } catch (error) {
    hideLoader();
    if (!navigator.onLine) {
      showError("loginFormError", "No internet connection");
    } else {
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}
