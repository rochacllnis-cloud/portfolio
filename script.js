// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (navbar.classList.contains("show")) {
        icon.setAttribute("data-lucide", "x");
    } else {
        icon.setAttribute("data-lucide", "menu");
    }

    lucide.createIcons();
});

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");

        const icon = menuToggle.querySelector("i");
        icon.setAttribute("data-lucide", "menu");
        lucide.createIcons();
    });
});

// TYPING ANIMATION
const typingElement = document.getElementById("typing");

const words = [
    "Tech Enthusiast",
    "Creative Thinker",
    "Problem Solver",
    "Digital Innovator"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent =
        currentWord.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentWord.length) {
        speed = 1500;
        deleting = true;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// CURRENT YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// BACK TO TOP
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// CONTACT FORM
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Replace this with Collins' real email address.
const recipientEmail = "your@email.com";

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    if (recipientEmail === "your@email.com") {
        formStatus.textContent =
            "Please configure the recipient email in script.js.";
        return;
    }

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formStatus.textContent = "Opening your email application...";

    window.location.href =
        `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;
});

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .stat-card, .skill-card, .project-card, .contact-container"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
