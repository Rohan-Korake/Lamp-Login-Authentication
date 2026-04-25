import { hideInfoFields, showError, showSuccess } from "./handleVisibility.js";
import { hideLoader, setCurrentRequest, showLoader } from "./main.js";

export function changePassword() {
  document
    .getElementById("changePasswordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInfoFields();
      setCurrentRequest("changePassword");
      handleChangePassRequest();
    });
}

export async function handleChangePassRequest() {
  showLoader();
  const userMailId = document.getElementById("userMailId").value;
  try {
    const response = await fetch(
      "https://authentication-service-vdxw.onrender.com/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userMailId,
        }),
      },
    );

    const data = await response.json();
    hideLoader();
    const status = response.status;
    const body = data;

    switch (status) {
      case 400:
        showError("changePasswordFormError", "Invalid Email");
        break;

      case 401:
        showError("changePasswordFormError", body.message);
        break;

      case 500:
        hideElement("authPage");
        showElement("serverErrorContainer");
        break;

      case 200:
        showSuccess("changePasswordFormSuccess", "Email sent successfully.");
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
