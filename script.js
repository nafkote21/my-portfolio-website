/*function for changing the header background color when scrolling down the page*/
const header = document.querySelector("header");
const showHeaderBtn = document.getElementById("showHeaderBtn");
let lastScrollY = window.scrollY;

window.onscroll = function () {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        header.classList.add("scrolled");   
    } else {
        header.classList.remove("scrolled"); 
    }

    // Hide header on scroll down, show on scroll up
    if (scrollPosition > lastScrollY && scrollPosition > 100) {
        header.classList.add("hidden");
        showHeaderBtn.style.display = "block";
    } else if (scrollPosition < lastScrollY) {
        header.classList.remove("hidden");
        showHeaderBtn.style.display = "none";
    }
    lastScrollY = scrollPosition;
};

// Show header on button click
showHeaderBtn.addEventListener("click", function() {
    header.classList.remove("hidden");
    showHeaderBtn.style.display = "none";
});

// Function to toggle dark mode
const desktopButton = document.getElementById("themeToggleDesktop");
const mobileButton = document.getElementById("themeToggle");

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
desktopButton.addEventListener("click", toggleDarkMode);
mobileButton.addEventListener("click", toggleDarkMode);

// function for mobile menu toggle
function myFunction() {
    const menu = document.getElementById("myLinks");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

//function for active link in the header
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
    link.onclick = function() {
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    };
});

//typing effect for the home section
(function () {
    const titles = ["Frontend Developer"];
    const titleEl = document.querySelector(".title");
    if (!titleEl) return;
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const current = titles[titleIndex];
        if (isDeleting) {
            titleEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            titleEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1500);
})();



// ===== Floating Particles Background =====
(function () {
    const canvas = document.getElementById("moving-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() * 20 + 170,
        };
    }

    for (let i = 0; i < 60; i++) {
        particles.push(createParticle());
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.opacity})`;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(180, 60%, 40%, ${0.08 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        animationId = requestAnimationFrame(drawParticles);
    }

    drawParticles();

    // Pause when tab not visible
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            drawParticles();
        }
    });
})();