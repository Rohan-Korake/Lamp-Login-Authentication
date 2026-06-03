import { hideElement, showElement, showError } from "./handleVisibility.js";
import { hideLoader, setCurrentRequest, showLoader } from "./main.js";
import { API_URL } from "./config.js";

export function logout() {
  const logoutUser = document.getElementById("logoutUser");
  if (logoutUser) {
    logoutUser.addEventListener("click", async () => {
      setCurrentRequest("logout");
      await handleLogoutRequest();
    });
  }
}

// handle logut request
export async function handleLogoutRequest() {
  showLoader();
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const body = await response.json();
    hideLoader();
    const status = response.status;

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
