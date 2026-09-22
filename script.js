/* =========================================================
   09ZERO - SCRIPT.JS
========================================================= */

console.log("09ZERO JS LOADED");

const SUPABASE_URL =
    "https://cgobnlyjyfjbjzcepuyp.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_BrvR9X1cfClkFW0t4Zqpzw_OvYGtSbt";

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "09ZERO website loaded successfully."
        );

        // Your contact form code continues here...

    }
);




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
                   GET FORM FIELDS
                ========================================= */

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


                /* =========================================
                   STATUS ELEMENT
                ========================================= */

                const formStatus =
                    document.getElementById(
                        "contactFormStatus"
                    );


                /* =========================================
                   VALIDATION
                ========================================= */

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


                /* =========================================
                   SUPABASE LEAD DATA
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
                   DEBUG LOG
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

                console.log(
                    "LEAD PAYLOAD:",
                    payload
                );


                /* =========================================
                   SUBMIT BUTTON
                ========================================= */

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


                /* =========================================
                   INSERT LEAD INTO SUPABASE
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
                       READ SUPABASE RESPONSE
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
                       CHECK ERROR
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


                    if (formStatus) {

                        formStatus.textContent =
                            "Your enquiry has been submitted successfully.";

                    }


                    alert(
                        "Thank you! Your enquiry has been submitted successfully."
                    );


                    /* Clear form */

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


                /* =========================================
                   RESTORE BUTTON
                ========================================= */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonHTML;

                }

            }
        );

    }
);
