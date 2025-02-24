document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        toggleButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";

        // Enable snowfall effect in dark mode
        if (document.body.classList.contains("dark-mode")) {
            startSnowfall();
        } else {
            stopSnowfall();
        }
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "Light Mode";
        startSnowfall();
    }

    // Expandable sections
    document.querySelectorAll(".expand-btn").forEach(button => {
        button.addEventListener("click", function () {
            const target = document.getElementById(this.getAttribute("onclick").replace("toggleContent('", "").replace("')", ""));
            target.classList.toggle("hidden");
            this.textContent = target.classList.contains("hidden") ? "Read More" : "Read Less";
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Highlight active section while scrolling
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 50) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    function startSnowfall() {
        if (document.getElementById("snow-container")) return;
        
        const snowContainer = document.createElement("div");
        snowContainer.id = "snow-container";
        document.body.appendChild(snowContainer);
        
        for (let i = 0; i < 50; i++) {
            let snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
            snowflake.innerHTML = "❄";
            snowContainer.appendChild(snowflake);
        }
    }

    function stopSnowfall() {
        const snowContainer = document.getElementById("snow-container");
        if (snowContainer) {
            snowContainer.remove();
        }
    }
});