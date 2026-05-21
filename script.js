const countdown = document.querySelector("[data-countdown]");

if (countdown) {
    const targetDate = new Date(countdown.dataset.countdown).getTime();
    const daysElement = countdown.querySelector("[data-days]");
    const hoursElement = countdown.querySelector("[data-hours]");
    const minutesElement = countdown.querySelector("[data-minutes]");
    const secondsElement = countdown.querySelector("[data-seconds]");

    const formatNumber = (value) => String(value).padStart(2, "0");
    let countdownTimer;

    const updateCountdown = () => {
        const now = Date.now();
        const distance = Math.max(targetDate - now, 0);

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysElement.textContent = formatNumber(days);
        hoursElement.textContent = formatNumber(hours);
        minutesElement.textContent = formatNumber(minutes);
        secondsElement.textContent = formatNumber(seconds);

        if (distance === 0) {
            clearInterval(countdownTimer);
        }
    };

    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    let activeIndex = 0;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle("is-active", slideIndex === activeIndex);
        });
    };

    previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
    nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
}

const musicToggle = document.querySelector("[data-music-toggle]");
const musicAudio = document.querySelector("[data-music-audio]");

if (musicToggle && musicAudio) {
    const updateMusicButton = () => {
        const isPlaying = !musicAudio.paused;
        musicToggle.classList.toggle("is-playing", isPlaying);
        musicToggle.setAttribute("aria-label", isPlaying ? "Pausar musica" : "Reproducir musica");
    };

    musicToggle.addEventListener("click", async () => {
        try {
            if (musicAudio.paused) {
                await musicAudio.play();
            } else {
                musicAudio.pause();
            }
        } catch (error) {
            musicToggle.classList.remove("is-playing");
        }

        updateMusicButton();
    });

    musicAudio.addEventListener("play", updateMusicButton);
    musicAudio.addEventListener("pause", updateMusicButton);
    musicAudio.addEventListener("ended", updateMusicButton);
}
