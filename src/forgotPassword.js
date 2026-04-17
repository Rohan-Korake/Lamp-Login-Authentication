import { showLoader, hideLoader } from "./main.js";
import { showError, showSuccess } from "./handleVisibility.js";
export function forgotPass() {
  document
    .getElementById("forgotPasswordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
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

        console.log(response);
        hideLoader();
        const status = response.status;
        const body = data;

        switch (status) {
          case 400:
            showError(
              "forgotPasswordFormError",
              body.message || "Invalid input",
            );
            break;

          case 200:
            showSuccess(
              "forgotPasswordFormSuccess",
              "Email sent successfully.",
            );
            break;

          default:
            showError("forgotPasswordFormError", "Unexpected error");
        }
      } catch (error) {
        hideLoader();
        if (!navigator.onLine) {
          showError("forgotPasswordFormError", "No internet connection");
        } else {
          showError(
            "forgotPasswordFormError",
            "Server unavailable. Please try again later.",
          );
        }
      }
    });
}
