document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const resetPasswordForm = document.getElementById("reset-password-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            // Save user details to localStorage (for simplicity)
            localStorage.setItem("user", JSON.stringify({ name, email, password }));
            alert("Sign up successful! Please log in.");
            showLoginForm();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email && user.password === password) {
                alert("Login successful!");
                // Redirect to profile page
                window.location.href = "profile.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("forgot-password-email").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email) {
                const otp = Math.floor(100000 + Math.random() * 900000);
                localStorage.setItem("otp", otp);
                alert(`OTP sent to ${email}: ${otp}`);
                window.location.href = "reset-password.html";
            } else {
                alert("Email not found.");
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const otp = document.getElementById("otp").value;
            const newPassword = document.getElementById("new-password").value;
            const storedOtp = localStorage.getItem("otp");
            const user = JSON.parse(localStorage.getItem("user"));
            if (otp === storedOtp) {
                user.password = newPassword;
                localStorage.setItem("user", JSON.stringify(user));
                alert("Password reset successful! Please log in.");
                window.location.href = "signup-login.html";
            } else {
                alert("Invalid OTP.");
            }
        });
    }
});
