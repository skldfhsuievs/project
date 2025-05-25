const modal = document.getElementById("authModal");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
document.querySelector(".auth-container").onclick = () => {
  modal.style.display = "flex";
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
};

function switchToRegister() {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
}

function switchToLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "flex";
}

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

document.querySelector(".nav-button").addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("active");
});
