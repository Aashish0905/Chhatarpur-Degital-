/* =========================================================
   09ZERO - SCRIPT.JS
   Contact Form + Visitor Tracking
========================================================= */

"use strict";

console.log("09ZERO JS LOADED");


/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL = "https://cgobnlyjyfjbjzcepuyp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY_HERE";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================================================
   SUPABASE CLIENT
========================================================= */

let supabaseClient = null;


function initializeSupabase() {

    if (!window.supabase) {

        console.error(
            "09ZERO Supabase library not loaded."
        );

        return false;

    }


    try {

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );


        console.log(
            "09ZERO Supabase client initialized successfully."
        );


        return true;

    } catch (error) {

        console.error(
            "09ZERO Supabase initialization failed:",
            error
        );

        return false;

    }

}


/* =========================================================
   HELPER - CREATE RANDOM ID
========================================================= */

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
   VISITOR ID
========================================================= */

function getVisitorId() {

    const storageKey =
        "09zero_visitor_id";


    let visitorId =
        localStorage.getItem(storageKey);


    if (!visitorId) {

        visitorId =
            createRandomId("visitor_");

        localStorage.setItem(
            storageKey,
            visitorId
        );

    }


    return visitorId;

}


/* =========================================================
   SESSION ID
========================================================= */

function getSessionId() {

    const storageKey =
        "09zero_session_id";


    let sessionId =
        sessionStorage.getItem(storageKey);


    if (!sessionId) {

        sessionId =
            createRandomId("session_");

        sessionStorage.setItem(
            storageKey,
            sessionId
        );

    }


    return sessionId;

}


/* =========================================================
   DEVICE TYPE
========================================================= */

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


/* =========================================================
   DEVICE NAME
========================================================= */

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


/* =========================================================
   BROWSER
========================================================= */

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


/* =========================================================
   OPERATING SYSTEM
========================================================= */

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
        /iPhone|iPad|iPod/i.test(userAgent)
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


/* =========================================================
   TRAFFIC SOURCE
========================================================= */

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


/* =========================================================
   URL PARAMETER
========================================================= */

function getUrlParameter(parameter) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return (
        params.get(parameter) || null
    );

}


/* =========================================================
   VISITOR PAYLOAD
========================================================= */

function createVisitorPayload() {

    const trafficSource =
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
            trafficSource,

        traffic_source:
            trafficSource,

        referrer:
            document.referrer || null,

        utm_source:
            getUrlParameter("utm_source"),

        utm_medium:
            getUrlParameter("utm_medium"),

        utm_campaign:
            getUrlParameter("utm_campaign"),

        ip_address:
            null

    };

}


/* =========================================================
   VISITOR TRACKING
========================================================= */

async function trackVisitor() {

    try {

        if (!supabaseClient) {

            console.error(
                "Visitor tracking stopped: Supabase client unavailable."
            );

            return;

        }


        const visitorPayload =
            createVisitorPayload();


        console.log(
            "09ZERO Visitor Tracking:",
            visitorPayload
        );


        const {
            error
        } =
            await supabaseClient
                .from("visitors")
                .insert(
                    visitorPayload
                );


        if (error) {

            console.error(
                "Visitor tracking failed:",
                error
            );

            return;

        }


        console.log(
            "09ZERO Visitor Saved Successfully"
        );


    } catch (error) {

        console.error(
            "Visitor Tracking Error:",
            error
        );

    }

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initializeContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (!contactForm) {

        console.warn(
            "Contact form #contactForm not found."
        );

        return;

    }


    console.log(
        "09ZERO Contact Form Ready"
    );


    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =============================================
               FORM FIELDS
            ============================================= */

            const name =
                document
                    .getElementById("contactName")
                    ?.value
                    .trim() || "";


            const email =
                document
                    .getElementById("contactEmail")
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById("contactPhone")
                    ?.value
                    .trim() || "";


            const service =
                document
                    .getElementById("contactService")
                    ?.value
                    .trim() || "";


            const message =
                document
                    .getElementById("contactMessage")
                    ?.value
                    .trim() || "";


            const formStatus =
                document.getElementById(
                    "contactFormStatus"
                );


            /* =============================================
               VALIDATION
            ============================================= */

            if (!name) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter your name.";

                }

                return;

            }


            if (!phone) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter your phone number.";

                }

                return;

            }


            if (!service) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please select a service.";

                }

                return;

            }


            if (!message) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please enter your project details.";

                }

                return;

            }


            /* =============================================
               LEAD PAYLOAD
            ============================================= */

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


            console.log(
                "================================="
            );

            console.log(
                "09ZERO LEAD INSERT"
            );

            console.log(
                "LEAD PAYLOAD:",
                payload
            );

            console.log(
                "LEAD PAYLOAD JSON:",
                JSON.stringify(
                    payload,
                    null,
                    2
                )
            );


            /* =============================================
               SUBMIT BUTTON
            ============================================= */

            const submitButton =
                document.getElementById(
                    "contactSubmitBtn"
                );


            const originalButtonHTML =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            }


            if (formStatus) {

                formStatus.textContent =
                    "Sending your enquiry...";

            }


            /* =============================================
               SUPABASE CHECK
            ============================================= */

            if (!supabaseClient) {

                console.error(
                    "LEAD ERROR: Supabase client is not initialized."
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Connection error. Please try again.";

                }


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonHTML;

                }

                return;

            }


            /* =============================================
               CHECK AUTH SESSION
            ============================================= */

            try {

                const {
                    data: sessionData,
                    error: sessionError
                } =
                    await supabaseClient
                        .auth
                        .getSession();


                console.log(
                    "09ZERO AUTH SESSION:",
                    sessionData
                );


                if (sessionError) {

                    console.warn(
                        "Auth session check warning:",
                        sessionError
                    );

                }

            } catch (authError) {

                console.warn(
                    "Auth session check failed:",
                    authError
                );

            }


            /* =============================================
               INSERT LEAD
            ============================================= */

            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from("leads")
                        .insert(
                            payload
                        )
                        .select()
                        .single();


                console.log(
                    "SUPABASE LEAD DATA:",
                    data
                );


                console.log(
                    "SUPABASE LEAD ERROR:",
                    error
                );


                /* =====================================
                   ERROR
                ===================================== */

                if (error) {

                    console.error(
                        "SUPABASE LEAD INSERT FAILED:",
                        error
                    );


                    console.error(
                        "SUPABASE LEAD ERROR CODE:",
                        error.code
                    );


                    console.error(
                        "SUPABASE LEAD ERROR MESSAGE:",
                        error.message
                    );


                    console.error(
                        "SUPABASE LEAD ERROR DETAILS:",
                        error.details
                    );


                    console.error(
                        "SUPABASE LEAD ERROR HINT:",
                        error.hint
                    );


                    throw error;

                }


                /* =====================================
                   SUCCESS
                ===================================== */

                console.log(
                    "================================="
                );

                console.log(
                    "LEAD SAVED SUCCESSFULLY"
                );

                console.log(
                    "SAVED LEAD:",
                    data
                );

                console.log(
                    "================================="
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Your enquiry has been submitted successfully.";

                }


                alert(
                    "Thank you! Your enquiry has been submitted successfully."
                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact Form Error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        "Unable to submit your enquiry. Please try again.";

                }


                alert(
                    "Something went wrong while sending your enquiry. Please try again."
                );

            }


            /* =============================================
               RESTORE BUTTON
            ============================================= */

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonHTML;

            }

        }
    );

}


/* =========================================================
   WEBSITE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "================================="
        );

        console.log(
            "09ZERO WEBSITE INITIALIZING"
        );

        console.log(
            "================================="
        );


        /* =============================================
           SUPABASE
        ============================================= */

        const supabaseReady =
            initializeSupabase();


        if (!supabaseReady) {

            console.error(
                "09ZERO WEBSITE: Supabase unavailable."
            );

        }


        /* =============================================
           CONTACT FORM
        ============================================= */

        initializeContactForm();


        /* =============================================
           VISITOR TRACKING
        ============================================= */

        if (supabaseReady) {

            await trackVisitor();

        }


        console.log(
            "09ZERO WEBSITE READY"
        );

    }
);
