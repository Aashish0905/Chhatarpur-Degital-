/* =========================================================
   09ZERO WEBSITE - SCRIPT.JS
========================================================= */

console.log("09ZERO JS LOADED");


/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
    "https://cgobnlyjyfjbjzcepuyp.supabase.co";

const SUPABASE_ANON_KEY =
    "YOUR_EXISTING_SUPABASE_ANON_KEY";


/* =========================================================
   CHECK SUPABASE KEY
========================================================= */

try {

    const jwtPayload = JSON.parse(
        atob(
            SUPABASE_ANON_KEY.split(".")[1]
        )
    );

    console.log(
        "SUPABASE KEY ROLE:",
        jwtPayload.role
    );

} catch (error) {

    console.error(
        "SUPABASE KEY CHECK ERROR:",
        error
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "09ZERO website loaded successfully."
        );


        /* =================================================
           CONTACT FORM
        ================================================= */

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


        /* =================================================
           FORM SUBMIT
        ================================================= */

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* =========================================
                   GET VALUES
                ========================================= */

                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim() || "";

                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim() || "";

                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim() || "";

                const service =
                    document
                        .getElementById("service")
                        ?.value
                        .trim() || "";

                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim() || "";


                /* =========================================
                   VALIDATION
                ========================================= */

                if (!name) {

                    alert(
                        "Please enter your name."
                    );

                    return;
                }


                if (!phone) {

                    alert(
                        "Please enter your phone number."
                    );

                    return;
                }


                if (!service) {

                    alert(
                        "Please select a service."
                    );

                    return;
                }


                if (!message) {

                    alert(
                        "Please enter your message."
                    );

                    return;
                }


                /* =========================================
                   LEAD DATA
                ========================================= */

                const payload = {

                    name: name,

                    email:
                        email || null,

                    phone: phone,

                    service: service,

                    message: message,

                    source: "website",

                    status: "new"

                };


                /* =========================================
                   DEBUG
                ========================================= */

                console.log(
                    "================================="
                );

                console.log(
                    "09ZERO LEAD INSERT TEST"
                );

                console.log(
                    "SUPABASE URL:",
                    SUPABASE_URL
                );

                try {

                    const jwtPayload =
                        JSON.parse(
                            atob(
                                SUPABASE_ANON_KEY
                                    .split(".")[1]
                            )
                        );

                    console.log(
                        "SUPABASE ROLE:",
                        jwtPayload.role
                    );

                } catch (error) {

                    console.error(
                        "JWT ERROR:",
                        error
                    );

                }

                console.log(
                    "LEAD PAYLOAD:",
                    payload
                );


                /* =========================================
                   BUTTON
                ========================================= */

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.dataset.oldText =
                        submitButton.innerText;

                    submitButton.innerText =
                        "Sending...";

                }


                /* =========================================
                   SUPABASE INSERT
                ========================================= */

                try {

                    const response =
                        await fetch(
                            `${SUPABASE_URL}/rest/v1/leads`,
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
                                        "return=representation"

                                },

                                body:
                                    JSON.stringify(
                                        payload
                                    )

                            }
                        );


                    /* =====================================
                       READ RESPONSE
                    ===================================== */

                    const responseText =
                        await response.text();


                    console.log(
                        "SUPABASE STATUS:",
                        response.status
                    );

                    console.log(
                        "SUPABASE RESPONSE:",
                        responseText
                    );


                    /* =====================================
                       ERROR
                    ===================================== */

                    if (!response.ok) {

                        console.error(
                            "Supabase Lead Error:",
                            responseText
                        );

                        throw new Error(
                            responseText
                        );

                    }


                    /* =====================================
                       SUCCESS
                    ===================================== */

                    console.log(
                        "LEAD SAVED SUCCESSFULLY"
                    );


                    alert(
                        "Thank you! Your enquiry has been submitted successfully."
                    );


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    alert(
                        "Something went wrong. Please try again."
                    );

                } finally {


                    /* =====================================
                       RESTORE BUTTON
                    ===================================== */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerText =
                            submitButton.dataset.oldText ||
                            "Send Message";

                    }

                }

            }
        );

    }
);
