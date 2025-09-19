document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const letterContainer = document.getElementById('letterContainer');
    const letterClosed = document.getElementById('letterClosed');
    const letterOpened = document.getElementById('letterOpened');
    const enterButton = document.getElementById('enterButton');
    const heartsContainer = document.getElementById('welcome-hearts-container');
    const particlesContainer = document.getElementById('particlesContainer');
    
    let isLetterOpened = false;

    // Create floating hearts background
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Random size
        const size = Math.random() * 8 + 8;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Random position
        heart.style.left = `${Math.random() * 100}vw`;
        
        // Random animation duration
        const duration = Math.random() * 3 + 4;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, duration * 1000);
    }

    // Create particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position and properties
        particle.style.left = `${Math.random() * 100}vw`;
        const duration = Math.random() * 2 + 3;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + 2) * 1000);
    }

    // Letter opening animation
    function openLetter() {
        if (isLetterOpened) return;
        
        isLetterOpened = true;
        
        // Hide closed letter with animation
        Velocity(letterClosed, {
            opacity: 0,
            scale: 0.8,
            rotateY: '15deg'
        }, {
            duration: 500,
            easing: 'easeInOut',
            complete: function() {
                letterClosed.style.display = 'none';
                
                // Show opened letter
                letterOpened.style.display = 'block';
                letterOpened.classList.add('show');
                
                // Create extra hearts on opening
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => createFloatingHeart(), i * 100);
                }
            }
        });
    }

    // Page transition to main page
    function navigateToMainPage() {
        // Create transition overlay
        const transition = document.createElement('div');
        transition.classList.add('page-transition');
        document.body.appendChild(transition);
        
        // Animate transition
        setTimeout(() => {
            transition.classList.add('active');
        }, 50);
        
        // Navigate after animation
        setTimeout(() => {
            window.location.href = 'index_atualizado.html';
        }, 1000);
    }

    // Event listeners
    letterClosed.addEventListener('click', openLetter);
    enterButton.addEventListener('click', navigateToMainPage);

    // Keyboard accessibility
    letterClosed.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLetter();
        }
    });

    enterButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToMainPage();
        }
    });

    // Add tabindex for accessibility
    letterClosed.setAttribute('tabindex', '0');
    letterClosed.setAttribute('role', 'button');
    letterClosed.setAttribute('aria-label', 'Clique para abrir a carta');

    // Background animations
    function startBackgroundAnimations() {
        // Create hearts periodically
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance
                createFloatingHeart();
            }
        }, 800);

        // Create particles periodically
        setInterval(() => {
            if (Math.random() < 0.4) { // 40% chance
                createParticle();
            }
        }, 1200);
    }

    // Initialize animations after page load
    setTimeout(startBackgroundAnimations, 2000);

    // Performance optimization - pause animations when page is hidden
    document.addEventListener('visibilitychange', function() {
        const hearts = document.querySelectorAll('.floating-heart');
        const particles = document.querySelectorAll('.particle');
        
        if (document.hidden) {
            // Pause animations
            hearts.forEach(heart => heart.style.animationPlayState = 'paused');
            particles.forEach(particle => particle.style.animationPlayState = 'paused');
        } else {
            // Resume animations
            hearts.forEach(heart => heart.style.animationPlayState = 'running');
            particles.forEach(particle => particle.style.animationPlayState = 'running');
        }
    });

    // Add hover effect sounds (visual feedback)
    letterClosed.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });

    letterClosed.addEventListener('mouseleave', function() {
        if (!isLetterOpened) {
            this.style.transform = 'scale(1) translateY(0)';
        }
    });

    // Enhanced button interaction
    enterButton.addEventListener('mouseenter', function() {
        // Create small hearts around button
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const miniHeart = document.createElement('div');
                miniHeart.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background-color: #ff004f;
                    clip-path: polygon(50% 0%, 100% 35%, 80% 100%, 50% 80%, 20% 100%, 0% 35%);
                    pointer-events: none;
                    z-index: 100;
                `;
                
                const rect = this.getBoundingClientRect();
                miniHeart.style.left = `${rect.left + Math.random() * rect.width}px`;
                miniHeart.style.top = `${rect.top + Math.random() * rect.height}px`;
                
                document.body.appendChild(miniHeart);
                
                // Animate mini heart
                Velocity(miniHeart, {
                    translateY: '-30px',
                    opacity: 0,
                    scale: 1.5
                }, {
                    duration: 800,
                    easing: 'easeOut',
                    complete: () => miniHeart.remove()
                });
            }, i * 150);
        }
    });

    // Preload main page for faster transition
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'index_atualizado.html';
    document.head.appendChild(link);

    console.log('Welcome page loaded and ready! 💕');
});