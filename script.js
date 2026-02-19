function myFunction() {
    const menu = document.getElementById("myLinks");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
// Dark mode: support both mobile and desktop toggle buttons
const body = document.body;
const mobileToggle = document.getElementById("themeToggle");
const desktopToggle = document.getElementById("themeToggleDesktop");

function updateToggleText(btn) {
    if (!btn) return;
    btn.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// initialize theme from localStorage
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
}

updateToggleText(mobileToggle);
updateToggleText(desktopToggle);

function toggleTheme() {
    body.classList.toggle("dark-mode");
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    updateToggleText(mobileToggle);
    updateToggleText(desktopToggle);
}

if (mobileToggle) mobileToggle.addEventListener("click", toggleTheme);
if (desktopToggle) desktopToggle.addEventListener("click", toggleTheme);

