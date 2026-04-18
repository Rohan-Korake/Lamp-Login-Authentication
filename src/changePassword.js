import { hideInfoFields, showError, showSuccess } from "./handleVisibility.js";
import { hideLoader, showLoader } from "./main.js";

export function changePassword() {
  document
    .getElementById("changePasswordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInfoFields();
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

          case 200:
            showSuccess(
              "changePasswordFormSuccess",
              "Email sent successfully.",
            );
            break;

          default:
            showError("changePasswordFormError", "Unexpected error");
        }
      } catch (error) {
        hideLoader();
        if (!navigator.onLine) {
          showError("changePasswordFormError", "No internet connection");
        } else {
          showError(
            "changePasswordFormError",
            "Server unavailable. Please try again later.",
          );
        }
      }
    });
}
