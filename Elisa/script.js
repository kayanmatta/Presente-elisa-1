document.addEventListener("DOMContentLoaded", function () {
    // Função para atualizar o contador
    function updateCountdown() {
        const startDate = new Date("2024-03-07T00:00:00").getTime(); // Ajustado para 07 de Março de 2024
        const now = new Date().getTime();
        const distance = now - startDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Animação de entrada para título
    Velocity(document.getElementById("title"), { opacity: 0, translateY: -30 }, { duration: 0 });
    Velocity(document.getElementById("title"), { opacity: 1, translateY: 0 }, { duration: 1000, easing: "easeOut" });

    // Animação da data especial
    const specialDate = document.getElementById("special-date");
    Velocity(specialDate, { opacity: 0, translateY: -20 }, { duration: 0 });
    Velocity(specialDate, { opacity: 1, translateY: 0 }, { duration: 1000, delay: 500, easing: "easeOut" });

    // Animação das imagens da galeria
    const galleryImages = document.querySelectorAll(".image-wrapper");
    galleryImages.forEach((wrapper, index) => {
        Velocity(wrapper, { opacity: 0, scale: 0.7, rotateZ: "-15deg" }, { duration: 0 });
        Velocity(wrapper, { opacity: 1, scale: 1, rotateZ: "0deg" }, { duration: 1200, delay: index * 500, easing: "easeOutBounce" });
    });

    // Animação da nota de amor
    const note = document.getElementById("note");
    Velocity(note, { opacity: 0, translateY: 20 }, { duration: 0 });
    Velocity(note, { opacity: 1, translateY: 0 }, { duration: 1500, delay: 1000, easing: "easeInOut" });

    // Animação dos 100 motivos
    const reasons = document.querySelectorAll(".reasons-list li");
    reasons.forEach((reason, index) => {
        Velocity(reason, { opacity: 0, translateY: 20 }, { duration: 0 });
        Velocity(reason, { opacity: 1, translateY: 0 }, { duration: 800, delay: index * 50, easing: "easeOut" });
    });

    // Função para criar corações flutuantes
    function createHeart() {
        const heartContainer = document.getElementById("heart-container");
        if (heartContainer.children.length < 20) { // Limite de 20 corações simultâneos
            const heart = document.createElement("div");
            heart.classList.add("heart");

            const size = Math.random() * 15 + 10;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;

            heartContainer.appendChild(heart);

            const duration = Math.random() * 3 + 3;
            heart.style.animationDuration = `${duration}s`;

            setTimeout(() => heart.remove(), duration * 1000);
        }
    }

    const heartInterval = 300;
    setInterval(createHeart, heartInterval);

    function adjustHeartFrequency() {
        const width = window.innerWidth;
        if (width < 576) {
            heartInterval = 500; // Menos corações em telas pequenas
        } else {
            heartInterval = 300; // Mais corações em telas maiores
        }
    }

    window.addEventListener("resize", adjustHeartFrequency);
    adjustHeartFrequency();
});