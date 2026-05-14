document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    // Safety check (prevents errors)
    if (!loginForm || !signupForm) {
        console.error("Forms not found in HTML");
        return;
    }

    // Default = login
    if (mode === "signup") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    } else {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    }

});