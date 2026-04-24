import {
  hideElement,
  showElement,
  hideError,
  showError,
} from "./handleVisibility.js";

import { handleLogoutRequest } from "./logout.js";

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

// handle checkbox state
const rememberMeCheckbox = document.getElementById("rememberMe");
rememberMeCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    localStorage.setItem("rememberMe", "true");
  } else {
    localStorage.removeItem("rememberMe");
  }
});

// call get me when reload
window.addEventListener("DOMContentLoaded", async () => {
  const remember = localStorage.getItem("rememberMe");
  if (remember) {
    hideElement("authPage");
    hideElement("welcomePage");
    showLoader();
    await handleGetMeRequest();
  }
});

let isTokenValid = false;

// handle get me Request
async function handleGetMeRequest() {
  try {
    const response = await fetch(
      "https://authentication-service-vdxw.onrender.com/auth/getme",
      { method: "GET", credentials: "include" },
    );

    const data = await response.json();
    hideLoader();
    const status = response.status;

    switch (status) {
      case 401:
        await updateAccessToken();
        if (isTokenValid) {
          handleGetMeRequest();
        } else {
          handleLogoutRequest();
          isTokenValid = false;
          hideElement("welcomePage");
          showElement("authPage");
        }
        break;

      case 500:
        break;

      case 200:
        hideError("loginFormError");
        hideElement("authPage");
        showElement("welcomePage");
        break;

      default:
        console.error("Unexpected error during token refresh:", status);
        break;
    }
  } catch (error) {
    if (!navigator.onLine) {
      showError("loginFormError", "No internet connection");
    } else {
      hideLoader();
      hideElement("welcomePage");
      showElement("authPage");
    }
  }
}

// update refresh token
async function updateAccessToken() {
  showLoader();

  try {
    const response = await fetch(
      "https://authentication-service-vdxw.onrender.com/auth/refresh-access-token",
      { method: "POST", credentials: "include" },
    );

    const data = await response.json();
    hideLoader();

    const status = response.status;
    const body = data;

    switch (status) {
      case 401:
      case 403:
      case 400:
        isTokenValid = false;
        handleLogoutRequest();
        break;

      case 500:
        console.error("Internal Server Error", body.message);
        break;

      case 200:
        isTokenValid = true;
        break;

      default:
        console.error("Unexpected error during token refresh:", status);
        handleLogoutRequest();
        break;
    }
  } catch (error) {
    hideLoader();
    if (!navigator.onLine) {
      showError("loginFormError", "No internet connection");
    } else {
      console.error("Network or fetch error:", error);
      isTokenValid = false;
      handleLogoutRequest();
    }
  }
}
