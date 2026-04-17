import { showLoader } from "./main.js";

export function changePassword() {
  document
    .getElementById("changePasswordForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      showLoader();

      try {
        const response = await fetch("");
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
