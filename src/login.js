import {
  hideElement,
  showElement,
  hideError,
  showError,
} from "./toggleVisibility.js";

import { showLoader, hideLoader } from "./main.js";

export function userLogin() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showLoader();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    fetch("https://authentication-service-m7q3.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userName,
        password: password,
      }),
    })
      .then((response) => {
        return response.json().then((data) => {
          hideLoader();
          return {
            status: response.status,
            body: data,
          };
        });
      })
      .then((result) => {
        const { status, body } = result;

        switch (status) {
          case 400:
            showError("loginFormError", body.message);
            break;

          case 401:
            showError("loginFormError", body.message);
            break;

          case 403:
            showError("loginFormError", body.message);
            break;

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
      });
  });
}
