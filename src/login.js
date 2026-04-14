import {
  hideElement,
  showElement,
  hideError,
  showError,
} from "./toggleVisibility.js";

import { showLoader, hideLoader } from "./main.js";

export function userLogin() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoader();
    hideError("loginFormError");
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    if (!userName || !password) {
      showError("loginFormError", "All fields are required");
      return;
    }

    try {
      const response = await fetch(
        "https://authentication-service-vdxw.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        case 401:
        case 403:
        case 500:
          showError("loginFormError", body.message);
          break;

        case 200:
          hideError("loginFormError");
          hideElement("loginPage");
          showElement("welcomePage");
          break;

        default:
          showError("loginFormError", "Unexpected error");
      }
    } catch (error) {
      hideLoader();
      showError("loginFormError", "Network error");
    }
  });
}
