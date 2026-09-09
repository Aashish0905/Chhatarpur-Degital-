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



/* =====================================================
   BUSINESS DIRECTORY
===================================================== */


/* ================= BUSINESS DATA ================= */

const businessData = [

    {
        id: 1,
        name: "Chhatarpur Fresh Café",
        category: "restaurant",
        categoryName: "Restaurant",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local restaurant and food business.",
        icon: "fa-solid fa-utensils",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 2,
        name: "City Style Salon",
        category: "salon",
        categoryName: "Salon",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local salon and beauty service.",
        icon: "fa-solid fa-scissors",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 3,
        name: "Chhatarpur Computer Point",
        category: "computer",
        categoryName: "Computer Services",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for computer, laptop and digital services.",
        icon: "fa-solid fa-computer",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 4,
        name: "City Care Clinic",
        category: "clinic",
        categoryName: "Doctor / Clinic",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local healthcare service.",
        icon: "fa-solid fa-user-doctor",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 5,
        name: "Chhatarpur Property Hub",
        category: "real-estate",
        categoryName: "Real Estate",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for local property buying, selling and rental services.",
        icon: "fa-solid fa-house",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 6,
        name: "Smart Choice Store",
        category: "shop",
        categoryName: "Shop",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local retail store.",
        icon: "fa-solid fa-store",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 7,
        name: "Chhatarpur Law Associates",
        category: "lawyer",
        categoryName: "Lawyer",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local legal service.",
        icon: "fa-solid fa-scale-balanced",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 8,
        name: "Bright Future Coaching",
        category: "coaching",
        categoryName: "Coaching",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local coaching institute.",
        icon: "fa-solid fa-graduation-cap",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    },


    {
        id: 9,
        name: "Royal Stay Hotel",
        category: "hotel",
        categoryName: "Hotel",
        location: "Chhatarpur, Madhya Pradesh",
        description:
            "Demo listing for a local hotel and accommodation service.",
        icon: "fa-solid fa-hotel",
        demo: true,
        phone: "",
        whatsapp: "",
        maps: ""
    }

];


/* ================= ELEMENTS ================= */

const businessGrid =
    document.getElementById("businessGrid");

const businessSearch =
    document.getElementById("businessSearch");

const businessCategory =
    document.getElementById("businessCategory");

const businessEmpty =
    document.getElementById("businessEmpty");


/* ================= ICON ================= */

function getBusinessIcon(category) {

    const icons = {

        restaurant: "fa-solid fa-utensils",

        hotel: "fa-solid fa-hotel",

        shop: "fa-solid fa-store",

        clinic: "fa-solid fa-user-doctor",

        lawyer: "fa-solid fa-scale-balanced",

        coaching: "fa-solid fa-graduation-cap",

        "real-estate": "fa-solid fa-house",

        salon: "fa-solid fa-scissors",

        computer: "fa-solid fa-computer"

    };

    return icons[category] ||
        "fa-solid fa-store";

}


/* ================= RENDER BUSINESSES ================= */

function renderBusinesses() {

    if (!businessGrid) return;


    const searchTerm =
        businessSearch.value
            .trim()
            .toLowerCase();


    const selectedCategory =
        businessCategory.value;


    const filteredBusinesses =
        businessData.filter(business => {

            const matchesSearch =
                business.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                business.categoryName
                    .toLowerCase()
                    .includes(searchTerm) ||

                business.location
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||
                business.category === selectedCategory;


            return matchesSearch &&
                matchesCategory;

        });


    businessGrid.innerHTML = "";


    if (filteredBusinesses.length === 0) {

        businessEmpty.style.display =
            "block";

        return;

    }


    businessEmpty.style.display =
        "none";


    filteredBusinesses.forEach(business => {

        const card =
            document.createElement("article");

        card.className =
            "business-card";


        card.innerHTML = `

            <div class="business-card-top">

                <div class="business-card-icon">

                    <i class="${getBusinessIcon(
                        business.category
                    )}"></i>

                </div>

                <span class="business-badge">
    <i class="fa-solid fa-circle-check"></i>
    ${business.demo ? "Demo Listing" : "Pending Review"}
</span>

            </div>


            <div class="business-category">

                ${business.categoryName}

            </div>


            <h3>

                ${business.name}

            </h3>


            <div class="business-location">

                <i class="fa-solid fa-location-dot"></i>

                <span>
                    ${business.location}
                </span>

            </div>


            <p class="business-description">

                ${business.description}

            </p>


            <div class="business-actions">

                <button
                    class="business-action primary"
                    type="button"
                    data-business-id="${business.id}"
                >

                    <i class="fa-solid fa-eye"></i>

                    Details

                </button>

            </div>

        `;


        businessGrid.appendChild(card);

    });


    attachBusinessDetails();

}


/* ================= DETAILS ================= */

function attachBusinessDetails() {

    const detailButtons =
        document.querySelectorAll(
            "[data-business-id]"
        );


    detailButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const businessId =
                    Number(
                        button.dataset.businessId
                    );


                const business =
                    businessData.find(
                        item =>
                            item.id === businessId
                    );


                if (!business) return;


                openBusinessModal(
                    business
                );

            }
        );

    });

}


/* ================= BUSINESS MODAL ================= */

const businessModal =
    document.getElementById(
        "businessModal"
    );

const businessModalOverlay =
    document.getElementById(
        "businessModalOverlay"
    );

const businessModalClose =
    document.getElementById(
        "businessModalClose"
    );

const businessModalIcon =
    document.getElementById(
        "businessModalIcon"
    );

const businessModalCategory =
    document.getElementById(
        "businessModalCategory"
    );

const businessModalTitle =
    document.getElementById(
        "businessModalTitle"
    );

const businessModalLocation =
    document.getElementById(
        "businessModalLocation"
    );

const businessModalDescription =
    document.getElementById(
        "businessModalDescription"
    );

const businessModalActions =
    document.getElementById(
        "businessModalActions"
    );


function openBusinessModal(business) {

    businessModalIcon.innerHTML =
        `<i class="${getBusinessIcon(
            business.category
        )}"></i>`;


    businessModalCategory.textContent =
        business.categoryName;


    businessModalTitle.textContent =
        business.name;


    businessModalLocation.innerHTML =
        `<i class="fa-solid fa-location-dot"></i>
         ${business.location}`;


    businessModalDescription.textContent =
        business.description;


    businessModalActions.innerHTML = `

        <button
            class="business-action primary"
            type="button"
            onclick="showToast('This is a demo business listing.')"
        >

            <i class="fa-solid fa-circle-info"></i>

            Demo Listing

        </button>

    `;


    businessModal.classList.add(
        "active"
    );

}


function closeBusinessModal() {

    businessModal.classList.remove(
        "active"
    );

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


/* ================= SEARCH ================= */

if (businessSearch) {

    businessSearch.addEventListener(
        "input",
        renderBusinesses
    );

}


/* ================= CATEGORY ================= */

if (businessCategory) {

    businessCategory.addEventListener(
        "change",
        renderBusinesses
    );

}


/* ================= ADD BUSINESS FORM ================= */

/* ================= ADD BUSINESS FORM ================= */

const openBusinessForm =
    document.getElementById("openBusinessForm");

const closeBusinessForm =
    document.getElementById("closeBusinessForm");

const businessForm =
    document.getElementById("businessForm");

const businessListingForm =
    document.getElementById("businessListingForm");


/* ================= OPEN FORM ================= */

if (openBusinessForm && businessForm) {

    openBusinessForm.addEventListener("click", () => {

        businessForm.style.display = "block";

        businessForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* ================= CLOSE FORM ================= */

if (closeBusinessForm && businessForm) {

    closeBusinessForm.addEventListener("click", () => {

        businessForm.style.display = "none";

    });

}


/* ================= SUBMIT BUSINESS ================= */

if (businessListingForm) {

    businessListingForm.addEventListener("submit", event => {

        event.preventDefault();


        /* GET FORM DATA */

        const newBusiness = {

            id: Date.now(),

            name:
                document.getElementById("businessName").value.trim(),

            category:
                document
                    .getElementById("businessFormCategory")
                    .value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace("doctor-/-clinic", "clinic")
                    .replace("computer-services", "computer")
                    .replace("real-estate", "real-estate"),

            categoryName:
                document
                    .getElementById("businessFormCategory")
                    .value,

            location:
                document.getElementById("businessAddress").value.trim(),

            description:
                document
                    .getElementById("businessDescription").value.trim() ||
                "Local business listed on Chhatarpur Digital.",

            icon: "fa-solid fa-store",

            demo: false,

            phone:
                document.getElementById("businessPhone").value.trim(),

            whatsapp:
                document.getElementById("businessWhatsapp").value.trim(),

            maps:
                document.getElementById("businessMaps").value.trim(),

            website:
                document.getElementById("businessWebsite").value.trim(),

            instagram:
                document.getElementById("businessInstagram").value.trim(),

            owner:
                document.getElementById("ownerName").value.trim(),

            status: "pending"

        };


        /* ================= SAVE TO LOCAL STORAGE ================= */

        const savedBusinesses =
            JSON.parse(
                localStorage.getItem("chhatarpurBusinesses")
            ) || [];


        savedBusinesses.push(newBusiness);


        localStorage.setItem(
            "chhatarpurBusinesses",
            JSON.stringify(savedBusinesses)
        );


        /* ================= ADD TO CURRENT LIST ================= */

        businessData.push(newBusiness);


        /* ================= REFRESH DIRECTORY ================= */

        renderBusinesses();


        /* ================= SUCCESS MESSAGE ================= */

        showToast(
            "Business submitted successfully! It is now under review."
        );


        /* ================= RESET FORM ================= */

        businessListingForm.reset();


        /* ================= CLOSE FORM ================= */

        setTimeout(() => {

            businessForm.style.display = "none";

        }, 1000);

    });

}


/* ================= LOAD SAVED BUSINESSES ================= */

const savedBusinesses =
    JSON.parse(
        localStorage.getItem("chhatarpurBusinesses")
    ) || [];


savedBusinesses.forEach(business => {

    const alreadyExists =
        businessData.some(
            item => item.id === business.id
        );

    if (!alreadyExists) {

        businessData.push(business);

    }

});


/* ================= UPDATE DIRECTORY ================= */

renderBusinesses();


/* ================= ESCAPE ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            businessModal &&
            businessModal.classList.contains(
                "active"
            )
        ) {

            closeBusinessModal();

        }

    }
);


/* ================= INITIAL RENDER ================= */

renderBusinesses();
