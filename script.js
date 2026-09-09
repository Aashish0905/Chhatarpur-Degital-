
// =====================================================
// AASHISH DIGITAL - MAIN JAVASCRIPT
// =====================================================


// =====================================================
// BASIC DOM ELEMENTS
// =====================================================

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");


// =====================================================
// CURRENT YEAR
// =====================================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =====================================================
// MOBILE MENU
// =====================================================

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuBtn.classList.toggle("active");
    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuBtn.classList.remove("active");
        });

    });

}


// =====================================================
// HEADER SCROLL EFFECT
// =====================================================

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// =====================================================
// ACTIVE NAVIGATION
// =====================================================

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

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

}

window.addEventListener("scroll", updateActiveNav);


// =====================================================
// TOAST
// =====================================================

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}


// =====================================================
// SERVICE MODAL
// =====================================================

const serviceModal = document.getElementById("serviceModal");
const modalIcon = document.getElementById("modalIcon");
const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalPrice = document.getElementById("modalPrice");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");


const services = {

    seo: {
        icon: "fa-solid fa-chart-line",
        label: "SEARCH ENGINE OPTIMIZATION",
        title: "SEO Services",
        description:
            "Improve your Google visibility and attract more customers through search engine optimization.",
        list: [
            "Google Business Profile optimization",
            "Local SEO",
            "Keyword optimization",
            "On-page SEO",
            "Basic technical SEO"
        ],
        price: "Starting ₹2,999"
    },

    social: {
        icon: "fa-brands fa-instagram",
        label: "SOCIAL MEDIA MARKETING",
        title: "Social Media Marketing",
        description:
            "Build a professional social media presence and reach more customers online.",
        list: [
            "Instagram & Facebook strategy",
            "Content planning",
            "Post design guidance",
            "Audience growth strategy",
            "Monthly content ideas"
        ],
        price: "Starting ₹2,499"
    },

    ads: {
        icon: "fa-solid fa-bullhorn",
        label: "PAID ADVERTISING",
        title: "Google Ads",
        description:
            "Reach customers who are actively searching for your products or services.",
        list: [
            "Google Search Ads",
            "Campaign setup",
            "Keyword research",
            "Ad copy",
            "Basic campaign optimization"
        ],
        price: "Starting ₹3,999"
    },

    website: {
        icon: "fa-solid fa-laptop-code",
        label: "WEB DEVELOPMENT",
        title: "Business Website",
        description:
            "Get a modern, responsive and professional website for your business.",
        list: [
            "Responsive design",
            "Mobile friendly layout",
            "WhatsApp integration",
            "Contact section",
            "Basic SEO setup"
        ],
        price: "Starting ₹5,999"
    },

    local: {
        icon: "fa-solid fa-location-dot",
        label: "LOCAL BUSINESS",
        title: "Local Business Setup",
        description:
            "Make your local business easier to discover on Google and online platforms.",
        list: [
            "Google Business Profile guidance",
            "Local listing setup",
            "Business information optimization",
            "WhatsApp CTA",
            "Basic local SEO"
        ],
        price: "Starting ₹1,999"
    },

    complete: {
        icon: "fa-solid fa-layer-group",
        label: "COMPLETE DIGITAL PACKAGE",
        title: "Complete Digital Growth",
        description:
            "A complete package for businesses that want a website, marketing and local online presence.",
        list: [
            "Professional website",
            "SEO setup",
            "Social media strategy",
            "Google Ads setup",
            "Local business setup"
        ],
        price: "Starting ₹9,999"
    }

};


// OPEN SERVICE MODAL

document.querySelectorAll(".service-details").forEach(button => {

    button.addEventListener("click", () => {

        const serviceKey = button.dataset.service;
        const service = services[serviceKey];

        if (!service) return;

        if (modalIcon) {
            modalIcon.innerHTML = `<i class="${service.icon}"></i>`;
        }

        if (modalLabel) {
            modalLabel.textContent = service.label;
        }

        if (modalTitle) {
            modalTitle.textContent = service.title;
        }

        if (modalDescription) {
            modalDescription.textContent = service.description;
        }

        if (modalList) {

            modalList.innerHTML = service.list
                .map(item => `<li><i class="fa-solid fa-check"></i>${item}</li>`)
                .join("");

        }

        if (modalPrice) {
            modalPrice.textContent = service.price;
        }

        if (serviceModal) {
            serviceModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }

    });

});


// CLOSE SERVICE MODAL

function closeServiceModal() {

    if (!serviceModal) return;

    serviceModal.classList.remove("active");
    document.body.style.overflow = "";

}

if (serviceModalClose) {
    serviceModalClose.addEventListener("click", closeServiceModal);
}

if (serviceModalOverlay) {
    serviceModalOverlay.addEventListener("click", closeServiceModal);
}


// =====================================================
// PROJECT COMING SOON
// =====================================================

document.querySelectorAll(".coming-soon").forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        showToast("This project demo is coming soon.");

    });

});


// =====================================================
// SMOOTH SCROLL
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


// =====================================================
// BUSINESS DIRECTORY DATA
// =====================================================

const businessData = [

    {
        id: 1,
        name: "Chhatarpur Fresh Café",
        category: "restaurant",
        categoryName: "Restaurant",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Fresh food, snacks and beverages for families and friends.",
        icon: "fa-solid fa-utensils",
        demo: true
    },

    {
        id: 2,
        name: "City Style Salon",
        category: "salon",
        categoryName: "Salon",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Modern haircut, grooming and beauty services.",
        icon: "fa-solid fa-scissors",
        demo: true
    },

    {
        id: 3,
        name: "Chhatarpur Computer Point",
        category: "computer",
        categoryName: "Computer Services",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Computer repair, accessories and digital services.",
        icon: "fa-solid fa-computer",
        demo: true
    },

    {
        id: 4,
        name: "City Care Clinic",
        category: "clinic",
        categoryName: "Doctor / Clinic",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Healthcare and general consultation services.",
        icon: "fa-solid fa-user-doctor",
        demo: true
    },

    {
        id: 5,
        name: "Chhatarpur Property Hub",
        category: "real-estate",
        categoryName: "Real Estate",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Property buying, selling and rental assistance.",
        icon: "fa-solid fa-building",
        demo: true
    },

    {
        id: 6,
        name: "Smart Choice Store",
        category: "shop",
        categoryName: "Shop",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Local shopping destination for daily-use products.",
        icon: "fa-solid fa-shop",
        demo: true
    },

    {
        id: 7,
        name: "Chhatarpur Law Associates",
        category: "lawyer",
        categoryName: "Lawyer",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Legal consultation and professional legal services.",
        icon: "fa-solid fa-scale-balanced",
        demo: true
    },

    {
        id: 8,
        name: "Bright Future Coaching",
        category: "coaching",
        categoryName: "Coaching",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Academic coaching and competitive exam preparation.",
        icon: "fa-solid fa-graduation-cap",
        demo: true
    },

    {
        id: 9,
        name: "Royal Stay Hotel",
        category: "hotel",
        categoryName: "Hotel",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Comfortable rooms and hospitality services.",
        icon: "fa-solid fa-hotel",
        demo: true
    }

];


// =====================================================
// BUSINESS DIRECTORY ELEMENTS
// =====================================================

const businessGrid = document.getElementById("businessGrid");
const businessSearch = document.getElementById("businessSearch");
const businessCategory = document.getElementById("businessCategory");
const businessEmpty = document.getElementById("businessEmpty");


// =====================================================
// BUSINESS ICON
// =====================================================

function getBusinessIcon(category) {

    const icons = {

        restaurant: "fa-solid fa-utensils",
        hotel: "fa-solid fa-hotel",
        shop: "fa-solid fa-shop",
        clinic: "fa-solid fa-user-doctor",
        lawyer: "fa-solid fa-scale-balanced",
        coaching: "fa-solid fa-graduation-cap",
        "real-estate": "fa-solid fa-building",
        salon: "fa-solid fa-scissors",
        computer: "fa-solid fa-computer"

    };

    return icons[category] || "fa-solid fa-store";

}


// =====================================================
// RENDER BUSINESSES
// =====================================================

function renderBusinesses() {

    if (!businessGrid) return;

    const searchValue = businessSearch
        ? businessSearch.value.trim().toLowerCase()
        : "";

    const categoryValue = businessCategory
        ? businessCategory.value
        : "all";


    const filteredBusinesses = businessData.filter(business => {

        const matchesSearch =
            business.name.toLowerCase().includes(searchValue) ||
            business.categoryName.toLowerCase().includes(searchValue) ||
            business.location.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            business.category === categoryValue;

        return matchesSearch && matchesCategory;

    });


    businessGrid.innerHTML = "";


    if (filteredBusinesses.length === 0) {

        if (businessEmpty) {
            businessEmpty.style.display = "block";
        }

        return;

    }


    if (businessEmpty) {
        businessEmpty.style.display = "none";
    }


    filteredBusinesses.forEach(business => {

        const icon = business.icon || getBusinessIcon(business.category);

        const card = document.createElement("article");

        card.className = "business-card";

        card.dataset.id = business.id;


        card.innerHTML = `

            <div class="business-card-top">

                <div class="business-icon">
                    <i class="${icon}"></i>
                </div>

                <span class="business-badge">

                    <i class="fa-solid fa-circle-check"></i>

                    ${business.demo ? "Demo Listing" : "Pending Review"}

                </span>

            </div>


            <div class="business-card-content">

                <span class="business-category">
                    ${business.categoryName}
                </span>

                <h3>
                    ${business.name}
                </h3>

                <p class="business-location">
                    <i class="fa-solid fa-location-dot"></i>
                    ${business.location}
                </p>

                <p class="business-description">
                    ${business.description}
                </p>

            </div>


            <button
                type="button"
                class="business-view-btn"
                data-business-id="${business.id}"
            >
                View Details
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        `;


        businessGrid.appendChild(card);

    });


    attachBusinessDetails();

}


// =====================================================
// BUSINESS DETAILS BUTTONS
// =====================================================

function attachBusinessDetails() {

    document.querySelectorAll(".business-view-btn").forEach(button => {

        button.addEventListener("click", () => {

            const businessId = button.dataset.businessId;

            const business = businessData.find(
                item => String(item.id) === String(businessId)
            );

            if (!business) return;

            openBusinessModal(business);

        });

    });

}


// =====================================================
// BUSINESS MODAL
// =====================================================

const businessModal = document.getElementById("businessModal");
const businessModalOverlay = document.getElementById("businessModalOverlay");
const businessModalClose = document.getElementById("businessModalClose");

const businessModalIcon = document.getElementById("businessModalIcon");
const businessModalCategory = document.getElementById("businessModalCategory");
const businessModalTitle = document.getElementById("businessModalTitle");
const businessModalLocation = document.getElementById("businessModalLocation");
const businessModalDescription = document.getElementById("businessModalDescription");
const businessModalActions = document.getElementById("businessModalActions");


// =====================================================
// SAFE URL HELPER
// =====================================================

function safeUrl(url) {

    if (!url) return "";

    const trimmed = String(url).trim();

    if (
        trimmed.startsWith("https://") ||
        trimmed.startsWith("http://")
    ) {
        return trimmed;
    }

    return `https://${trimmed}`;

}


// =====================================================
// WHATSAPP NUMBER HELPER
// =====================================================

function getWhatsAppNumber(number) {

    if (!number) return "";

    let value = String(number).replace(/\D/g, "");

    // India 10 digit number
    if (value.length === 10) {
        value = "91" + value;
    }

    return value;

}


// =====================================================
// OPEN BUSINESS MODAL
// =====================================================

function openBusinessModal(business) {

    if (!businessModal) return;


    const icon =
        business.icon ||
        getBusinessIcon(business.category);


    if (businessModalIcon) {

        businessModalIcon.innerHTML =
            `<i class="${icon}"></i>`;

    }


    if (businessModalCategory) {

        businessModalCategory.textContent =
            business.categoryName || "Business";

    }


    if (businessModalTitle) {

        businessModalTitle.textContent =
            business.name || "Business";

    }


    if (businessModalLocation) {

        businessModalLocation.innerHTML = `

            <i class="fa-solid fa-location-dot"></i>

            ${business.location || "Chhatarpur"}

        `;

    }


    if (businessModalDescription) {

        businessModalDescription.textContent =
            business.description ||
            "Business information is currently available on Chhatarpur Digital.";

    }


    if (businessModalActions) {

        businessModalActions.innerHTML = "";


        // CALL
        if (business.phone) {

            const callButton = document.createElement("a");

            callButton.className = "business-action primary";

            callButton.href =
                `tel:${String(business.phone).replace(/\s/g, "")}`;

            callButton.innerHTML = `
                <i class="fa-solid fa-phone"></i>
                Call
            `;

            businessModalActions.appendChild(callButton);

        }


        // WHATSAPP
        if (business.whatsapp) {

            const whatsappNumber =
                getWhatsAppNumber(business.whatsapp);

            if (whatsappNumber) {

                const whatsappButton =
                    document.createElement("a");

                whatsappButton.className =
                    "business-action";

                whatsappButton.href =
                    `https://wa.me/${whatsappNumber}`;

                whatsappButton.target = "_blank";
                whatsappButton.rel = "noopener noreferrer";

                whatsappButton.innerHTML = `
                    <i class="fa-brands fa-whatsapp"></i>
                    WhatsApp
                `;

                businessModalActions.appendChild(
                    whatsappButton
                );

            }

        }


        // GOOGLE MAPS
        if (business.maps) {

            const mapsButton =
                document.createElement("a");

            mapsButton.className =
                "business-action";

            mapsButton.href =
                safeUrl(business.maps);

            mapsButton.target = "_blank";
            mapsButton.rel = "noopener noreferrer";

            mapsButton.innerHTML = `
                <i class="fa-solid fa-location-dot"></i>
                Google Maps
            `;

            businessModalActions.appendChild(
                mapsButton
            );

        }


        // WEBSITE
        if (business.website) {

            const websiteButton =
                document.createElement("a");

            websiteButton.className =
                "business-action";

            websiteButton.href =
                safeUrl(business.website);

            websiteButton.target = "_blank";
            websiteButton.rel = "noopener noreferrer";

            websiteButton.innerHTML = `
                <i class="fa-solid fa-globe"></i>
                Website
            `;

            businessModalActions.appendChild(
                websiteButton
            );

        }


        // INSTAGRAM
        if (business.instagram) {

            const instagramButton =
                document.createElement("a");

            instagramButton.className =
                "business-action";

            instagramButton.href =
                safeUrl(business.instagram);

            instagramButton.target = "_blank";
            instagramButton.rel = "noopener noreferrer";

            instagramButton.innerHTML = `
                <i class="fa-brands fa-instagram"></i>
                Instagram
            `;

            businessModalActions.appendChild(
                instagramButton
            );

        }


        // IF NO ACTIONS
        if (!businessModalActions.children.length) {

            const pendingButton =
                document.createElement("button");

            pendingButton.className =
                "business-action";

            pendingButton.type = "button";

            pendingButton.innerHTML = `

                <i class="fa-solid fa-circle-info"></i>

                ${
                    business.demo
                        ? "Demo Listing"
                        : "Pending Review"
                }

            `;

            pendingButton.addEventListener("click", () => {

                showToast(
                    business.demo
                        ? "This is a demo business listing."
                        : "This business listing is under review."
                );

            });

            businessModalActions.appendChild(
                pendingButton
            );

        }

    }


    businessModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


// =====================================================
// CLOSE BUSINESS MODAL
// =====================================================

function closeBusinessModal() {

    if (!businessModal) return;

    businessModal.classList.remove("active");

    document.body.style.overflow = "";

}


if (businessModalClose) {

    businessModalClose.addEventListener(
        "click",
        closeBusinessModal
    );

}


if (businessModalOverlay) {

    businessModalOverlay.addEventListener(
        "click",
        closeBusinessModal
    );

}


// =====================================================
// BUSINESS SEARCH
// =====================================================

if (businessSearch) {

    businessSearch.addEventListener(
        "input",
        renderBusinesses
    );

}


// =====================================================
// BUSINESS CATEGORY FILTER
// =====================================================

if (businessCategory) {

    businessCategory.addEventListener(
        "change",
        renderBusinesses
    );

}


// =====================================================
// ADD BUSINESS FORM
// =====================================================

const openBusinessForm =
    document.getElementById("openBusinessForm");

const closeBusinessForm =
    document.getElementById("closeBusinessForm");

const businessForm =
    document.getElementById("businessForm");

const businessListingForm =
    document.getElementById("businessListingForm");


// OPEN FORM

if (openBusinessForm && businessForm) {

    openBusinessForm.addEventListener("click", () => {

        businessForm.style.display = "block";

        businessForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


// CLOSE FORM

if (closeBusinessForm && businessForm) {

    closeBusinessForm.addEventListener("click", () => {

        businessForm.style.display = "none";

    });

}


// =====================================================
// SUBMIT BUSINESS
// =====================================================

if (businessListingForm) {

    businessListingForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const businessName =
                document.getElementById("businessName");

            const businessFormCategory =
                document.getElementById("businessFormCategory");

            const ownerName =
                document.getElementById("ownerName");

            const businessPhone =
                document.getElementById("businessPhone");

            const businessWhatsapp =
                document.getElementById("businessWhatsapp");

            const businessMaps =
                document.getElementById("businessMaps");

            const businessWebsite =
                document.getElementById("businessWebsite");

            const businessInstagram =
                document.getElementById("businessInstagram");

            const businessAddress =
                document.getElementById("businessAddress");

            const businessDescription =
                document.getElementById("businessDescription");


            const categoryName =
                businessFormCategory.value;


            let category =
                categoryName
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            if (category === "doctor-/-clinic") {
                category = "clinic";
            }

            if (category === "computer-services") {
                category = "computer";
            }


            const newBusiness = {

                id: Date.now(),

                name: businessName.value.trim(),

                category: category,

                categoryName: categoryName,

                location:
                    businessAddress.value.trim(),

                description:
                    businessDescription.value.trim() ||
                    "Local business listed on Chhatarpur Digital.",

                icon:
                    getBusinessIcon(category),

                demo: false,

                phone:
                    businessPhone.value.trim(),

                whatsapp:
                    businessWhatsapp.value.trim(),

                maps:
                    businessMaps.value.trim(),

                website:
                    businessWebsite.value.trim(),

                instagram:
                    businessInstagram.value.trim(),

                owner:
                    ownerName.value.trim(),

                status: "pending"

            };


            // SAVE TO LOCAL STORAGE

            let savedBusinesses = [];

            try {

                savedBusinesses =
                    JSON.parse(
                        localStorage.getItem(
                            "chhatarpurBusinesses"
                        )
                    ) || [];

            } catch (error) {

                savedBusinesses = [];

            }


            savedBusinesses.push(newBusiness);


            localStorage.setItem(
                "chhatarpurBusinesses",
                JSON.stringify(savedBusinesses)
            );


            // ADD TO CURRENT DATA

            businessData.push(newBusiness);


            // UPDATE DIRECTORY

            renderBusinesses();


            // SUCCESS MESSAGE

            showToast(
                "Business submitted successfully! It is now under review."
            );


            // RESET FORM

            businessListingForm.reset();


            // CLOSE FORM

            setTimeout(() => {

                if (businessForm) {
                    businessForm.style.display = "none";
                }

            }, 1000);

        }
    );

}


// =====================================================
// LOAD SAVED BUSINESSES
// =====================================================

try {

    const savedBusinesses =
        JSON.parse(
            localStorage.getItem(
                "chhatarpurBusinesses"
            )
        ) || [];


    savedBusinesses.forEach(savedBusiness => {

        const alreadyExists =
            businessData.some(
                business =>
                    String(business.id) ===
                    String(savedBusiness.id)
            );


        if (!alreadyExists) {

            businessData.push(savedBusiness);

        }

    });

} catch (error) {

    console.log(
        "Unable to load saved businesses."
    );

}


// =====================================================
// ESCAPE KEY
// =====================================================

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeServiceModal();
    closeBusinessModal();

    if (businessForm) {
        businessForm.style.display = "none";
    }

});


// =====================================================
// BUTTON MICRO INTERACTION
// =====================================================

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-2px)";

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});


// =====================================================
// INITIAL BUSINESS DIRECTORY RENDER
// =====================================================

renderBusinesses();


// =====================================================
// CONSOLE
// =====================================================

console.log(
    "Aashish Digital website loaded successfully."
);

console.log(
    "Chhatarpur Business Hub initialized."
);
