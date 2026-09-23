
/* =========================================================
   09ZERO - SCRIPT.JS
   Contact Form + Visitor Tracking
========================================================= */

console.log("09ZERO JS LOADED");


/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
    "https://cgobnlyjyfjbjzcepuyp.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_BrvR9X1cfClkFW0t4Zqpzw_OvYGtSbt";


/* =========================================================
   HELPER - CREATE RANDOM ID
========================================================= */

function createRandomId(prefix = "") {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return prefix + crypto.randomUUID();

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
   Stable ID for the same browser
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
   New session for the current browser session
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
   BROWSER DETECTION
========================================================= */

function getBrowser() {

    const userAgent =
        navigator.userAgent;


    if (
        /Edg\//i.test(userAgent)
    ) {

        return "Microsoft Edge";

    }


    if (
        /OPR\//i.test(userAgent)
    ) {

        return "Opera";

    }


    if (
        /Chrome\//i.test(userAgent) &&
        !/Edg\//i.test(userAgent)
    ) {

        return "Google Chrome";

    }


    if (
        /Firefox\//i.test(userAgent)
    ) {

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


    /* -----------------------------------------
       UTM SOURCE
    ----------------------------------------- */

    if (utmSource) {

        return utmSource;

    }


    /* -----------------------------------------
       NO REFERRER = DIRECT
    ----------------------------------------- */

    if (!referrer) {

        return "Direct";

    }


    /* -----------------------------------------
       GOOGLE
    ----------------------------------------- */

    if (
        /google\./i.test(referrer)
    ) {

        return "Google";

    }


    /* -----------------------------------------
       BING
    ----------------------------------------- */

    if (
        /bing\./i.test(referrer)
    ) {

        return "Bing";

    }


    /* -----------------------------------------
       FACEBOOK
    ----------------------------------------- */

    if (
        /facebook\.com/i.test(referrer) ||
        /fb\.com/i.test(referrer)
    ) {

        return "Facebook";

    }


    /* -----------------------------------------
       INSTAGRAM
    ----------------------------------------- */

    if (
        /instagram\.com/i.test(referrer)
    ) {

        return "Instagram";

    }


    /* -----------------------------------------
       LINKEDIN
    ----------------------------------------- */

    if (
        /linkedin\.com/i.test(referrer)
    ) {

        return "LinkedIn";

    }


    /* -----------------------------------------
       YOUTUBE
    ----------------------------------------- */

    if (
        /youtube\.com/i.test(referrer) ||
        /youtu\.be/i.test(referrer)
    ) {

        return "YouTube";

    }


    /* -----------------------------------------
       X / TWITTER
    ----------------------------------------- */

    if (
        /twitter\.com/i.test(referrer) ||
        /x\.com/i.test(referrer)
    ) {

        return "X";

    }


    /* -----------------------------------------
       OTHER REFERRAL
    ----------------------------------------- */

    return "Referral";

}


/* =========================================================
   GET URL PARAMETER
========================================================= */

function getUrlParameter(
    parameter
) {

    const params =
        new URLSearchParams(
            window.location.search
        );


    return (
        params.get(parameter) || null
    );

}


/* =========================================================
   VISITOR DATA
========================================================= */

function createVisitorPayload() {

    const visitorId =
        getVisitorId();


    const sessionId =
        getSessionId();


    const referrer =
        document.referrer || null;


    const trafficSource =
        getTrafficSource();


    const payload = {

        visitor_id:
            visitorId,

        session_id:
            sessionId,

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
            referrer,

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


    return payload;

}


/* =========================================================
   SAVE VISITOR TO SUPABASE
========================================================= */

async function trackVisitor() {

    try {

        const visitorPayload =
            createVisitorPayload();


        console.log(
            "09ZERO Visitor Tracking:",
            visitorPayload
        );


        const response =
            await fetch(
                `${SUPABASE_URL}/rest/v1/visitors`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "apikey":
                            SUPABASE_ANON_KEY,

                        "Authorization":
                            `Bearer ${SUPABASE_ANON_KEY}`,

                        "Prefer":
                            "return=minimal"

                    },

                    body:
                        JSON.stringify(
                            visitorPayload
                        )

                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "Visitor tracking failed:",
                response.status,
                errorText
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


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* =============================================
               GET FORM FIELDS
            ============================================= */

            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    ?.value
                    .trim() || "";


            const email =
                document
                    .getElementById(
                        "contactEmail"
                    )
                    ?.value
                    .trim() || "";


            const phone =
                document
                    .getElementById(
                        "contactPhone"
                    )
                    ?.value
                    .trim() || "";


            const service =
                document
                    .getElementById(
                        "contactService"
                    )
                    ?.value
                    .trim() || "";


            const message =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    ?.value
                    .trim() || "";


            /* =============================================
               STATUS
            ============================================= */

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
    JSON.stringify(payload, null, 2)
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
               INSERT LEAD
            ============================================= */

            try {

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
                                JSON.stringify(
                                    payload
                                )

                        }
                    );


                const responseText =
                    await response.text();


                console.log(
                    "SUPABASE LEAD STATUS:",
                    response.status
                );


                console.log(
                    "SUPABASE LEAD RESPONSE:",
                    responseText
                );


                /* =====================================
                   ERROR
                ===================================== */

                if (!response.ok) {

                    throw new Error(
                        responseText ||
                        "Unable to save lead."
                    );

                }


                /* =====================================
                   SUCCESS
                ===================================== */

                console.log(
                    "LEAD SAVED SUCCESSFULLY"
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
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

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
           CONTACT FORM
        ============================================= */

        initializeContactForm();


        /* =============================================
           VISITOR TRACKING
        ============================================= */

        trackVisitor();


        console.log(
            "09ZERO WEBSITE READY"
        );

    }
);

