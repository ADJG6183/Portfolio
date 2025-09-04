// Custom cursor implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.classList.add('custom-cursor');
    cursorFollower.classList.add('cursor-follower');
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Variables for cursor positions
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Set the cursor position immediately
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });
    
    // Smooth animation for follower
    function animate() {
        // Calculate distance to move
        let dx = cursorX - followerX;
        let dy = cursorY - followerY;
        
        // Ease the movement (0.1 controls the smoothness)
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        
        // Apply the position
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        // Continue the animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle cursor states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .nav-link, .logo, .social-link, .skill-item, .competency');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('follower-active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('follower-active');
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the height of the navbar for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                this.classList.add('active');
            }
        });
    });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Check if there's a saved theme or user prefers dark mode
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Scroll animations for sections and elements
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for hero title
    const typewriterElement = document.getElementById('typewriter');
    const textToType = "Machine Learning Engineer";
    let i = 0;
    let isDeleting = false;
    let typingSpeed = 150; // milliseconds between each character
    let pauseBeforeDelete = 2000; // pause before starting to delete

    function typeWriter() {
        const currentText = textToType.substring(0, i);
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && i < textToType.length) {
            // Still typing
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else if (!isDeleting && i >= textToType.length) {
            // Finished typing, pause before deleting
            isDeleting = true;
            setTimeout(typeWriter, pauseBeforeDelete);
        } else if (isDeleting && i > 0) {
            // Deleting
            i--;
            setTimeout(typeWriter, typingSpeed / 2);
        } else if (isDeleting && i === 0) {
            // Finished deleting, start typing again
            isDeleting = false;
            setTimeout(typeWriter, typingSpeed * 2);
        }
    }
    
    // Start the typewriter effect
    typeWriter();
    
    // Hero section animations
    const heroAnimElements = document.querySelectorAll('.animate-slide-up');
    
    // Trigger hero animations with delay
    heroAnimElements.forEach((elem, index) => {
        setTimeout(() => {
            elem.classList.add('animated');
        }, 200 + (index * 200)); // Staggered animation
    });
    
    // Section reveal animations
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate children with stagger
                const animatableChildren = entry.target.querySelectorAll('.project-card, .skill-item, .experience-card, .timeline-item, .competency');
                
                if (animatableChildren.length > 0) {
                    animatableChildren.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = "1";
                            child.style.transform = "translateY(0)";
                        }, 200 + (index * 150));
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -150px 0px'
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
        
        // Pre-hide animatable children
        const animatableChildren = section.querySelectorAll('.project-card, .skill-item, .experience-card, .timeline-item, .competency');
        animatableChildren.forEach(child => {
            child.style.opacity = "0";
            child.style.transform = "translateY(30px)";
            child.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        });
    });
    
    // Update active navigation on scroll
    const navLinks = document.querySelectorAll('.nav-link');
    const navSections = [...document.querySelectorAll('section[id]')].reverse(); // Reverse to check from bottom to top
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        // Find the current section
        for (const section of navSections) {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                break;
            }
        }
    }
    
    window.addEventListener('scroll', updateActiveNav);
});

// Enhanced hover effects for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dot = item.querySelector('.timeline-dot');
            const icon = item.querySelector('.timeline-icon');
            
            if (dot) dot.style.transform = 'scale(1.5)';
            if (icon) icon.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const dot = item.querySelector('.timeline-dot');
            const icon = item.querySelector('.timeline-icon');
            
            if (dot) dot.style.transform = '';
            if (icon) icon.style.transform = '';
        });
    });
});
