// =====================================================
// AASHISH DIGITAL - MAIN JAVASCRIPT
// FINAL REPLACE VERSION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // BASIC DOM ELEMENTS
    // =====================================================

    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    console.log("AASHISH DIGITAL JS LOADED");
    console.log("Menu Button:", menuBtn);
    console.log("Navigation:", nav);


    // =====================================================
    // CURRENT YEAR
    // =====================================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =====================================================
    // MOBILE MENU
    // IMPORTANT:
    // YOUR CSS USES .nav.open
    // =====================================================

    if (menuBtn && nav) {

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open Menu");


        // ---------------------------------------------
        // OPEN / CLOSE MENU
        // ---------------------------------------------

        menuBtn.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            nav.classList.toggle("open");

            const isOpen = nav.classList.contains("open");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close Menu" : "Open Menu"
            );


            // Change hamburger icon
            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            console.log("Mobile menu:", isOpen ? "OPEN" : "CLOSED");

        });


        // ---------------------------------------------
        // CLOSE MENU WHEN LINK IS CLICKED
        // ---------------------------------------------

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );


                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });


        // ---------------------------------------------
        // CLOSE MENU WHEN CLICKING OUTSIDE
        // ---------------------------------------------

        document.addEventListener("click", function (event) {

            if (!nav.classList.contains("open")) {
                return;
            }

            if (
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                nav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );


                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });


        // ---------------------------------------------
        // ESCAPE KEY
        // ---------------------------------------------

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                nav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );


                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });


        // ---------------------------------------------
        // CLOSE MENU ON DESKTOP
        // ---------------------------------------------

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {

                nav.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    } else {

        console.error(
            "Mobile menu error: menuBtn or nav not found."
        );

    }


    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================

    window.addEventListener("scroll", function () {

        if (!header) {
            return;
        }

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

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    // =====================================================
    // SMOOTH SCROLL
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // =====================================================
    // BUTTON HOVER / CLICK EFFECT
    // =====================================================

    document.querySelectorAll(".btn").forEach(function (button) {

        button.addEventListener("click", function () {

            this.classList.add("clicked");

            setTimeout(() => {

                this.classList.remove("clicked");

            }, 300);

        });

    });


    // =====================================================
    // SERVICE DETAILS
    // =====================================================

    const serviceData = {

        seo: {
            icon: "fa-solid fa-magnifying-glass-chart",
            label: "SEO SERVICE",
            title: "SEO Services",
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
            price: "Starting ₹2,999"
        },

        social: {
            icon: "fa-brands fa-instagram",
            label: "SOCIAL MEDIA",
            title: "Social Media Marketing",
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
            price: "Starting ₹2,499"
        },

        ads: {
            icon: "fa-brands fa-google",
            label: "PAID ADS",
            title: "Google Ads",
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
            price: "Starting ₹3,999"
        },

        website: {
            icon: "fa-solid fa-code",
            label: "WEB DEVELOPMENT",
            title: "Business Website",
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
            price: "Starting ₹5,999"
        },

        local: {
            icon: "fa-solid fa-location-dot",
            label: "LOCAL BUSINESS",
            title: "Local Business Setup",
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
            price: "Starting ₹1,999"
        },

        complete: {
            icon: "fa-solid fa-rocket",
            label: "DIGITAL GROWTH",
            title: "Complete Digital Growth",
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
            price: "Starting ₹9,999"
        }

    };


    // =====================================================
    // SERVICE MODAL
    // =====================================================

    const serviceModal =
        document.getElementById("serviceModal");

    const modalOverlay =
        document.getElementById("serviceModalOverlay");

    const modalClose =
        document.getElementById("serviceModalClose");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalLabel =
        document.getElementById("modalLabel");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalList =
        document.getElementById("modalList");

    const modalPrice =
        document.getElementById("modalPrice");


    document.querySelectorAll(".details-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const serviceName =
                this.getAttribute("data-service");

            const service =
                serviceData[serviceName];

            if (!service || !serviceModal) {
                return;
            }


            if (modalIcon) {

                modalIcon.className =
                    service.icon;

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

                modalList.innerHTML = "";

                service.list.forEach(function (item) {

                    const li =
                        document.createElement("li");

                    li.innerHTML =
                        `<i class="fa-solid fa-check"></i> ${item}`;

                    modalList.appendChild(li);

                });

            }

            if (modalPrice) {

                modalPrice.textContent =
                    service.price;

            }


            serviceModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    function closeServiceModal() {

        if (!serviceModal) {
            return;
        }

        serviceModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


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
    // COMING SOON
    // =====================================================

    document.querySelectorAll(".coming-soon").forEach(function (button) {

        button.addEventListener("click", function () {

            showToast(
                "This feature is coming soon."
            );

        });

    });


    // =====================================================
    // TOAST
    // =====================================================

    function showToast(message) {

        let toast =
            document.querySelector(".toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    // =====================================================
    // ESCAPE CLOSE MODALS
    // =====================================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeServiceModal();

        }

    });


    // =====================================================
    // REDUCED MOTION
    // =====================================================

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (prefersReducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }


    // =====================================================
    // FINAL MESSAGE
    // =====================================================

    console.log(
        "Aashish Digital website loaded successfully."
    );

});





/* =================================
   CLIENTS SLIDER
================================= */

(function () {

    const slider = document.querySelector(".clients-slider");

    if (!slider) return;

    const viewport = slider.querySelector(".clients-viewport");
    const track = slider.querySelector(".clients-track");
    const slides = Array.from(slider.querySelectorAll(".client-slide"));
    const prevButton = slider.querySelector(".clients-prev");
    const nextButton = slider.querySelector(".clients-next");
    const dotsContainer = document.querySelector(".clients-dots");

    if (!track || !slides.length) return;


    let currentIndex = 0;
    let slidesPerView = 3;
    let autoSlideTimer;

    let touchStartX = 0;
    let touchEndX = 0;


    /* ================================
       GET SLIDES PER VIEW
    ================================= */

    function getSlidesPerView() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    /* ================================
       TOTAL PAGES
    ================================= */

    function getTotalPages() {

        slidesPerView = getSlidesPerView();

        return Math.max(
            1,
            Math.ceil(slides.length / slidesPerView)
        );
    }


    /* ================================
       CREATE DOTS
    ================================= */

    function createDots() {

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        const totalPages = getTotalPages();

        for (let i = 0; i < totalPages; i++) {

            const dot = document.createElement("button");

            dot.className = "clients-dot";

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                "Go to client slide " + (i + 1)
            );

            dot.addEventListener("click", function () {

                goToSlide(i);

                restartAutoSlide();

            });

            dotsContainer.appendChild(dot);
        }

    }


    /* ================================
       UPDATE DOTS
    ================================= */

    function updateDots() {

        if (!dotsContainer) return;

        const dots =
            dotsContainer.querySelectorAll(".clients-dot");

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* ================================
       GO TO SLIDE
    ================================= */

    function goToSlide(index) {

        const totalPages = getTotalPages();

        if (index < 0) {
            index = totalPages - 1;
        }

        if (index >= totalPages) {
            index = 0;
        }

        currentIndex = index;

        const percentage =
            currentIndex * (100 / slidesPerView);

        track.style.transform =
            "translateX(-" + percentage + "%)";

        updateDots();

    }


    /* ================================
       NEXT
    ================================= */

    function nextSlide() {

        goToSlide(currentIndex + 1);

    }


    /* ================================
       PREVIOUS
    ================================= */

    function previousSlide() {

        goToSlide(currentIndex - 1);

    }


    /* ================================
       AUTO SLIDE
    ================================= */

    function startAutoSlide() {

        stopAutoSlide();

        autoSlideTimer = setInterval(function () {

            nextSlide();

        }, 5000);

    }


    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    function restartAutoSlide() {

        startAutoSlide();

    }


    /* ================================
       ARROWS
    ================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                restartAutoSlide();

            }
        );

    }


    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                previousSlide();

                restartAutoSlide();

            }
        );

    }


    /* ================================
       TOUCH SWIPE
    ================================= */

    viewport.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoSlide();

        },
        { passive: true }
    );


    viewport.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

            startAutoSlide();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;

        const minimumSwipeDistance = 50;

        if (
            Math.abs(swipeDistance) <
            minimumSwipeDistance
        ) {
            return;
        }

        if (swipeDistance < 0) {

            nextSlide();

        } else {

            previousSlide();

        }

    }


    /* ================================
       PAUSE ON HOVER
    ================================= */

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );

    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    /* ================================
       RESIZE
    ================================= */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(function () {

                const oldSlidesPerView =
                    slidesPerView;

                const newSlidesPerView =
                    getSlidesPerView();

                if (
                    oldSlidesPerView !==
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

                goToSlide(currentIndex);

            }, 150);

        }
    );


    /* ================================
       INITIALIZE
    ================================= */

    createDots();

    goToSlide(0);

    startAutoSlide();

})();
