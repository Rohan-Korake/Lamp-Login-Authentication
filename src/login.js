import {
  hideElement,
  showElement,
  hideError,
  showError,
} from "./handleVisibility.js";

import { showLoader, hideLoader } from "./main.js";

export function userLogin() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    const rememberMe = document.getElementById("rememberMe");

    hideError("loginFormError");
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "https://authentication-service-vdxw.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: userName,
            password: password,
          }),
        },
      );

      const data = await response.json();
      hideLoader();
      const status = response.status;
      const body = data;

      switch (status) {
        case 400:
          showError("loginFormError", "Invalid email or password");
          break;

        case 401:
          showError(
            "loginFormError",
            body.message || "Invalid email or password",
          );
          break;

        case 403:
          showError("loginFormError", "Verification email sent. Please verify");
          break;

        case 500:
          showError("loginFormError", body.message);
          break;

        case 200:
          hideError("loginFormError");
          hideElement("authPage");
          showElement("welcomePage");
          break;

        default:
          showError("loginFormError", "Unexpected error");
      }
    } catch (error) {
      hideLoader();
      if (!navigator.onLine) {
        showError("loginFormError", "No internet connection");
      } else {
        showError(
          "loginFormError",
          "Server unavailable. Please try again later.",
        );
      }
    }
  });
}
