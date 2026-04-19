import { hideElement, showElement, showError } from "./handleVisibility.js";
import { hideLoader, showLoader } from "./main.js";

export function logout() {
  document.getElementById("logoutUser").addEventListener("click", async () => {
    showLoader();
    await handleLogoutRequest();
  });
}

export async function handleLogoutRequest() {
  try {
    const response = await fetch(
      "https://authentication-service-vdxw.onrender.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      },
    );

    const data = await response.json();
    hideLoader();
    const status = response.status;
    const body = data;

    switch (status) {
      case 401:
        showError("logOutError", body.message);
        break;

      case 200:
        localStorage.removeItem("rememberMe");
        hideElement("welcomePage");
        showElement("authPage");
        showElement("loginForm");
        break;

      default:
        showError("logOutError", body.message || "Logout failed");
        break;
    }
  } catch (error) {
    hideLoader();
    if (!navigator.onLine) {
      showError("logOutError", "No internet connection");
    } else {
      showError("logOutError", "Server unavailable. Please try again later");
    }
  }
}

const rememberMeCheckbox = document.getElementById("rememberMe");
window.addEventListener("DOMContentLoaded", () => {
  showLoader();
  const remember = localStorage.getItem("rememberMe");
  if (!remember) {
    handleLogoutRequest();
  }
});

window.addEventListener("close", () => {
  showLoader();
  const remember = localStorage.getItem("rememberMe");
  if (!remember) {
    handleLogoutRequest();
  }
});
