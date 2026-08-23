/* =====================================================
   AASHISH DIGITAL MARKETING WEBSITE
   FINAL V1.0 JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const navLinks = document.querySelectorAll(".nav-link");

const modal = document.getElementById("serviceModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalIcon = document.getElementById("modalIcon");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalPrice = document.getElementById("modalPrice");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const year = document.getElementById("year");


/* ================= CURRENT YEAR ================= */

if (year) {
    year.textContent = new Date().getFullYear();
}


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (nav.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* ================= CLOSE MOBILE MENU ================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= HEADER SCROLL ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ================= ACTIVE NAV ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   SERVICE DATA
===================================================== */

const services = {

    seo: {

        icon: "fa-solid fa-magnifying-glass-chart",

        label: "SEARCH ENGINE OPTIMIZATION",

        title: "SEO",

        description:
            "Improve your website's search visibility with a practical SEO foundation focused on your business and target audience.",

        price:
            "Starting from ₹2,999",

        points: [

            "Website SEO audit",

            "Basic keyword research",

            "On-page SEO improvements",

            "Meta title and description setup",

            "Basic SEO recommendations"

        ]

    },


    social: {

        icon: "fa-brands fa-instagram",

        label: "SOCIAL MEDIA",

        title: "Social Media Marketing",

        description:
            "Create a more professional and consistent social media presence for your business.",

        price:
            "Starting from ₹2,499",

        points: [

            "Social media profile review",

            "Content direction",

            "Posting strategy",

            "Basic content planning",

            "Growth recommendations"

        ]

    },


    ads: {

        icon: "fa-solid fa-bullhorn",

        label: "PAID ADVERTISING",

        title: "Google Ads",

        description:
            "Set up and structure advertising campaigns to help your business reach relevant potential customers.",

        price:
            "Starting from ₹3,999",

        points: [

            "Campaign planning",

            "Keyword research",

            "Ad structure",

            "Conversion-focused landing page guidance",

            "Campaign recommendations"

        ]

    },


    website: {

        icon: "fa-solid fa-laptop-code",

        label: "WEB DEVELOPMENT",

        title: "Website Development",

        description:
            "Modern responsive websites designed to give your business a professional online presence.",

        price:
            "Starting from ₹5,999",

        points: [

            "Responsive design",

            "Modern UI",

            "Mobile optimization",

            "Contact / WhatsApp integration",

            "Basic SEO structure"

        ]

    },


    local: {

        icon: "fa-solid fa-store",

        label: "LOCAL BUSINESS",

        title: "Local Business Setup",

        description:
            "Build a stronger digital presence for a local business and make it easier for customers to find you online.",

        price:
            "Starting from ₹1,999",

        points: [

            "Online presence planning",

            "Business profile guidance",

            "Contact information setup",

            "Social profile optimization",

            "Local visibility recommendations"

        ]

    },


    complete: {

        icon: "fa-solid fa-layer-group",

        label: "COMPLETE DIGITAL SOLUTION",

        title: "Complete Digital Package",

        description:
            "A combination of website and digital marketing services designed around your business requirements.",

        price:
            "Starting from ₹9,999",

        points: [

            "Modern business website",

            "SEO foundation",

            "Social media strategy",

            "Digital marketing planning",

            "Growth consultation"

        ]

    }

};


/* =====================================================
   OPEN SERVICE MODAL
===================================================== */

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const serviceName = button.dataset.service;

        const service = services[serviceName];

        if (!service) return;


        modalIcon.innerHTML =
            `<i class="${service.icon}"></i>`;

        modalLabel.textContent =
            service.label;

        modalTitle.textContent =
            service.title;

        modalDescription.textContent =
            service.description;

        modalPrice.textContent =
            service.price;


        modalList.innerHTML = "";


        service.points.forEach(point => {

            const li = document.createElement("li");

            li.innerHTML =
                `<i class="fa-solid fa-check"></i>
                 <span>${point}</span>`;

            modalList.appendChild(li);

        });


        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


/* ================= CLOSE MODAL ================= */

function closeModal() {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =====================================================
   PROJECT LINKS
===================================================== */

const projectLinks = document.querySelectorAll(".coming-soon");

projectLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        showToast(
            "Project link will be added here soon."
        );

    });

});


/* ================= TOAST ================= */

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            targetId === "#" ||
            targetId === ""
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =====================================================
   BUTTON MICRO INTERACTION
===================================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.setProperty(
            "--button-scale",
            "1.01"
        );

    });

    button.addEventListener("mouseleave", () => {

        button.style.setProperty(
            "--button-scale",
            "1"
        );

    });

});


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "Aashish Digital Marketing Website — FINAL V1.0"
);

console.log(
    "HTML + CSS + JavaScript successfully loaded."
);