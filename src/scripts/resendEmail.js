import { API_URL } from "./config.js";
import {
  hideElement,
  showElement,
  showError,
  showSuccess,
} from "./handleVisibility.js";

const resendEmail = document.getElementById("resendEmail");
resendEmail.addEventListener("click", async () => {
  await handleResendMailRequest();
});

export async function handleResendMailRequest() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  try {
    const response = await fetch(`${API_URL}/auth/resend-email-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expiredToken: token,
        email: email,
      }),
    });

    const body = await response.json();
    const status = response.status;

    console.log(status);

    switch (status) {
      case 400:
        showError(
          "reponseMessage",
          body.message || "Missing user identification",
        );
        break;

      case 404:
        showError("reponseMessage", body.message || "User does not exists");
        break;

      case 200:
        showSuccess(
          "reponseMessage",
          body.message || "Email Verified Successfully!",
        );
        document.getElementById("responseIcon").innerHTML = `<i
                    class="fa-regular fa-circle-check"
                    style="color: #0ebe0e"
                  ></i>`;
        hideElement("resendEmail");
        break;

      default:
        showError("reponseMessage", "Unexpected error");
        document.getElementById("responseIcon").innerHTML = `<i
            class="fa-regular fa-circle-xmark"
            style="color: #fa0101"
          ></i>`;
        break;
    }
  } catch (error) {
    if (!navigator.onLine) {
      showError("changePasswordFormError", "No internet connection");
    } else {
      hideElement("authPage");
      showElement("serverErrorContainer");
    }
  }
}

const goTOLogin = document.getElementById("goTOLogin");
if (goTOLogin) {
  goTOLogin.addEventListener("click", () => {
    window.location.href = "http://localhost:5500";
  });
}
