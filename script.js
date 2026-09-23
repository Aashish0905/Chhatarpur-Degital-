/* =========================================================
   09ZERO - SCRIPT.JS
   Main Website JavaScript
   Supabase + Leads + Businesses + Visitor Tracking
========================================================= */

"use strict";

console.log("09ZERO JS LOADED");


/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
    "https://cgobnlyjyfjbjzcepuyp.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_BrvR9X1cfClkFW0t4Zqpzw_OvYGtSbt";


let supabaseClient = null;


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


/* =========================================================
   SUPABASE INITIALIZATION
========================================================= */

function initializeSupabase() {

    if (!window.supabase) {

        console.error(
            "09ZERO: Supabase library not loaded."
        );

        return false;
    }

    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

        console.log(
            "09ZERO: Supabase connected successfully."
        );

        return true;

    } catch (error) {

        console.error(
            "09ZERO: Supabase initialization failed:",
            error
        );

        supabaseClient = null;

        return false;
    }
}


/* =========================================================
   GENERAL HELPERS
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase();
}


function createRandomId(prefix = "") {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        return prefix + window.crypto.randomUUID();
    }

    return (
        prefix +
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 12)
    );
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message, type = "info") {

    const toast =
        $("#toast");

    const toastMessage =
        $("#toastMessage");

    if (!toast || !toastMessage) {
        return;
    }

    toastMessage.textContent =
        message;

    toast.classList.remove(
        "success",
        "error",
        "warning"
    );

    if (type) {
        toast.classList.add(type);
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4000);
}


/* =========================================================
   HEADER
========================================================= */

function initializeHeader() {

    const header =
        $("#header");

    const menuBtn =
        $("#menuBtn");

    const nav =
        $("#nav");


    function handleScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }


    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    if (!menuBtn || !nav) {
        return;
    }


    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                nav.classList.toggle("open");

            menuBtn.classList.toggle(
                "active",
                isOpen
            );

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        }
    );


    $$("#nav a").forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            }
        );
    });


    document.addEventListener(
        "click",
        event => {

            if (
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                nav.classList.remove(
                    "open"
                );

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            }
        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                nav.classList.remove(
                    "open"
                );

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );
            }
        }
    );
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const navLinks =
        $$("#nav .nav-link");

    if (!navLinks.length) {
        return;
    }


    const sections =
        Array.from(
            navLinks
        )
        .map(link => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                !href.startsWith("#")
            ) {
                return null;
            }

            return document.querySelector(
                href
            );
        })
        .filter(Boolean);


    if (!sections.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll() {

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        href
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    $("#header");

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    12;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );
    });
}


/* =========================================================
   YEAR
========================================================= */

function initializeYear() {

    const year =
        $("#year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }
}


/* =========================================================
   SERVICE MODAL
========================================================= */

const serviceData = {

    seo: {

        icon:
            "fa-solid fa-magnifying-glass-chart",

        label:
            "SEO",

        title:
            "Search Engine Optimization",

        description:
            "Improve your website's visibility in search engines with practical SEO work focused on technical health, content and local search.",

        list: [

            "Website SEO audit",

            "On-page SEO setup",

            "Keyword research",

            "Meta title and description",

            "Basic technical SEO",

            "Local SEO guidance"

        ],

        price:
            "Starting from ₹2,999"

    },


    social: {

        icon:
            "fa-brands fa-instagram",

        label:
            "SOCIAL MEDIA",

        title:
            "Social Media Marketing",

        description:
            "Build a consistent social media presence with content planning, profile optimization and practical growth strategies.",

        list: [

            "Social profile optimization",

            "Content strategy",

            "Post ideas",

            "Content planning",

            "Hashtag strategy",

            "Monthly growth guidance"

        ],

        price:
            "Starting from ₹2,499"

    },


    ads: {

        icon:
            "fa-solid fa-bullhorn",

        label:
            "GOOGLE ADS",

        title:
            "Google Ads",

        description:
            "Reach relevant customers with properly structured Google advertising campaigns and conversion-focused landing pages.",

        list: [

            "Campaign planning",

            "Keyword research",

            "Ad group structure",

            "Ad copy guidance",

            "Conversion tracking guidance",

            "Campaign optimization"

        ],

        price:
            "Starting from ₹3,999"

    },


    website: {

        icon:
            "fa-solid fa-laptop-code",

        label:
            "WEB DEVELOPMENT",

        title:
            "Website Development",

        description:
            "Modern responsive websites designed to look professional across mobile, tablet and desktop devices.",

        list: [

            "Responsive design",

            "Modern UI",

            "Mobile optimization",

            "Contact forms",

            "WhatsApp integration",

            "Basic SEO setup"

        ],

        price:
            "Starting from ₹5,999"

    },


    local: {

        icon:
            "fa-solid fa-store",

        label:
            "LOCAL BUSINESS",

        title:
            "Local Business Setup",

        description:
            "Create a stronger digital presence for your local business and make it easier for customers to discover and contact you.",

        list: [

            "Business profile guidance",

            "Google Business guidance",

            "Local SEO basics",

            "Social profile setup",

            "Contact setup",

            "Online presence strategy"

        ],

        price:
            "Starting from ₹1,999"

    },


    complete: {

        icon:
            "fa-solid fa-layer-group",

        label:
            "COMPLETE PACKAGE",

        title:
            "Complete Digital Package",

        description:
            "A complete digital solution combining website development, online presence and marketing strategy.",

        list: [

            "Professional website",

            "SEO foundation",

            "Social media strategy",

            "Local business setup",

            "Marketing consultation",

            "Growth strategy"

        ],

        price:
            "Starting from ₹9,999"

    }

};


function initializeServiceModal() {

    const modal =
        $("#serviceModal");

    const overlay =
        $("#modalOverlay");

    const closeBtn =
        $("#modalClose");

    const modalIcon =
        $("#modalIcon");

    const modalLabel =
        $("#modalLabel");

    const modalTitle =
        $("#modalTitle");

    const modalDescription =
        $("#modalDescription");

    const modalList =
        $("#modalList");

    const modalPrice =
        $("#modalPrice");


    if (!modal) {
        return;
    }


    function closeModal() {

        modal.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }


    function openModal(serviceKey) {

        const service =
            serviceData[serviceKey];

        if (!service) {
            return;
        }


        if (modalIcon) {

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
                service.list
                    .map(item =>
                        `<li>
                            <i class="fa-solid fa-check"></i>
                            <span>${escapeHTML(item)}</span>
                        </li>`
                    )
                    .join("");

        }


        if (modalPrice) {

            modalPrice.textContent =
                service.price;

        }


        modal.classList.add(
            "open"
        );

        document.body.classList.add(
            "modal-open"
        );
    }


    $$(".details-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const key =
                    button.dataset.service;

                openModal(key);

            }
        );
    });


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeModal
        );
    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeModal();

            }
        }
    );
}


/* =========================================================
   VISITOR TRACKING
========================================================= */

function getVisitorId() {

    const key =
        "09zero_visitor_id";

    let id =
        localStorage.getItem(key);

    if (!id) {

        id =
            createRandomId(
                "visitor_"
            );

        localStorage.setItem(
            key,
            id
        );
    }

    return id;
}


function getSessionId() {

    const key =
        "09zero_session_id";

    let id =
        sessionStorage.getItem(key);

    if (!id) {

        id =
            createRandomId(
                "session_"
            );

        sessionStorage.setItem(
            key,
            id
        );
    }

    return id;
}


function getDeviceType() {

    const width =
        window.innerWidth;

    if (width <= 767) {
        return "mobile";
    }

    if (width <= 1024) {
        return "tablet";
    }

    return "desktop";
}


function getDeviceName() {

    const type =
        getDeviceType();

    if (type === "mobile") {
        return "Mobile";
    }

    if (type === "tablet") {
        return "Tablet";
    }

    return "Desktop";
}


function getBrowser() {

    const userAgent =
        navigator.userAgent;

    if (/Edg\//i.test(userAgent)) {
        return "Microsoft Edge";
    }

    if (/OPR\//i.test(userAgent)) {
        return "Opera";
    }

    if (
        /Chrome\//i.test(userAgent) &&
        !/Edg\//i.test(userAgent)
    ) {
        return "Google Chrome";
    }

    if (/Firefox\//i.test(userAgent)) {
        return "Mozilla Firefox";
    }

    if (
        /Safari\//i.test(userAgent) &&
        !/Chrome\//i.test(userAgent)
    ) {
        return "Safari";
    }

    return "Other";
}


function getOperatingSystem() {

    const userAgent =
        navigator.userAgent;

    if (/Windows/i.test(userAgent)) {
        return "Windows";
    }

    if (/Android/i.test(userAgent)) {
        return "Android";
    }

    if (
        /iPhone|iPad|iPod/i.test(
            userAgent
        )
    ) {
        return "iOS";
    }

    if (/Mac OS X/i.test(userAgent)) {
        return "macOS";
    }

    if (/Linux/i.test(userAgent)) {
        return "Linux";
    }

    return "Other";
}


function getTrafficSource() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const utmSource =
        params.get("utm_source");

    const referrer =
        document.referrer || "";


    if (utmSource) {
        return utmSource;
    }

    if (!referrer) {
        return "Direct";
    }

    if (/google\./i.test(referrer)) {
        return "Google";
    }

    if (/bing\./i.test(referrer)) {
        return "Bing";
    }

    if (
        /facebook\.com/i.test(referrer) ||
        /fb\.com/i.test(referrer)
    ) {
        return "Facebook";
    }

    if (/instagram\.com/i.test(referrer)) {
        return "Instagram";
    }

    if (/linkedin\.com/i.test(referrer)) {
        return "LinkedIn";
    }

    if (
        /youtube\.com/i.test(referrer) ||
        /youtu\.be/i.test(referrer)
    ) {
        return "YouTube";
    }

    if (
        /twitter\.com/i.test(referrer) ||
        /x\.com/i.test(referrer)
    ) {
        return "X";
    }

    return "Referral";
}


function getUrlParameter(parameter) {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return (
        params.get(parameter) ||
        null
    );
}


function createVisitorPayload() {

    const source =
        getTrafficSource();

    return {

        visitor_id:
            getVisitorId(),

        session_id:
            getSessionId(),

        page_path:
            window.location.pathname,

        page_title:
            document.title || null,

        device:
            getDeviceName(),

        device_type:
            getDeviceType(),

        browser:
            getBrowser(),

        os:
            getOperatingSystem(),

        city:
            null,

        country:
            null,

        source:
            source,

        traffic_source:
            source,

        referrer:
            document.referrer || null,

        utm_source:
            getUrlParameter(
                "utm_source"
            ),

        utm_medium:
            getUrlParameter(
                "utm_medium"
            ),

        utm_campaign:
            getUrlParameter(
                "utm_campaign"
            ),

        ip_address:
            null
    };
}


async function trackVisitor() {

    if (!supabaseClient) {
        return;
    }

    try {

        const payload =
            createVisitorPayload();

        const {
            error
        } =
            await supabaseClient
                .from("visitors")
                .insert(payload);

        if (error) {

            console.error(
                "09ZERO visitor tracking error:",
                error
            );

            return;
        }

        console.log(
            "09ZERO visitor tracked successfully."
        );

    } catch (error) {

        console.error(
            "09ZERO visitor tracking exception:",
            error
        );
    }
}


/* =========================================================
   CONTACT / LEAD FORM
========================================================= */

function initializeContactForm() {

    const form =
        $("#contactForm");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                $("#contactName")
                    ?.value
                    .trim() || "";

            const email =
                $("#contactEmail")
                    ?.value
                    .trim() || "";

            const phone =
                $("#contactPhone")
                    ?.value
                    .trim() || "";

            const service =
                $("#contactService")
                    ?.value
                    .trim() || "";

            const message =
                $("#contactMessage")
                    ?.value
                    .trim() || "";


            const status =
                $("#contactFormStatus");

            const button =
                $("#contactSubmitBtn");


            if (!name) {

                setFormStatus(
                    status,
                    "Please enter your name.",
                    "error"
                );

                return;
            }


            if (!phone) {

                setFormStatus(
                    status,
                    "Please enter your phone number.",
                    "error"
                );

                return;
            }


            if (!service) {

                setFormStatus(
                    status,
                    "Please select a service.",
                    "error"
                );

                return;
            }


            if (!message) {

                setFormStatus(
                    status,
                    "Please enter your project details.",
                    "error"
                );

                return;
            }


            if (!supabaseClient) {

                setFormStatus(
                    status,
                    "Database connection is unavailable. Please try again.",
                    "error"
                );

                return;
            }


            const payload = {

                name:
                    name,

                email:
                    email || null,

                phone:
                    phone,

                company:
                    null,

                service:
                    service,

                message:
                    message,

                source:
                    "website",

                status:
                    "new"

            };


            const originalHTML =
                button
                    ? button.innerHTML
                    : "";


            if (button) {

                button.disabled =
                    true;

                button.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }


            setFormStatus(
                status,
                "Sending your enquiry...",
                "loading"
            );


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from("leads")
                        .insert(payload)
                        .select()
                        .single();


                if (error) {

                    console.error(
                        "09ZERO lead insert failed:",
                        error
                    );

                    throw error;
                }


                console.log(
                    "09ZERO lead saved:",
                    data
                );


                if (
                    typeof gtag ===
                    "function"
                ) {

                    gtag(
                        "event",
                        "generate_lead",
                        {
                            event_category:
                                "contact_form",

                            event_label:
                                service
                        }
                    );
                }


                setFormStatus(
                    status,
                    "Your enquiry has been submitted successfully.",
                    "success"
                );


                showToast(
                    "Your enquiry was submitted successfully.",
                    "success"
                );


                form.reset();


            } catch (error) {

                console.error(
                    "09ZERO Contact Form Error:",
                    error
                );


                let messageText =
                    "Unable to submit your enquiry. Please try again.";


                if (
                    error &&
                    error.code === "42501"
                ) {

                    messageText =
                        "Permission denied by Supabase. Please check the leads INSERT policy.";
                }


                setFormStatus(
                    status,
                    messageText,
                    "error"
                );


                showToast(
                    messageText,
                    "error"
                );

            } finally {

                if (button) {

                    button.disabled =
                        false;

                    button.innerHTML =
                        originalHTML;
                }
            }
        }
    );
}


function setFormStatus(
    element,
    message,
    type = ""
) {

    if (!element) {
        return;
    }

    element.textContent =
        message;

    element.classList.remove(
        "success",
        "error",
        "loading"
    );

    if (type) {
        element.classList.add(type);
    }
}


/* =========================================================
   BUSINESS DIRECTORY
========================================================= */

let businesses = [];

let filteredBusinesses = [];


const categoryIcons = {

    restaurant:
        "fa-solid fa-utensils",

    hotel:
        "fa-solid fa-hotel",

    shop:
        "fa-solid fa-store",

    clinic:
        "fa-solid fa-stethoscope",

    lawyer:
        "fa-solid fa-scale-balanced",

    coaching:
        "fa-solid fa-graduation-cap",

    "real-estate":
        "fa-solid fa-house",

    salon:
        "fa-solid fa-scissors",

    computer:
        "fa-solid fa-computer",

    default:
        "fa-solid fa-store"
};


const categoryLabels = {

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


function normalizeCategory(category) {

    const value =
        normalizeText(category);

    const map = {

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
        map[value] ||
        value ||
        "other"
    );
}


function normalizeBusiness(row) {

    const category =
        normalizeCategory(
            row.category
        );


    return {

        id:
            row.id,

        name:
            row.name || "",

        category:
            category,

        categoryLabel:
            categoryLabels[category] ||
            row.category ||
            "Business",

        ownerName:
            row.owner_name || "",

        phone:
            row.phone || "",

        whatsapp:
            row.whatsapp || "",

        mapsUrl:
            row.maps_url || "",

        website:
            row.website || "",

        instagram:
            row.instagram || "",

        address:
            row.address || "",

        description:
            row.description || "",

        status:
            row.status || "pending",

        createdAt:
            row.created_at || null,

        updatedAt:
            row.updated_at || null

    };
}


/* =========================================================
   LOAD BUSINESSES
========================================================= */

async function loadBusinesses() {

    const grid =
        $("#businessGrid");

    if (!grid) {
        return;
    }


    if (!supabaseClient) {

        renderBusinesses([]);

        showToast(
            "Business directory database is unavailable.",
            "error"
        );

        return;
    }


    grid.innerHTML = `
        <div class="business-loading">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Loading businesses...</span>
        </div>
    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("businesses")
                .select(
                    "id,name,category,owner_name,phone,whatsapp,maps_url,website,instagram,address,description,status,created_at,updated_at"
                )
                .eq(
                    "status",
                    "approved"
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


        if (error) {

            console.error(
                "Business fetch failed:",
                error
            );

            throw error;
        }


        businesses =
            (data || [])
                .map(
                    normalizeBusiness
                );


        filteredBusinesses =
            [...businesses];


        renderBusinesses(
            filteredBusinesses
        );


        console.log(
            `09ZERO: ${businesses.length} approved businesses loaded.`
        );


    } catch (error) {

        console.error(
            "09ZERO business directory error:",
            error
        );


        businesses = [];

        filteredBusinesses = [];


        if (grid) {

            grid.innerHTML = `
                <div class="business-loading business-error">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span>Unable to load businesses right now.</span>
                </div>
            `;
        }
    }
}


/* =========================================================
   BUSINESS CARD
========================================================= */

function renderBusinesses(list) {

    const grid =
        $("#businessGrid");

    const empty =
        $("#businessEmpty");


    if (!grid) {
        return;
    }


    if (!list.length) {

        grid.innerHTML = "";


        if (empty) {

            empty.style.display =
                "flex";
        }

        return;
    }


    if (empty) {

        empty.style.display =
            "none";
    }


    grid.innerHTML =
        list
            .map(
                business =>
                    createBusinessCard(
                        business
                    )
            )
            .join("");


    attachBusinessCardEvents();
}


function createBusinessCard(
    business
) {

    const icon =
        categoryIcons[
            business.category
        ] ||
        categoryIcons.default;


    const description =
        business.description ||
        "Local business listed on 09ZERO Business Hub.";


    const address =
        business.address ||
        "Chhatarpur";


    return `
        <article
            class="business-card"
            data-business-id="${escapeHTML(business.id)}"
        >

            <div class="business-card-top">

                <div class="business-icon">
                    <i class="${icon}"></i>
                </div>

                <span class="business-category">
                    ${escapeHTML(
                        business.categoryLabel
                    )}
                </span>

            </div>


            <h3>
                ${escapeHTML(
                    business.name
                )}
            </h3>


            <div class="business-location">
                <i class="fa-solid fa-location-dot"></i>
                <span>
                    ${escapeHTML(address)}
                </span>
            </div>


            <p>
                ${escapeHTML(
                    description
                )}
            </p>


            <div class="business-card-bottom">

                <button
                    type="button"
                    class="business-view-btn"
                    data-business-id="${escapeHTML(
                        business.id
                    )}"
                >
                    View Details
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>

        </article>
    `;
}


function attachBusinessCardEvents() {

    $$(".business-view-btn").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.businessId;

                    openBusinessModal(id);
                }
            );
        }
    );


    $$(".business-card").forEach(
        card => {

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            "button"
                        )
                    ) {
                        return;
                    }

                    const id =
                        card.dataset.businessId;

                    openBusinessModal(id);
                }
            );
        }
    );
}


/* =========================================================
   BUSINESS SEARCH + FILTER
========================================================= */

function initializeBusinessFilters() {

    const search =
        $("#businessSearch");

    const category =
        $("#businessCategory");


    function applyFilters() {

        const searchValue =
            normalizeText(
                search
                    ? search.value
                    : ""
            );


        const categoryValue =
            category
                ? normalizeText(
                    category.value
                )
                : "all";


        filteredBusinesses =
            businesses.filter(
                business => {

                    const matchesSearch =
                        !searchValue ||
                        normalizeText(
                            business.name
                        ).includes(
                            searchValue
                        ) ||
                        normalizeText(
                            business.categoryLabel
                        ).includes(
                            searchValue
                        ) ||
                        normalizeText(
                            business.address
                        ).includes(
                            searchValue
                        ) ||
                        normalizeText(
                            business.description
                        ).includes(
                            searchValue
                        );


                    const matchesCategory =
                        categoryValue ===
                        "all" ||
                        business.category ===
                        categoryValue;


                    return (
                        matchesSearch &&
                        matchesCategory
                    );
                }
            );


        renderBusinesses(
            filteredBusinesses
        );
    }


    if (search) {

        search.addEventListener(
            "input",
            applyFilters
        );
    }


    if (category) {

        category.addEventListener(
            "change",
            applyFilters
        );
    }
}


/* =========================================================
   BUSINESS MODAL
========================================================= */

function initializeBusinessModal() {

    const modal =
        $("#businessModal");

    const overlay =
        $("#businessModalOverlay");

    const closeBtn =
        $("#businessModalClose");


    if (!modal) {
        return;
    }


    function closeBusinessModal() {

        modal.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeBusinessModal
        );
    }


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeBusinessModal
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "open"
                )
            ) {

                closeBusinessModal();
            }
        }
    );
}


function openBusinessModal(id) {

    const business =
        businesses.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!business) {
        return;
    }


    const modal =
        $("#businessModal");

    const icon =
        $("#businessModalIcon");

    const category =
        $("#businessModalCategory");

    const title =
        $("#businessModalTitle");

    const location =
        $("#businessModalLocation");

    const description =
        $("#businessModalDescription");

    const actions =
        $("#businessModalActions");


    if (!modal) {
        return;
    }


    const businessIcon =
        categoryIcons[
            business.category
        ] ||
        categoryIcons.default;


    if (icon) {

        icon.innerHTML =
            `<i class="${businessIcon}"></i>`;
    }


    if (category) {

        category.textContent =
            business.categoryLabel;
    }


    if (title) {

        title.textContent =
            business.name;
    }


    if (location) {

        location.innerHTML =
            `<i class="fa-solid fa-location-dot"></i>
             <span>${escapeHTML(
                 business.address ||
                 "Chhatarpur"
             )}</span>`;
    }


    if (description) {

        description.textContent =
            business.description ||
            "Local business listed on 09ZERO Business Hub.";
    }


    if (actions) {

        actions.innerHTML =
            createBusinessActions(
                business
            );
    }


    modal.classList.add(
        "open"
    );

    document.body.classList.add(
        "modal-open"
    );
}


function createBusinessActions(
    business
) {

    const buttons = [];


    if (business.phone) {

        buttons.push(`
            <a
                href="tel:${escapeHTML(
                    business.phone
                )}"
                class="btn btn-primary"
            >
                <i class="fa-solid fa-phone"></i>
                Call
            </a>
        `);
    }


    if (business.whatsapp) {

        const whatsappNumber =
            business.whatsapp
                .replace(
                    /[^\d+]/g,
                    ""
                );


        const cleanNumber =
            whatsappNumber.replace(
                /^\+/,
                ""
            );


        buttons.push(`
            <a
                href="https://wa.me/${escapeHTML(
                    cleanNumber
                )}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
            >
                <i class="fa-brands fa-whatsapp"></i>
                WhatsApp
            </a>
        `);
    }


    if (business.mapsUrl) {

        buttons.push(`
            <a
                href="${escapeHTML(
                    business.mapsUrl
                )}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
            >
                <i class="fa-solid fa-location-dot"></i>
                Maps
            </a>
        `);
    }


    if (business.website) {

        buttons.push(`
            <a
                href="${escapeHTML(
                    business.website
                )}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
            >
                <i class="fa-solid fa-globe"></i>
                Website
            </a>
        `);
    }


    if (business.instagram) {

        buttons.push(`
            <a
                href="${escapeHTML(
                    business.instagram
                )}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
            >
                <i class="fa-brands fa-instagram"></i>
                Instagram
            </a>
        `);
    }


    return (
        buttons.length
            ? buttons.join("")
            : `
                <span class="business-no-contact">
                    Contact information not available.
                </span>
            `
    );
}


/* =========================================================
   ADD BUSINESS FORM
========================================================= */

function initializeBusinessForm() {

    const openButton =
        $("#openBusinessForm");

    const closeButton =
        $("#closeBusinessForm");

    const formWrapper =
        $("#businessForm");

    const form =
        $("#businessListingForm");


    if (!formWrapper || !form) {
        return;
    }


    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                formWrapper.style.display =
                    "block";

                setTimeout(() => {

                    formWrapper.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }, 50);
            }
        );
    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                formWrapper.style.display =
                    "none";

                form.reset();
            }
        );
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!supabaseClient) {

                showToast(
                    "Database connection is unavailable.",
                    "error"
                );

                return;
            }


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            const originalHTML =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            const name =
                $("#businessName")
                    ?.value
                    .trim() || "";

            const category =
                $("#businessFormCategory")
                    ?.value
                    .trim() || "";

            const ownerName =
                $("#ownerName")
                    ?.value
                    .trim() || "";

            const phone =
                $("#businessPhone")
                    ?.value
                    .trim() || "";

            const whatsapp =
                $("#businessWhatsapp")
                    ?.value
                    .trim() || "";

            const mapsUrl =
                $("#businessMaps")
                    ?.value
                    .trim() || "";

            const website =
                $("#businessWebsite")
                    ?.value
                    .trim() || "";

            const instagram =
                $("#businessInstagram")
                    ?.value
                    .trim() || "";

            const address =
                $("#businessAddress")
                    ?.value
                    .trim() || "";

            const description =
                $("#businessDescription")
                    ?.value
                    .trim() || "";


            if (
                !name ||
                !category ||
                !phone ||
                !address
            ) {

                showToast(
                    "Please fill all required business fields.",
                    "error"
                );

                return;
            }


            const payload = {

                name:
                    name,

                category:
                    normalizeCategory(
                        category
                    ),

                owner_name:
                    ownerName || null,

                phone:
                    phone,

                whatsapp:
                    whatsapp || null,

                maps_url:
                    mapsUrl || null,

                website:
                    website || null,

                instagram:
                    instagram || null,

                address:
                    address,

                description:
                    description || null,

                status:
                    "pending"

            };


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            }


            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from("businesses")
                        .insert(payload)
                        .select()
                        .single();


                if (error) {

                    console.error(
                        "Business submission error:",
                        error
                    );

                    throw error;
                }


                console.log(
                    "Business submitted:",
                    data
                );


                if (
                    typeof gtag ===
                    "function"
                ) {

                    gtag(
                        "event",
                        "business_listing_submit",
                        {
                            event_category:
                                "business_hub"
                        }
                    );
                }


                showToast(
                    "Business submitted successfully. It will appear after approval.",
                    "success"
                );


                form.reset();


                formWrapper.style.display =
                    "none";


            } catch (error) {

                console.error(
                    "09ZERO business submission failed:",
                    error
                );


                let message =
                    "Unable to submit business. Please try again.";


                if (
                    error &&
                    error.code === "42501"
                ) {

                    message =
                        "Permission denied. Please check the businesses INSERT policy.";
                }


                showToast(
                    message,
                    "error"
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalHTML;
                }
            }
        }
    );
}


/* =========================================================
   CLIENT SLIDER
========================================================= */

function initializeClientSlider() {

    const track =
        $(".clients-track");

    const slides =
        $$(".client-slide");

    const prevButton =
        $(".clients-prev");

    const nextButton =
        $(".clients-next");

    const dotsContainer =
        $(".clients-dots");


    if (
        !track ||
        !slides.length
    ) {
        return;
    }


    let currentIndex =
        0;

    let autoPlay = null;


    function createDots() {

        if (!dotsContainer) {
            return;
        }


        dotsContainer.innerHTML =
            slides
                .map(
                    (_, index) =>
                        `
                        <button
                            type="button"
                            class="${index === 0 ? "active" : ""}"
                            aria-label="Go to client ${index + 1}"
                            data-slide="${index}"
                        ></button>
                        `
                )
                .join("");


        $$(".clients-dots button")
            .forEach(dot => {

                dot.addEventListener(
                    "click",
                    () => {

                        goToSlide(
                            Number(
                                dot.dataset.slide
                            )
                        );

                        restartAutoPlay();
                    }
                );
            });
    }


    function updateSlider() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        $$(".clients-dots button")
            .forEach(
                (dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index ===
                        currentIndex
                    );
                }
            );
    }


    function goToSlide(index) {

        if (
            index < 0
        ) {

            currentIndex =
                slides.length - 1;

        } else if (
            index >= slides.length
        ) {

            currentIndex = 0;

        } else {

            currentIndex =
                index;
        }


        updateSlider();
    }


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


    function startAutoPlay() {

        if (slides.length <= 1) {
            return;
        }


        autoPlay =
            setInterval(
                nextSlide,
                5000
            );
    }


    function stopAutoPlay() {

        if (autoPlay) {

            clearInterval(
                autoPlay
            );

            autoPlay = null;
        }
    }


    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();
    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoPlay();
            }
        );
    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoPlay();
            }
        );
    }


    const viewport =
        $(".clients-viewport");


    if (viewport) {

        viewport.addEventListener(
            "mouseenter",
            stopAutoPlay
        );

        viewport.addEventListener(
            "mouseleave",
            startAutoPlay
        );
    }


    createDots();

    updateSlider();

    startAutoPlay();
}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initializeRevealAnimations() {

    const elements =
        $(
            ".service-card, " +
            ".price-card, " +
            ".process-card, " +
            ".project-card, " +
            ".client-card, " +
            ".about-content, " +
            ".about-visual, " +
            ".contact-box, " +
            ".business-card"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(
        element => {

            element.classList.add(
                "reveal-element"
            );
        }
    );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element =>
                element.classList.add(
                    "reveal-visible"
                )
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );
                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    elements.forEach(
        element =>
            observer.observe(
                element
            )
    );
}


/* =========================================================
   BUTTON TRACKING
========================================================= */

function initializeAnalyticsEvents() {

    $$(
        'a[href*="wa.me"]'
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        typeof gtag ===
                        "function"
                    ) {

                        gtag(
                            "event",
                            "whatsapp_click",
                            {
                                event_category:
                                    "engagement"
                            }
                        );
                    }
                }
            );
        }
    );


    $$(
        ".project-link"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        typeof gtag ===
                        "function"
                    ) {

                        gtag(
                            "event",
                            "project_view",
                            {
                                event_category:
                                    "portfolio"
                            }
                        );
                    }
                }
            );
        }
    );
}


/* =========================================================
   SUPABASE CONNECTION TEST
========================================================= */

async function testSupabaseConnection() {

    if (!supabaseClient) {

        console.error(
            "09ZERO: Supabase client unavailable."
        );

        return;
    }


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("businesses")
                .select(
                    "id,name,category,status"
                )
                .eq(
                    "status",
                    "approved"
                )
                .limit(5);


        if (error) {

            console.error(
                "09ZERO Supabase test failed:",
                error
            );

            return;
        }


        console.log(
            "09ZERO Supabase test successful:",
            data
        );


    } catch (error) {

        console.error(
            "09ZERO Supabase test exception:",
            error
        );
    }
}


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "================================="
        );

        console.log(
            "09ZERO WEBSITE INITIALIZING"
        );

        console.log(
            "================================="
        );


        /* -----------------------------------------
           SUPABASE
        ----------------------------------------- */

        const supabaseReady =
            initializeSupabase();


        /* -----------------------------------------
           HEADER
        ----------------------------------------- */

        initializeHeader();


        /* -----------------------------------------
           NAVIGATION
        ----------------------------------------- */

        initializeActiveNavigation();

        initializeSmoothScroll();


        /* -----------------------------------------
           YEAR
        ----------------------------------------- */

        initializeYear();


        /* -----------------------------------------
           SERVICE MODAL
        ----------------------------------------- */

        initializeServiceModal();


        /* -----------------------------------------
           CONTACT FORM
        ----------------------------------------- */

        initializeContactForm();


        /* -----------------------------------------
           BUSINESS DIRECTORY
        ----------------------------------------- */

        initializeBusinessFilters();

        initializeBusinessModal();

        initializeBusinessForm();


        /* -----------------------------------------
           CLIENT SLIDER
        ----------------------------------------- */

        initializeClientSlider();


        /* -----------------------------------------
           REVEAL ANIMATION
        ----------------------------------------- */

        initializeRevealAnimations();


        /* -----------------------------------------
           ANALYTICS EVENTS
        ----------------------------------------- */

        initializeAnalyticsEvents();


        /* -----------------------------------------
           SUPABASE DATA
        ----------------------------------------- */

        if (supabaseReady) {

            await testSupabaseConnection();

            await loadBusinesses();

            await trackVisitor();

        }


        console.log(
            "================================="
        );

        console.log(
            "09ZERO WEBSITE READY"
        );

        console.log(
            "================================="
        );
    }
);
