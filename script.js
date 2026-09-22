// =====================================================
// 09ZERO - MAIN JAVASCRIPT
// FINAL VERSION
// =====================================================


// =====================================================
// SUPABASE CONFIG
// =====================================================

const SUPABASE_URL =
    "https://cgobnlyjyfjbjzcepuyp.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnb2JubHlqeWZqYmp6Y2VwdXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwOTcyMDAsImV4cCI6MjEwNTY3MzIwMH0.KnOWmm_SDFaO9U6vjlg4-gWmv22fDVFzJmcDt7_vFOY";


document.addEventListener("DOMContentLoaded", function () {


    // =====================================================
    // BASIC DOM ELEMENTS
    // =====================================================

    const header =
        document.getElementById("header");

    const menuBtn =
        document.getElementById("menuBtn");

    const nav =
        document.getElementById("nav");

    const navLinks =
        document.querySelectorAll(".nav-link");


    console.log("09ZERO JS LOADED");


    // =====================================================
    // CURRENT YEAR
    // =====================================================

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // =====================================================
    // MOBILE MENU
    // =====================================================

    function closeMobileMenu() {

        if (!nav || !menuBtn) {
            return;
        }


        nav.classList.remove("open");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open Menu"
        );


        const icon =
            menuBtn.querySelector("i");


        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }


    if (menuBtn && nav) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

        menuBtn.setAttribute(
            "aria-label",
            "Open Menu"
        );


        menuBtn.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    nav.classList.toggle("open");


                menuBtn.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );


                menuBtn.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close Menu"
                        : "Open Menu"
                );


                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.classList.toggle(
                        "fa-bars",
                        !isOpen
                    );

                    icon.classList.toggle(
                        "fa-xmark",
                        isOpen
                    );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                    }
                );

            }
        );


        document.addEventListener(
            "click",
            function (event) {

                if (
                    !nav.classList.contains("open")
                ) {
                    return;
                }


                if (
                    !nav.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 768
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();


    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 160;


                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionBottom
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                const href =
                    link.getAttribute("href");


                if (
                    href ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    // =====================================================
    // SMOOTH SCROLL
    // =====================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );


    // =====================================================
    // BUTTON CLICK EFFECT
    // =====================================================

    document
        .querySelectorAll(".btn")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        this.classList.add(
                            "clicked"
                        );


                        setTimeout(
                            function () {

                                button.classList.remove(
                                    "clicked"
                                );

                            },
                            300
                        );

                    }
                );

            }
        );


    // =====================================================
    // SERVICE DATA
    // =====================================================

    const serviceData = {

        seo: {

            icon:
                "fa-solid fa-magnifying-glass-chart",

            label:
                "SEO SERVICE",

            title:
                "SEO Services",

            description:
                "Improve your website visibility on Google and attract more relevant customers through practical SEO strategies.",

            list: [

                "Website SEO Audit",

                "Keyword Research",

                "On-Page SEO",

                "Technical SEO",

                "Local SEO",

                "Google Search Optimization"

            ],

            price:
                "Starting ₹2,999"

        },


        social: {

            icon:
                "fa-brands fa-instagram",

            label:
                "SOCIAL MEDIA",

            title:
                "Social Media Marketing",

            description:
                "Build a professional social media presence that helps your business connect with customers.",

            list: [

                "Social Media Strategy",

                "Post Design",

                "Content Planning",

                "Instagram Optimization",

                "Facebook Marketing",

                "Monthly Content Support"

            ],

            price:
                "Starting ₹2,499"

        },


        ads: {

            icon:
                "fa-brands fa-google",

            label:
                "PAID ADS",

            title:
                "Google Ads",

            description:
                "Reach customers who are actively searching for your products and services.",

            list: [

                "Campaign Setup",

                "Keyword Research",

                "Ad Copy",

                "Audience Targeting",

                "Conversion Tracking",

                "Campaign Optimization"

            ],

            price:
                "Starting ₹3,999"

        },


        website: {

            icon:
                "fa-solid fa-code",

            label:
                "WEB DEVELOPMENT",

            title:
                "Business Website",

            description:
                "Modern responsive websites designed to make your business look professional online.",

            list: [

                "Responsive Design",

                "Modern UI/UX",

                "Mobile Optimization",

                "WhatsApp Integration",

                "Contact Form",

                "Basic SEO Setup"

            ],

            price:
                "Starting ₹5,999"

        },


        local: {

            icon:
                "fa-solid fa-location-dot",

            label:
                "LOCAL BUSINESS",

            title:
                "Local Business Setup",

            description:
                "Get your local business properly presented online so nearby customers can find you.",

            list: [

                "Google Business Profile",

                "Local SEO",

                "Business Information Setup",

                "Map Optimization",

                "Customer Contact Setup",

                "Local Visibility"

            ],

            price:
                "Starting ₹1,999"

        },


        complete: {

            icon:
                "fa-solid fa-rocket",

            label:
                "DIGITAL GROWTH",

            title:
                "Complete Digital Growth",

            description:
                "A complete digital package combining website, marketing and local visibility.",

            list: [

                "Business Website",

                "SEO",

                "Social Media",

                "Google Ads",

                "Google Business Profile",

                "Digital Growth Strategy"

            ],

            price:
                "Starting ₹9,999"

        }

    };


    // =====================================================
    // SERVICE MODAL
    // =====================================================

    const serviceModal =
        document.getElementById(
            "serviceModal"
        );

    const modalOverlay =
        document.getElementById(
            "modalOverlay"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalIcon =
        document.getElementById(
            "modalIcon"
        );

    const modalLabel =
        document.getElementById(
            "modalLabel"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalList =
        document.getElementById(
            "modalList"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );


    function closeServiceModal() {

        if (!serviceModal) {
            return;
        }


        serviceModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    document
        .querySelectorAll(".details-btn")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const serviceName =
                            this.getAttribute(
                                "data-service"
                            );


                        const service =
                            serviceData[
                                serviceName
                            ];


                        if (
                            !service ||
                            !serviceModal
                        ) {

                            return;

                        }


                        if (modalIcon) {

                            modalIcon.className =
                                "modal-icon";

                            modalIcon.innerHTML =
                                `<i class="${service.icon}"></i>`;

                        }


                        if (modalLabel) {

                            modalLabel.textContent =
                                service.label;

                        }


                        if (modalTitle) {

                            modalTitle.textContent =
                                service.title;

                        }


                        if (modalDescription) {

                            modalDescription.textContent =
                                service.description;

                        }


                        if (modalList) {

                            modalList.innerHTML =
                                "";


                            service.list.forEach(
                                function (item) {

                                    const li =
                                        document.createElement(
                                            "li"
                                        );


                                    li.innerHTML =
                                        `<i class="fa-solid fa-check"></i> ${item}`;


                                    modalList.appendChild(
                                        li
                                    );

                                }
                            );

                        }


                        if (modalPrice) {

                            modalPrice.textContent =
                                service.price;

                        }


                        serviceModal.classList.add(
                            "active"
                        );


                        document.body.classList.add(
                            "modal-open"
                        );

                    }
                );

            }
        );


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeServiceModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeServiceModal
        );

    }


    // =====================================================
    // TOAST
    // =====================================================

    function showToast(message) {

        const toast =
            document.getElementById(
                "toast"
            );

        const toastMessage =
            document.getElementById(
                "toastMessage"
            );


        if (!toast) {
            return;
        }


        if (toastMessage) {

            toastMessage.textContent =
                message;

        } else {

            toast.textContent =
                message;

        }


        toast.classList.add(
            "show"
        );


        clearTimeout(
            window.aashishToastTimer
        );


        window.aashishToastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "show"
                    );

                },
                3000
            );

    }


    // =====================================================
    // CONTACT FORM → SUPABASE
    // =====================================================

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const contactFormStatus =
        document.getElementById(
            "contactFormStatus"
        );

    const contactSubmitBtn =
        document.getElementById(
            "contactSubmitBtn"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "contactEmail"
                    )?.value.trim();


                const phone =
                    document.getElementById(
                        "contactPhone"
                    )?.value.trim();


                const service =
                    document.getElementById(
                        "contactService"
                    )?.value;


                const message =
                    document.getElementById(
                        "contactMessage"
                    )?.value.trim();


                // -------------------------------------------------
                // VALIDATION
                // -------------------------------------------------

                if (
                    !name ||
                    !phone ||
                    !service ||
                    !message
                ) {

                    if (contactFormStatus) {

                        contactFormStatus.textContent =
                            "Please fill all required fields.";

                    }

                    showToast(
                        "Please fill all required fields."
                    );

                    return;

                }


                // -------------------------------------------------
                // BUTTON LOADING
                // -------------------------------------------------

                if (contactSubmitBtn) {

                    contactSubmitBtn.disabled =
                        true;

                    contactSubmitBtn.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                }


                if (contactFormStatus) {

                    contactFormStatus.textContent =
                        "Sending your enquiry...";

                }


                try {

                    // -------------------------------------------------
                    // SEND DATA TO SUPABASE
                    // -------------------------------------------------

                    const response =
                        await fetch(
                            `${SUPABASE_URL}/rest/v1/leads`,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "apikey":
                                        SUPABASE_ANON_KEY,

                                    "Authorization":
                                        `Bearer ${SUPABASE_ANON_KEY}`,

                                    "Prefer":
                                        "return=representation"

                                },

                                body:
                                    JSON.stringify({

                                        name:
                                            name,

                                        email:
                                            email ||
                                            null,

                                        phone:
                                            phone,

                                        service:
                                            service,

                                        message:
                                            message,

                                        source:
                                            "website",

                                        status:
                                            "new"

                                    })

                            }
                        );


                    // -------------------------------------------------
                    // CHECK RESPONSE
                    // -------------------------------------------------

                    if (!response.ok) {

                        const errorData =
                            await response.text();


                        console.error(
                            "Supabase Lead Error:",
                            errorData
                        );


                        throw new Error(
                            errorData ||
                            "Lead submission failed."
                        );

                    }


                    // -------------------------------------------------
                    // SUCCESS
                    // -------------------------------------------------

                    if (contactFormStatus) {

                        contactFormStatus.textContent =
                            "Thank you! Your enquiry has been submitted successfully.";

                    }


                    contactForm.reset();


                    showToast(
                        "Enquiry submitted successfully!"
                    );


                    console.log(
                        "Lead submitted successfully."
                    );


                } catch (error) {

                    // -------------------------------------------------
                    // ERROR
                    // -------------------------------------------------

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    if (contactFormStatus) {

                        contactFormStatus.textContent =
                            "Something went wrong. Please try again.";

                    }


                    showToast(
                        "Unable to submit enquiry."
                    );

                } finally {

                    // -------------------------------------------------
                    // RESTORE BUTTON
                    // -------------------------------------------------

                    if (contactSubmitBtn) {

                        contactSubmitBtn.disabled =
                            false;

                        contactSubmitBtn.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Send Enquiry';

                    }

                }

            }
        );

    }


    // =====================================================
    // COMING SOON
    // =====================================================

    document
        .querySelectorAll(".coming-soon")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        showToast(
                            "This feature is coming soon."
                        );

                    }
                );

            }
        );


    // =====================================================
    // BUSINESS HUB
    // =====================================================

    const businessGrid =
        document.getElementById(
            "businessGrid"
        );

    const businessEmpty =
        document.getElementById(
            "businessEmpty"
        );

    const businessSearch =
        document.getElementById(
            "businessSearch"
        );

    const businessCategory =
        document.getElementById(
            "businessCategory"
        );

    const openBusinessForm =
        document.getElementById(
            "openBusinessForm"
        );

    const closeBusinessForm =
        document.getElementById(
            "closeBusinessForm"
        );

    const businessFormWrapper =
        document.getElementById(
            "businessForm"
        );

    const businessListingForm =
        document.getElementById(
            "businessListingForm"
        );


    // =====================================================
    // BUSINESS MODAL
    // =====================================================

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


    // =====================================================
    // BUSINESS STORAGE
    // =====================================================

    const BUSINESS_STORAGE_KEY =
        "aashishDigitalBusinesses";


    function getBusinesses() {

        try {

            const saved =
                localStorage.getItem(
                    BUSINESS_STORAGE_KEY
                );


            if (!saved) {
                return [];
            }


            const parsed =
                JSON.parse(saved);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Business storage error:",
                error
            );


            return [];

        }

    }


    function saveBusinesses(
        businesses
    ) {

        try {

            localStorage.setItem(
                BUSINESS_STORAGE_KEY,
                JSON.stringify(
                    businesses
                )
            );


            return true;

        } catch (error) {

            console.error(
                "Business save error:",
                error
            );


            return false;

        }

    }


    // =====================================================
    // BUSINESS HELPERS
    // =====================================================

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function normalizeCategory(
        category
    ) {

        const value =
            String(
                category || ""
            )
            .toLowerCase()
            .trim();


        const categoryMap = {

            restaurant:
                "restaurant",

            restaurants:
                "restaurant",

            hotel:
                "hotel",

            hotels:
                "hotel",

            shop:
                "shop",

            shops:
                "shop",

            clinic:
                "clinic",

            doctor:
                "clinic",

            "doctor / clinic":
                "clinic",

            lawyer:
                "lawyer",

            lawyers:
                "lawyer",

            coaching:
                "coaching",

            "real estate":
                "real-estate",

            "real-estate":
                "real-estate",

            salon:
                "salon",

            "computer services":
                "computer",

            computer:
                "computer"

        };


        return (
            categoryMap[value] ||
            value
        );

    }


    function getCategoryLabel(
        category
    ) {

        const labels = {

            restaurant:
                "Restaurant",

            hotel:
                "Hotel",

            shop:
                "Shop",

            clinic:
                "Doctor / Clinic",

            lawyer:
                "Lawyer",

            coaching:
                "Coaching",

            "real-estate":
                "Real Estate",

            salon:
                "Salon",

            computer:
                "Computer Services"

        };


        return (
            labels[
                normalizeCategory(
                    category
                )
            ] ||
            category ||
            "Business"
        );

    }


    function getCategoryIcon(
        category
    ) {

        const icons = {

            restaurant:
                "fa-solid fa-utensils",

            hotel:
                "fa-solid fa-hotel",

            shop:
                "fa-solid fa-shop",

            clinic:
                "fa-solid fa-user-doctor",

            lawyer:
                "fa-solid fa-scale-balanced",

            coaching:
                "fa-solid fa-graduation-cap",

            "real-estate":
                "fa-solid fa-house",

            salon:
                "fa-solid fa-scissors",

            computer:
                "fa-solid fa-computer"

        };


        return (
            icons[
                normalizeCategory(
                    category
                )
            ] ||
            "fa-solid fa-store"
        );

    }


    function createBusinessId() {

        return (
            Date.now().toString() +
            Math.random()
                .toString(36)
                .substring(2, 8)
        );

    }


    function normalizePhone(
        phone
    ) {

        return String(
            phone || ""
        )
        .replace(
            /[^\d+]/g,
            ""
        );

    }


    function normalizeWhatsApp(
        phone
    ) {

        let number =
            String(
                phone || ""
            )
            .replace(
                /\D/g,
                ""
            );


        if (
            number.length === 10
        ) {

            number =
                "91" + number;

        }


        return number;

    }


    // =====================================================
    // RENDER BUSINESSES
    // =====================================================

    function renderBusinesses() {

        if (!businessGrid) {
            return;
        }


        const allBusinesses =
            getBusinesses();


        const searchTerm =
            businessSearch
                ? businessSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedCategory =
            businessCategory
                ? businessCategory.value
                : "all";


        const filteredBusinesses =
            allBusinesses.filter(
                function (business) {

                    const businessName =
                        String(
                            business.name ||
                            ""
                        )
                        .toLowerCase();


                    const description =
                        String(
                            business.description ||
                            ""
                        )
                        .toLowerCase();


                    const address =
                        String(
                            business.address ||
                            ""
                        )
                        .toLowerCase();


                    const category =
                        normalizeCategory(
                            business.category
                        );


                    const matchesSearch =
                        !searchTerm ||
                        businessName.includes(
                            searchTerm
                        ) ||
                        description.includes(
                            searchTerm
                        ) ||
                        address.includes(
                            searchTerm
                        );


                    const matchesCategory =
                        selectedCategory ===
                            "all" ||
                        category ===
                            normalizeCategory(
                                selectedCategory
                            );


                    return (
                        matchesSearch &&
                        matchesCategory
                    );

                }
            );


        businessGrid.innerHTML =
            "";


        if (
            filteredBusinesses.length === 0
        ) {

            if (businessEmpty) {

                businessEmpty.style.display =
                    "block";

            }

            return;

        }


        if (businessEmpty) {

            businessEmpty.style.display =
                "none";

        }


        filteredBusinesses.forEach(
            function (business) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "business-card";


                const icon =
                    getCategoryIcon(
                        business.category
                    );


                const categoryLabel =
                    getCategoryLabel(
                        business.category
                    );


                card.innerHTML = `

                    <div class="business-card-icon">
                        <i class="${icon}"></i>
                    </div>

                    <div class="business-card-content">

                        <span class="business-card-category">
                            ${escapeHTML(categoryLabel)}
                        </span>

                        <h3>
                            ${escapeHTML(business.name)}
                        </h3>

                        <p class="business-card-location">
                            <i class="fa-solid fa-location-dot"></i>
                            ${escapeHTML(business.address)}
                        </p>

                        <p class="business-card-description">
                            ${escapeHTML(
                                business.description ||
                                "Local business in Chhatarpur."
                            )}
                        </p>

                        <button
                            type="button"
                            class="btn btn-primary business-details-btn"
                            data-business-id="${escapeHTML(
                                business.id
                            )}"
                        >
                            View Details
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>

                    </div>

                `;


                businessGrid.appendChild(
                    card
                );

            }
        );

    }


    // =====================================================
    // OPEN BUSINESS FORM
    // =====================================================

    if (openBusinessForm) {

        openBusinessForm.addEventListener(
            "click",
            function () {

                if (!businessFormWrapper) {
                    return;
                }


                const isHidden =
                    businessFormWrapper.style.display ===
                        "none" ||
                    getComputedStyle(
                        businessFormWrapper
                    ).display ===
                        "none";


                if (isHidden) {

                    businessFormWrapper.style.display =
                        "block";


                    setTimeout(
                        function () {

                            businessFormWrapper.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );

                        },
                        50
                    );

                } else {

                    businessFormWrapper.style.display =
                        "none";

                }

            }
        );

    }


    // =====================================================
    // CLOSE BUSINESS FORM
    // =====================================================

    if (closeBusinessForm) {

        closeBusinessForm.addEventListener(
            "click",
            function () {

                if (
                    !businessFormWrapper
                ) {
                    return;
                }


                businessFormWrapper.style.display =
                    "none";

            }
        );

    }


    // =====================================================
    // SUBMIT BUSINESS
    // =====================================================

    if (businessListingForm) {

        businessListingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "businessName"
                    )?.value.trim();


                const category =
                    document.getElementById(
                        "businessFormCategory"
                    )?.value;


                const owner =
                    document.getElementById(
                        "ownerName"
                    )?.value.trim();


                const phone =
                    document.getElementById(
                        "businessPhone"
                    )?.value.trim();


                const whatsapp =
                    document.getElementById(
                        "businessWhatsapp"
                    )?.value.trim();


                const maps =
                    document.getElementById(
                        "businessMaps"
                    )?.value.trim();


                const website =
                    document.getElementById(
                        "businessWebsite"
                    )?.value.trim();


                const instagram =
                    document.getElementById(
                        "businessInstagram"
                    )?.value.trim();


                const address =
                    document.getElementById(
                        "businessAddress"
                    )?.value.trim();


                const description =
                    document.getElementById(
                        "businessDescription"
                    )?.value.trim();


                if (
                    !name ||
                    !category ||
                    !phone ||
                    !address
                ) {

                    showToast(
                        "Please fill all required fields."
                    );


                    return;

                }


                const newBusiness = {

                    id:
                        createBusinessId(),

                    name:
                        name,

                    category:
                        category,

                    owner:
                        owner,

                    phone:
                        phone,

                    whatsapp:
                        whatsapp,

                    maps:
                        maps,

                    website:
                        website,

                    instagram:
                        instagram,

                    address:
                        address,

                    description:
                        description,

                    createdAt:
                        new Date().toISOString()

                };


                const businesses =
                    getBusinesses();


                businesses.unshift(
                    newBusiness
                );


                const saved =
                    saveBusinesses(
                        businesses
                    );


                if (!saved) {

                    showToast(
                        "Business could not be saved."
                    );


                    return;

                }


                businessListingForm.reset();


                if (
                    businessFormWrapper
                ) {

                    businessFormWrapper.style.display =
                        "none";

                }


                renderBusinesses();


                showToast(
                    "Business added successfully!"
                );


                setTimeout(
                    function () {

                        if (businessGrid) {

                            businessGrid.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"
                                }
                            );

                        }

                    },
                    300
                );

            }
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
    // OPEN BUSINESS DETAILS
    // =====================================================

    function openBusinessDetails(
        business
    ) {

        if (
            !businessModal ||
            !business
        ) {

            return;

        }


        if (businessModalIcon) {

            businessModalIcon.innerHTML =
                `<i class="${getCategoryIcon(
                    business.category
                )}"></i>`;

        }


        if (businessModalCategory) {

            businessModalCategory.textContent =
                getCategoryLabel(
                    business.category
                );

        }


        if (businessModalTitle) {

            businessModalTitle.textContent =
                business.name ||
                "Business";

        }


        if (businessModalLocation) {

            businessModalLocation.innerHTML =
                `
                <i class="fa-solid fa-location-dot"></i>
                ${escapeHTML(
                    business.address || ""
                )}
                `;

        }


        if (businessModalDescription) {

            businessModalDescription.textContent =
                business.description ||
                "Local business in Chhatarpur.";

        }


        if (businessModalActions) {

            businessModalActions.innerHTML =
                "";


            // -------------------------------------------------
            // CALL
            // -------------------------------------------------

            if (business.phone) {

                const callLink =
                    document.createElement(
                        "a"
                    );


                callLink.className =
                    "btn btn-primary";


                callLink.href =
                    "tel:" +
                    normalizePhone(
                        business.phone
                    );


                callLink.innerHTML =
                    `
                    <i class="fa-solid fa-phone"></i>
                    Call
                    `;


                businessModalActions.appendChild(
                    callLink
                );

            }


            // -------------------------------------------------
            // WHATSAPP
            // -------------------------------------------------

            if (
                business.whatsapp ||
                business.phone
            ) {

                const whatsappNumber =
                    normalizeWhatsApp(
                        business.whatsapp ||
                        business.phone
                    );


                if (whatsappNumber) {

                    const whatsappLink =
                        document.createElement(
                            "a"
                        );


                    whatsappLink.className =
                        "btn btn-primary";


                    whatsappLink.href =
                        "https://wa.me/" +
                        whatsappNumber;


                    whatsappLink.target =
                        "_blank";


                    whatsappLink.rel =
                        "noopener noreferrer";


                    whatsappLink.innerHTML =
                        `
                        <i class="fa-brands fa-whatsapp"></i>
                        WhatsApp
                        `;


                    businessModalActions.appendChild(
                        whatsappLink
                    );

                }

            }


            // -------------------------------------------------
            // GOOGLE MAPS
            // -------------------------------------------------

            if (business.maps) {

                const mapsLink =
                    document.createElement(
                        "a"
                    );


                mapsLink.className =
                    "btn btn-primary";


                mapsLink.href =
                    business.maps;


                mapsLink.target =
                    "_blank";


                mapsLink.rel =
                    "noopener noreferrer";


                mapsLink.innerHTML =
                    `
                    <i class="fa-solid fa-location-arrow"></i>
                    Directions
                    `;


                businessModalActions.appendChild(
                    mapsLink
                );

            }


            // -------------------------------------------------
            // WEBSITE
            // -------------------------------------------------

            if (business.website) {

                const websiteLink =
                    document.createElement(
                        "a"
                    );


                websiteLink.className =
                    "btn btn-primary";


                websiteLink.href =
                    business.website;


                websiteLink.target =
                    "_blank";


                websiteLink.rel =
                    "noopener noreferrer";


                websiteLink.innerHTML =
                    `
                    <i class="fa-solid fa-globe"></i>
                    Website
                    `;


                businessModalActions.appendChild(
                    websiteLink
                );

            }


            // -------------------------------------------------
            // INSTAGRAM
            // -------------------------------------------------

            if (business.instagram) {

                const instagramLink =
                    document.createElement(
                        "a"
                    );


                instagramLink.className =
                    "btn btn-primary";


                instagramLink.href =
                    business.instagram;


                instagramLink.target =
                    "_blank";


                instagramLink.rel =
                    "noopener noreferrer";


                instagramLink.innerHTML =
                    `
                    <i class="fa-brands fa-instagram"></i>
                    Instagram
                    `;


                businessModalActions.appendChild(
                    instagramLink
                );

            }

        }


        businessModal.classList.add(
            "active"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    // =====================================================
    // CLOSE BUSINESS MODAL
    // =====================================================

    function closeBusinessModal() {

        if (!businessModal) {
            return;
        }


        businessModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "modal-open"
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


    // =====================================================
    // BUSINESS DETAILS BUTTON
    // EVENT DELEGATION
    // =====================================================

    if (businessGrid) {

        businessGrid.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".business-details-btn"
                    );


                if (!button) {
                    return;
                }


                const businessId =
                    button.getAttribute(
                        "data-business-id"
                    );


                const businesses =
                    getBusinesses();


                const business =
                    businesses.find(
                        function (item) {

                            return (
                                String(
                                    item.id
                                ) ===
                                String(
                                    businessId
                                )
                            );

                        }
                    );


                if (business) {

                    openBusinessDetails(
                        business
                    );

                }

            }
        );

    }


    // =====================================================
    // INITIAL BUSINESS RENDER
    // =====================================================

    renderBusinesses();


    // =====================================================
    // ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeMobileMenu();

            closeServiceModal();

            closeBusinessModal();

        }
    );


    // =====================================================
    // REDUCED MOTION
    // =====================================================

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        prefersReducedMotion.matches
    ) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }


    console.log(
        "09ZERO website loaded successfully."
    );

});


// =====================================================
// CLIENTS SLIDER
// =====================================================

(function () {


    const slider =
        document.querySelector(
            ".clients-slider"
        );


    if (!slider) {
        return;
    }


    const viewport =
        slider.querySelector(
            ".clients-viewport"
        );


    const track =
        slider.querySelector(
            ".clients-track"
        );


    const slides =
        Array.from(
            slider.querySelectorAll(
                ".client-slide"
            )
        );


    const prevButton =
        slider.querySelector(
            ".clients-prev"
        );


    const nextButton =
        slider.querySelector(
            ".clients-next"
        );


    const dotsContainer =
        document.querySelector(
            ".clients-dots"
        );


    if (
        !viewport ||
        !track ||
        !slides.length
    ) {

        return;

    }


    let currentIndex =
        0;


    let slidesPerView =
        3;


    let autoSlideTimer =
        null;


    let touchStartX =
        0;


    let touchEndX =
        0;


    // =====================================================
    // SLIDES PER VIEW
    // =====================================================

    function getSlidesPerView() {

        if (
            window.innerWidth <=
            700
        ) {

            return 1;

        }


        if (
            window.innerWidth <=
            1000
        ) {

            return 2;

        }


        return 3;

    }


    // =====================================================
    // TOTAL PAGES
    // =====================================================

    function getTotalPages() {

        slidesPerView =
            getSlidesPerView();


        return Math.max(
            1,
            Math.ceil(
                slides.length /
                slidesPerView
            )
        );

    }


    // =====================================================
    // CREATE DOTS
    // =====================================================

    function createDots() {

        if (!dotsContainer) {
            return;
        }


        dotsContainer.innerHTML =
            "";


        const totalPages =
            getTotalPages();


        for (
            let i = 0;
            i < totalPages;
            i++
        ) {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";


            dot.className =
                "clients-dot";


            dot.setAttribute(
                "aria-label",
                "Go to client slide " +
                (i + 1)
            );


            dot.addEventListener(
                "click",
                function () {

                    goToSlide(i);

                    restartAutoSlide();

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }

    }


    // =====================================================
    // UPDATE DOTS
    // =====================================================

    function updateDots() {

        if (!dotsContainer) {
            return;
        }


        const dots =
            dotsContainer.querySelectorAll(
                ".clients-dot"
            );


        dots.forEach(
            function (
                dot,
                index
            ) {

                dot.classList.toggle(
                    "active",
                    index ===
                        currentIndex
                );

            }
        );

    }


    // =====================================================
    // GO TO SLIDE
    // =====================================================

    function goToSlide(
        index
    ) {

        const totalPages =
            getTotalPages();


        if (index < 0) {

            index =
                totalPages - 1;

        }


        if (
            index >= totalPages
        ) {

            index =
                0;

        }


        currentIndex =
            index;


        const percentage =
            currentIndex *
            (
                100 /
                slidesPerView
            );


        track.style.transform =
            "translateX(-" +
            percentage +
            "%)";


        updateDots();

    }


    // =====================================================
    // NEXT / PREVIOUS
    // =====================================================

    function nextSlide() {

        goToSlide(
            currentIndex + 1
        );

    }


    function previousSlide() {

        goToSlide(
            currentIndex - 1
        );

    }


    // =====================================================
    // AUTO SLIDE
    // =====================================================

    function startAutoSlide() {

        stopAutoSlide();


        autoSlideTimer =
            setInterval(
                function () {

                    nextSlide();

                },
                5000
            );

    }


    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(
                autoSlideTimer
            );


            autoSlideTimer =
                null;

        }

    }


    function restartAutoSlide() {

        startAutoSlide();

    }


    // =====================================================
    // NEXT BUTTON
    // =====================================================

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                restartAutoSlide();

            }
        );

    }


    // =====================================================
    // PREVIOUS BUTTON
    // =====================================================

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                previousSlide();

                restartAutoSlide();

            }
        );

    }


    // =====================================================
    // TOUCH SWIPE
    // =====================================================

    viewport.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event
                    .changedTouches[0]
                    .screenX;


            stopAutoSlide();

        },
        {
            passive:
                true
        }
    );


    viewport.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event
                    .changedTouches[0]
                    .screenX;


            handleSwipe();


            startAutoSlide();

        },
        {
            passive:
                true
        }
    );


    function handleSwipe() {

        const swipeDistance =
            touchEndX -
            touchStartX;


        const minimumSwipeDistance =
            50;


        if (
            Math.abs(
                swipeDistance
            ) <
            minimumSwipeDistance
        ) {

            return;

        }


        if (
            swipeDistance < 0
        ) {

            nextSlide();

        } else {

            previousSlide();

        }

    }


    // =====================================================
    // PAUSE ON HOVER
    // =====================================================

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    // =====================================================
    // RESIZE
    // =====================================================

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        const newSlidesPerView =
                            getSlidesPerView();


                        if (
                            slidesPerView !==
                            newSlidesPerView
                        ) {

                            slidesPerView =
                                newSlidesPerView;


                            createDots();


                            const totalPages =
                                getTotalPages();


                            if (
                                currentIndex >=
                                totalPages
                            ) {

                                currentIndex =
                                    totalPages - 1;

                            }

                        }


                        goToSlide(
                            currentIndex
                        );

                    },
                    150
                );

        }
    );


    // =====================================================
    // INITIALIZE
    // =====================================================

    createDots();

    goToSlide(0);

    startAutoSlide();


})();
