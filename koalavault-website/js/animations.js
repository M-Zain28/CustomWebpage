// ===== ADDITIONAL ANIMATIONS FOR KOALAVAULT ===== //

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initInteractiveElements();
    initPageTransitions();
});

// ===== ADVANCED ANIMATIONS ===== //
function initAdvancedAnimations() {
    // Staggered animations for card grids
    const cardGrids = document.querySelectorAll('.features-grid, .opportunities-slider, .testimonials-slider');
    
    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.feature-card, .opportunity-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    });
    
    // Floating animation for icons
    initFloatingIcons();
    
    // Typing effect for hero titles
    initTypingEffect();
    
    // Magnetic cursor effect for buttons
    initMagneticButtons();
}

// ===== FLOATING ICONS ===== //
function initFloatingIcons() {
    const icons = document.querySelectorAll('.feature-icon, .stat-icon, .step-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
    
    // Add floating keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// ===== TYPING EFFECT ===== //
function initTypingEffect() {
    const typewriterElements = document.querySelectorAll('.hero-title');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary-gold)';
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    });
}

// ===== MAGNETIC BUTTONS ===== //
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== INTERACTIVE ELEMENTS ===== //
function initInteractiveElements() {
    // Parallax scroll effect for sections
    initParallaxSections();
    
    // Reveal text animation
    initTextReveal();
    
    // Interactive counters with easing
    initAdvancedCounters();
    
    // Card tilt effect
    initCardTilt();
}

// ===== PARALLAX SECTIONS ===== //
function initParallaxSections() {
    const parallaxElements = document.querySelectorAll('.stats-section, .features-section, .opportunities-section');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);
            
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }, 16));
}

// ===== TEXT REVEAL ANIMATION ===== //
function initTextReveal() {
    const textElements = document.querySelectorAll('.section-header h2, .section-header p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                element.innerHTML = '';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.opacity = '0';
                    span.style.transform = 'translateY(20px)';
                    span.style.transition = `opacity 0.5s ease ${index * 0.02}s, transform 0.5s ease ${index * 0.02}s`;
                    element.appendChild(span);
                    
                    setTimeout(() => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== ADVANCED COUNTERS ===== //
function initAdvancedCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounterAdvanced(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.8
        });
        
        observer.observe(counter);
    });
}

function animateCounterAdvanced(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2500;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Bounce easing
        const easeOutBounce = (t) => {
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
            } else if (t < 2 / 2.75) {
                return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            } else if (t < 2.5 / 2.75) {
                return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
            } else {
                return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }
        };
        
        const current = Math.floor(target * easeOutBounce(progress));
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== CARD TILT EFFECT ===== //
function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card, .opportunity-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ===== PAGE TRANSITIONS ===== //
function initPageTransitions() {
    // Smooth page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });
    
    // Link click animations
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="how-it-works.html"], a[href^="enter-to-win.html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS ===== //
function initScrollAnimations() {
    // Progress bar for page scroll
    createScrollProgressBar();
    
    // Section reveal animations
    initSectionReveals();
    
    // Background parallax for hero
    initHeroParallax();
}

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-gold), var(--light-gold));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 16));
}

function initSectionReveals() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

function initHeroParallax() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const rate = scrollTop * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }, 16));
}

// ===== UTILITY FUNCTIONS ===== //
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize scroll animations
initScrollAnimations();

// ===== EASTER EGG ===== //
// Konami code for fun interaction
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        triggerSpecialAnimation();
        konamiCode = [];
    }
});

function triggerSpecialAnimation() {
    // Create golden particles explosion
    for (let i = 0; i < 50; i++) {
        createGoldenParticle();
    }
    
    // Flash the screen gold
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--primary-gold);
        opacity: 0.8;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.style.transition = 'opacity 0.5s ease';
        flash.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 500);
    }, 100);
}

function createGoldenParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-gold);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 10}px;
        animation: particleFloat 3s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);