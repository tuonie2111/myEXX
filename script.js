// ==================================================
// HERO VIDEO FADE LOOP
// ==================================================

const heroVideo = document.getElementById("heroVideo");

let fadingOut = false;


// Hàm animate opacity bằng requestAnimationFrame
function animateOpacity(element, targetOpacity, duration) {

    const startOpacity =
        parseFloat(element.style.opacity || getComputedStyle(element).opacity);

    const startTime = performance.now();


    function animate(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const opacity =
            startOpacity +
            (targetOpacity - startOpacity) * progress;


        element.style.opacity = opacity;


        if (progress < 1) {

            requestAnimationFrame(animate);

        }

    }


    requestAnimationFrame(animate);
}


// Khi video sẵn sàng
heroVideo.addEventListener("canplay", function () {

    heroVideo.play().catch(function () {

        console.log("Autoplay was prevented.");

    });


    animateOpacity(
        heroVideo,
        1,
        500
    );

});


// Gần cuối video thì fade out
heroVideo.addEventListener("timeupdate", function () {

    if (!heroVideo.duration) {
        return;
    }


    const remaining =
        heroVideo.duration - heroVideo.currentTime;


    if (remaining <= 0.55 && !fadingOut) {

        fadingOut = true;

        animateOpacity(
            heroVideo,
            0,
            500
        );

    }

});


// Video kết thúc
heroVideo.addEventListener("ended", function () {

    heroVideo.style.opacity = "0";


    setTimeout(function () {

        heroVideo.currentTime = 0;

        fadingOut = false;


        heroVideo.play()
            .then(function () {

                animateOpacity(
                    heroVideo,
                    1,
                    500
                );

            })
            .catch(function () {

                console.log("Video could not restart.");

            });

    }, 100);

});


// ==================================================
// MOBILE MENU
// ==================================================

const menuButton =
    document.getElementById("menuButton");

const navLinks =
    document.getElementById("navLinks");


menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


const navItems =
    document.querySelectorAll(".nav-links a");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// ==================================================
// SCROLL REVEAL
// ==================================================

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -80px 0px"
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


// ==================================================
// STAGGER PROJECT / SKILL ANIMATION
// ==================================================

const skillCards =
    document.querySelectorAll(".skill");


skillCards.forEach(function (card, index) {

    card.style.transitionDelay =
        index * 100 + "ms";

});


const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(function (card, index) {

    card.style.transitionDelay =
        index * 150 + "ms";

});


// ==================================================
// BACK TO TOP
// ==================================================

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", function () {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ==================================================
// CURRENT YEAR
// ==================================================

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();


// ==================================================
// PAUSE OFF-SCREEN VIDEOS
// Helps reduce CPU usage
// ==================================================

const videos =
    document.querySelectorAll(
        "video:not(#heroVideo)"
    );


const videoObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                const video =
                    entry.target;


                if (entry.isIntersecting) {

                    video.play().catch(function () {

                        // Autoplay may be blocked
                    });

                } else {

                    video.pause();

                }

            });

        },

        {
            threshold: 0.15
        }

    );


videos.forEach(function (video) {

    videoObserver.observe(video);

});