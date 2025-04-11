document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".Masuk")
    const registBtn = document.querySelector(".Daftar");

    if (loginBtn) {
        loginBtn.addEventListener("click", function () {
            window.location.href = "../RegisterLoginPage/login.html";
        });
    }

    if (registBtn) {
        registBtn.addEventListener("click", function () {
            window.location.href = "../RegisterLoginPage/register.html";
        });
    }

    const registeForm = document.getElementById("registerForm");
    if (registeForm) {
        registeForm.addEventListener("submit", function (e) {
            e.preventDefault();
            window.location.href = "registerdone.html";
        });
    }
});