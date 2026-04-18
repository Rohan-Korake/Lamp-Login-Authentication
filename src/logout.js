import { hideElement, showElement, showError } from "./handleVisibility.js";
import { hideLoader, showLoader } from "./main.js";

export function logout() {
  document.getElementById("logoutUser").addEventListener("click", async () => {
    showLoader();
    try {
      const response = await fetch(
        "https://authentication-service-vdxw.onrender.com/auth/logout",
        {
          method: "POST",
        },
      );

      const data = await response.json();
      hideLoader();
      const status = response.status;
      const body = data;

      switch (status) {
        case 401:
        case 200:
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
  });
}
