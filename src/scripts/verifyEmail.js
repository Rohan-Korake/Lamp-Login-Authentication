import { API_URL } from "./config.js";
import {
  hideElement,
  showElement,
  showError,
  showSuccess,
} from "./handleVisibility.js";

document.addEventListener("DOMContentLoaded", async () => {
  await handleVerifyEmailRequest();
});

// handle email verification request
export async function handleVerifyEmailRequest() {
  const params = await new URLSearchParams(window.location.search);
  const token = params.get("token");

  try {
    const response = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationToken: token,
      }),
    });

    const body = await response.json();
    const status = response.status;

    switch (status) {
      case 400:
      case 401:
        showError(
          "reponseMessage",
          body.message || "Oops! This link has expired!",
        );
        document.getElementById("responseIcon").innerHTML = `<i
            class="fa-regular fa-circle-xmark"
            style="color: #fa0101"
          ></i>`;
        showElement("resendEmail");
        hideElement("goTOLogin");
        break;

      case 409:
        showError("reponseMessage", body.message);
        document.getElementById("responseIcon").innerHTML = `<i
            class="fa-regular fa-circle-check"
            style="color: #0ebe0e"
          ></i>`;
        hideElement("resendEmail");
        hideElement("goTOLogin");
        break;

      case 200:
        showSuccess(
          "reponseMessage",
          body.message || "Email Verified Successfully!",
        );
        document.getElementById("responseIcon").innerHTML = `<i
            class="fa-regular fa-circle-check"
            style="color: #0ebe0e"
          ></i>`;
        hideElement("resendEmail");
        showElement("goTOLogin");
        break;

      default:
        showError("reponseMessage", "Unexpected error");
        document.getElementById("responseIcon").innerHTML = `<i
            class="fa-regular fa-circle-xmark"
            style="color: #fa0101"
          ></i>`;
        break;
    }
  } catch (error) {
    if (!navigator.onLine) {
      showError("changePasswordFormError", "No internet connection");
    } else {
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}
