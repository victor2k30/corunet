document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const mobileBtn = document.getElementById("mobile_btn");
    const mobileMenu = document.getElementById("mobile_menu");
    const navLinks = document.querySelectorAll(".nav-item a");
    const sections = document.querySelectorAll("main section");

    function toggleHeaderShadow() {
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    function setActiveMenu() {
        const headerHeight = header.offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 80;

        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSectionId = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active");
        });

        if (currentSectionId) {
            document.querySelectorAll(`a[href="#${currentSectionId}"]`).forEach((link) => {
                const parent = link.closest(".nav-item");
                if (parent) {
                    parent.classList.add("active");
                }
            });
        }
    }

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");

            const icon = mobileBtn.querySelector("i");
            const isOpen = mobileMenu.classList.contains("active");

            mobileBtn.setAttribute("aria-expanded", String(isOpen));

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (mobileMenu.classList.contains("active")) {
                mobileMenu.classList.remove("active");
                mobileBtn.setAttribute("aria-expanded", "false");

                const icon = mobileBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });

    window.addEventListener("scroll", () => {
        toggleHeaderShadow();
        setActiveMenu();
    });

    toggleHeaderShadow();
    setActiveMenu();

    if (typeof ScrollReveal !== "undefined") {
        const sr = ScrollReveal({
            distance: "40px",
            duration: 1000,
            easing: "ease",
            reset: false
        });

        sr.reveal("#cta", {
            origin: "left",
            interval: 120
        });

        sr.reveal("#banner", {
            origin: "right"
        });

        sr.reveal(".plan-card", {
            origin: "bottom",
            interval: 120
        });

        sr.reveal(".feedback", {
            origin: "bottom",
            interval: 120
        });
    }
});
