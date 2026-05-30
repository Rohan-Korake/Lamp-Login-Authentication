import { hideElement, showElement, showError } from "./handleVisibility.js";
import { hideLoader, setCurrentRequest, showLoader } from "./main.js";
import { API_URL } from "./config.js";

export function logout() {
  document.getElementById("logoutUser").addEventListener("click", async () => {
    setCurrentRequest("logout");
    await handleLogoutRequest();
  });
}

// handle logut request
export async function handleLogoutRequest() {
  showLoader();
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await response.json();
    hideLoader();
    const status = response.status;
    const body = data;

    switch (status) {
      case 401:
        showError("logOutError", body.message);
        break;

      case 500:
        hideElement("authPage");
        showElement("serverErrorContainer");
        break;

      case 200:
        await localStorage.removeItem("rememberMe");
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
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}

// remove cookie when page is reload and remember me is not checked
window.addEventListener("DOMContentLoaded", async () => {
  showLoader();
  const remember = localStorage.getItem("rememberMe");
  if (!remember) {
    setCurrentRequest("logout");
    await handleLogoutRequest();
  }
});

// remove cookie when page is close and remember me is not checked
window.addEventListener("close", async () => {
  showLoader();
  const remember = localStorage.getItem("rememberMe");
  if (!remember) {
    setCurrentRequest("logout");
    await handleLogoutRequest();
  }
});
