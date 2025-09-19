document.addEventListener("DOMContentLoaded", function () {
    // Preloader management
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

    // Lazy loading implementation
    const lazyImages = document.querySelectorAll('.lazy-img');
    const lazyVideos = document.querySelectorAll('.lazy-video');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                    video.play();
                    video.classList.add('loaded');
                }
                observer.unobserve(video);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
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

    // Optimized animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.reasons-list li, .image-wrapper, .love-text');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'transform, opacity';
            } else {
                entry.target.style.willChange = 'auto';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => animationObserver.observe(el));

    // Optimized heart creation with reduced frequency
    let heartCreationInterval;
    let lastHeartCreation = 0;
    const heartCreationDelay = 500; // Reduced frequency
    
    function createHeart() {
        const now = Date.now();
        if (now - lastHeartCreation < heartCreationDelay) return;
        
        const heartContainer = document.getElementById("heart-container");
        if (heartContainer.children.length < 15) { // Reduced max hearts
            const heart = document.createElement("div");
            heart.classList.add("heart");

            const size = Math.random() * 15 + 10;
            const duration = Math.random() * 3 + 3;
            
            heart.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}vw;
                animation-duration: ${duration}s;
            `;

            heartContainer.appendChild(heart);
            lastHeartCreation = now;

            // Use setTimeout instead of relying on animation end
            setTimeout(() => {
                if (heart.parentNode) heart.remove();
            }, duration * 1000);
        }
    }

    // Use requestAnimationFrame for better performance
    function heartAnimationLoop() {
        if (Math.random() < 0.3) { // 30% chance per frame
            createHeart();
        }
        requestAnimationFrame(heartAnimationLoop);
    }
    
    // Start heart animation when page is visible
    if (!document.hidden) {
        heartAnimationLoop();
    }
    
    // Pause/resume hearts based on page visibility
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            heartAnimationLoop();
        }
    });
});