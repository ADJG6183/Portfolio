// Three.js Scene Setup
let scene, camera, renderer, particles, animationId;
let mouseX = 0, mouseY = 0;
let cubes = [];
let spheres = [];

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
}

// Initialize Three.js Scene
function initThreeJS() {
    const container = document.getElementById('three-container');
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create Particles
    createParticles();
    
    // Create Floating Cubes
    createFloatingCubes();
    
    // Create Floating Spheres
    createFloatingSpheres();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for dynamic lighting
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.3, 8);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);
    
    // Mouse movement
    document.addEventListener('mousemove', onMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

// Create Particle System
function createParticles() {
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position
        positions[i] = (Math.random() - 0.5) * 30;
        positions[i + 1] = (Math.random() - 0.5) * 30;
        positions[i + 2] = (Math.random() - 0.5) * 30;
        
        // Color - monochromatic white/grey
        const intensity = Math.random() * 0.5 + 0.5;
        colors[i] = intensity;
        colors[i + 1] = intensity;
        colors[i + 2] = intensity;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// Create Floating Cubes
function createFloatingCubes() {
    for (let i = 0; i < 8; i++) {
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            wireframe: true
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        
        cube.userData = {
            originalY: cube.position.y,
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02 + 0.01
        };
        
        cubes.push(cube);
        scene.add(cube);
    }
}

// Create Floating Spheres
function createFloatingSpheres() {
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
        );
        
        sphere.userData = {
            originalY: sphere.position.y,
            speed: Math.random() * 0.015 + 0.005,
            rotationSpeed: Math.random() * 0.01 + 0.005
        };
        
        spheres.push(sphere);
        scene.add(sphere);
    }
}

// Mouse Move Handler
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        
        // Mouse interaction
        particles.rotation.x += mouseY * 0.0002;
        particles.rotation.y += mouseX * 0.0002;
    }
    
    // Animate floating cubes
    cubes.forEach(cube => {
        cube.position.y = cube.userData.originalY + Math.sin(Date.now() * cube.userData.speed) * 2;
        cube.rotation.x += cube.userData.rotationSpeed;
        cube.rotation.y += cube.userData.rotationSpeed;
        
        // Mouse interaction
        cube.position.x += mouseX * 0.001;
        cube.position.z += mouseY * 0.001;
    });
    
    // Animate floating spheres
    spheres.forEach(sphere => {
        sphere.position.y = sphere.userData.originalY + Math.sin(Date.now() * sphere.userData.speed) * 1.5;
        sphere.rotation.x += sphere.userData.rotationSpeed;
        sphere.rotation.y += sphere.userData.rotationSpeed;
        
        // Mouse interaction
        sphere.position.x += mouseX * 0.0005;
        sphere.position.z += mouseY * 0.0005;
    });
    
    renderer.render(scene, camera);
}

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Interactive Skill Animations
function initSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.skill-icon');
            const progress = item.querySelector('.skill-progress');
            
            // Animate icon
            gsap.to(icon, {
                scale: 1.2,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animate progress bar
            const width = progress.style.width;
            progress.style.width = '0%';
            
            gsap.to(progress, {
                width: width,
                duration: 1,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.skill-icon');
            
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: "power2.out",
                delay: index * 0.1
            });
        }, 500);
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Navbar background on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.borderBottom = '1px solid #ffffff';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottom = '1px solid #333333';
    }
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start loading screen
    initLoadingScreen();
    
    // Initialize Three.js after loading
    setTimeout(() => {
        initThreeJS();
    }, 1000);
    
    // Initialize skill interactions
    initSkillInteractions();
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        parallaxEffect();
        handleNavbarScroll();
    });
    
    // Animate skill bars when skills section is visible
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add section entrance animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target, 
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
                );
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cleanup function for Three.js
function cleanup() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    if (renderer) {
        renderer.dispose();
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup); 