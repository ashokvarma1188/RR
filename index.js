// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all components
    initNavbar();
    initHeroVideo();
    initAnimatedLogo();
    initSpiritOfEcstasy();
    initRotatingLogo();
    initVideoShowcases();
    initModels();
    initGallery();
    initHeritage();
    initTestimonials();
    initContactForm();
    initScrollToTop();
    initScrollReveal();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('[data-lucide="sun"]');
    const moonIcon = themeToggle.querySelector('[data-lucide="moon"]');
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hero video playback rate
function initHeroVideo() {
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.playbackRate = 0.7;
    }
    
    // Scroll down button
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const modelsSection = document.getElementById('models');
            if (modelsSection) {
                modelsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Animated Logo Canvas
function initAnimatedLogo() {
    const canvas = document.getElementById('animatedLogo');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 200 * dpr;
    canvas.height = 200 * dpr;

    // Scale context according to device pixel ratio
    ctx.scale(dpr, dpr);

    // Set canvas CSS dimensions
    canvas.style.width = "200px";
    canvas.style.height = "200px";

    // Colors
    const goldColor = "#c4a47c";
    const goldGradient = ctx.createLinearGradient(0, 0, 200, 200);
    goldGradient.addColorStop(0, "#d7be9f");
    goldGradient.addColorStop(1, "#a88a67");

    // Animation variables
    let rotation = 0;
    let scale = 0;
    let fadeIn = 0;

    // Load RR logo image
    const rrLogo = new Image();
    rrLogo.crossOrigin = "anonymous";
    rrLogo.src = "images/rr-logo.png";

    // Draw function
    const draw = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Center point
        const centerX = 100;
        const centerY = 100;

        // Save context state
        ctx.save();
        ctx.translate(centerX, centerY);

        // Animate scale and rotation
        if (scale < 1) scale += 0.01;
        if (fadeIn < 1) fadeIn += 0.01;
        rotation += 0.005;

        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.globalAlpha = fadeIn;

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        ctx.strokeStyle = goldGradient;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw RR logo if image is loaded
        if (rrLogo.complete) {
            ctx.drawImage(rrLogo, -60, -60, 120, 120);
        } else {
            // Draw placeholder RR text if image not loaded
            ctx.font = "bold 60px Playfair Display, serif";
            ctx.fillStyle = goldColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("RR", 0, 0);
        }

        // Draw Spirit of Ecstasy silhouette
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.bezierCurveTo(10, -50, 15, -40, 10, -30);
        ctx.bezierCurveTo(20, -20, 15, -10, 0, 0);
        ctx.bezierCurveTo(-15, -10, -20, -20, -10, -30);
        ctx.bezierCurveTo(-15, -40, -10, -50, 0, -60);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fill();

        // Draw animated particles
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + rotation * 3;
            const x = Math.cos(angle) * (85 + Math.sin(rotation * 10 + i) * 5);
            const y = Math.sin(angle) * (85 + Math.sin(rotation * 10 + i) * 5);

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = goldColor;
            ctx.fill();
        }

        // Restore context state
        ctx.restore();

        // Continue animation
        requestAnimationFrame(draw);
    };

    // Start animation
    draw();
}

// Spirit of Ecstasy Animation
function initSpiritOfEcstasy() {
    const container = document.getElementById('spiritContainer');
    if (!container) return;

    // Create the emblem elements
    const emblem = document.createElement("div");
    emblem.className = "spirit-emblem";

    const figure = document.createElement("div");
    figure.className = "spirit-figure";

    const base = document.createElement("div");
    base.className = "spirit-base";

    const glow = document.createElement("div");
    glow.className = "spirit-glow";

    // Append elements
    emblem.appendChild(figure);
    emblem.appendChild(base);
    emblem.appendChild(glow);
    container.appendChild(emblem);

    // Animation
    let rotation = 0;
    let hover = 0;

    const animate = () => {
        rotation += 0.2;
        hover = Math.sin(rotation / 20) * 5;

        emblem.style.transform = `rotateY(${rotation}deg)`;
        figure.style.transform = `translateY(${hover}px)`;
        glow.style.opacity = `${0.5 + Math.sin(rotation / 30) * 0.3}`;

        requestAnimationFrame(animate);
    };

    animate();
}

// 3D Rotating RR Logo
function initRotatingLogo() {
    const container = document.getElementById('rotatingLogoContainer');
    if (!container) return;

    // Create 3D logo container
    const logo3D = document.createElement("div");
    logo3D.className = "rr-3d-logo";

    // Create faces
    const faces = ["RR", "RR"];

    faces.forEach((text, index) => {
        const face = document.createElement("div");
        face.className = "rr-3d-face";
        face.textContent = text;
        face.style.transform = `rotateY(${index * 180}deg) translateZ(100px)`;
        logo3D.appendChild(face);
    });

    container.appendChild(logo3D);
}

// Video Showcases
function initVideoShowcases() {
    const videoShowcases = document.querySelectorAll('.video-showcase');
    
    videoShowcases.forEach(showcase => {
        const video = showcase.querySelector('video');
        const playPauseBtn = showcase.querySelector('.play-pause-btn');
        const muteBtn = showcase.querySelector('.mute-btn');
        
        if (!video || !playPauseBtn || !muteBtn) return;
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i data-lucide="pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i data-lucide="play"></i>';
            }
            lucide.createIcons();
        });
        
        // Mute/Unmute functionality
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.innerHTML = '<i data-lucide="volume-x"></i>';
            } else {
                muteBtn.innerHTML = '<i data-lucide="volume-2"></i>';
            }
            lucide.createIcons();
        });
        
        // Handle video end
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    });
}

// Car Models functionality
function initModels() {
    // Car models data
    const carModels = [
        {
            id: "phantom",
            name: "Phantom",
            price: "$460,000",
            image: "images/phantom.jpg",
            description: "The pinnacle of luxury, Phantom is the signature Rolls-Royce. A world of unmatched excellence and sophistication.",
            specs: {
                engine: "6.75L V12 Twin-Turbo",
                power: "563 hp / 664 lb-ft",
                acceleration: "0-60 mph: 5.1s",
                topSpeed: "155 mph (limited)",
                transmission: "8-Speed Automatic",
                drivetrain: "Rear-Wheel Drive"
            },
            features: [
                "Starlight Headliner",
                "Bespoke Audio System",
                "Whisper-Quiet Cabin",
                "Rear Theater Configuration",
                "Champagne Cooler"
            ]
        },
        {
            id: "cullinan",
            name: "Cullinan",
            price: "$335,000",
            image: "images/cullinan.jpg",
            description: "The first all-terrain SUV from Rolls-Royce makes luxury off-road travel a reality for the first time.",
            specs: {
                engine: "6.75L V12 Twin-Turbo",
                power: "563 hp / 627 lb-ft",
                acceleration: "0-60 mph: 5.0s",
                topSpeed: "155 mph (limited)",
                transmission: "8-Speed Automatic",
                drivetrain: "All-Wheel Drive"
            },
            features: [
                "All-Terrain Capability",
                "Viewing Suite",
                "Recreation Module",
                "Bespoke Luggage Compartment",
                "Panoramic Glass Roof"
            ]
        },
        {
            id: "ghost",
            name: "Ghost",
            price: "$332,500",
            image: "images/ghost.jpg",
            description: "The purest expression of Rolls-Royce yet. Ghost is the most technologically advanced Rolls-Royce ever created.",
            specs: {
                engine: "6.75L V12 Twin-Turbo",
                power: "563 hp / 627 lb-ft",
                acceleration: "0-60 mph: 4.8s",
                topSpeed: "155 mph (limited)",
                transmission: "8-Speed Automatic",
                drivetrain: "All-Wheel Drive"
            },
            features: [
                "Planar Suspension System",
                "Illuminated Fascia",
                "Micro-Environment Purification System",
                "Bespoke Audio",
                "Rear-Wheel Steering"
            ]
        },
        {
            id: "wraith",
            name: "Wraith",
            price: "$343,000",
            image: "images/wraith.jpg",
            description: "The most powerful and dynamic Rolls-Royce in history. Wraith is a car for the curious, the confident and the bold.",
            specs: {
                engine: "6.6L V12 Twin-Turbo",
                power: "624 hp / 642 lb-ft",
                acceleration: "0-60 mph: 4.4s",
                topSpeed: "155 mph (limited)",
                transmission: "8-Speed Automatic",
                drivetrain: "Rear-Wheel Drive"
            },
            features: [
                "Fastback Silhouette",
                "Coach Doors",
                "Starlight Headliner",
                "Satellite Aided Transmission",
                "Head-Up Display"
            ]
        },
        {
            id: "spectre",
            name: "Spectre",
            price: "$420,000",
            image: "images/spectre.jpg",
            description: "The first fully-electric Rolls-Royce, representing a bold new era of electrified luxury.",
            specs: {
                engine: "Dual Electric Motors",
                power: "577 hp / 664 lb-ft",
                acceleration: "0-60 mph: 4.4s",
                topSpeed: "155 mph (limited)",
                transmission: "Single-Speed",
                drivetrain: "All-Wheel Drive"
            },
            features: [
                "400+ Mile Range",
                "Ultra-Quiet Electric Powertrain",
                "Planar Suspension System",
                "Digital Architecture",
                "Illuminated Grille"
            ]
        }
    ];
    
    let currentModelIndex = 0;
    
    // Model navigation
    const prevModelBtn = document.querySelector('.prev-model');
    const nextModelBtn = document.querySelector('.next-model');
    const modelImages = document.querySelectorAll('.model-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!prevModelBtn || !nextModelBtn || !modelImages.length || !thumbnails.length) return;
    
    // Update model display
    function updateModelDisplay(index) {
        const model = carModels[index];
        
        // Update active model image
        modelImages.forEach(img => img.classList.remove('active'));
        document.querySelector(`.model-image[data-model="${model.id}"]`).classList.add('active');
        
        // Update model name and price
        document.getElementById('modelName').textContent = model.name;
        document.getElementById('modelPrice').textContent = model.price;
        
        // Update model details
        document.getElementById('detailModelName').textContent = model.name;
        document.getElementById('modelDescription').textContent = model.description;
        
        // Update specs
        const specsContainer = document.getElementById('modelSpecs');
        specsContainer.innerHTML = '';
        
        Object.entries(model.specs).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            
            const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
            const capitalizedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
            
            specItem.innerHTML = `
                <span class="spec-name">${capitalizedKey}</span>
                <span class="spec-value">${value}</span>
            `;
            
            specsContainer.appendChild(specItem);
        });
        
        // Update features
        const featuresContainer = document.getElementById('modelFeatures');
        featuresContainer.innerHTML = '';
        
        model.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
        
        // Update active thumbnail
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        document.querySelector(`.thumbnail[data-model="${model.id}"]`).classList.add('active');
        
        currentModelIndex = index;
    }
    
    // Previous model button
    prevModelBtn.addEventListener('click', () => {
        const newIndex = currentModelIndex === 0 ? carModels.length - 1 : currentModelIndex - 1;
        updateModelDisplay(newIndex);
    });
    
    // Next model button
    nextModelBtn.addEventListener('click', () => {
        const newIndex = currentModelIndex === carModels.length - 1 ? 0 : currentModelIndex + 1;
        updateModelDisplay(newIndex);
    });
    
    // Thumbnail click
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            updateModelDisplay(index);
        });
    });
    
    // Initialize with first model
    updateModelDisplay(0);
}

// Gallery and Lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (!galleryItems.length || !lightbox || !lightboxImage || !lightboxClose) return;
    
    // Gallery images data
    const galleryImages = [
        {
            id: 1,
            src: "rrmansion.png",
            alt: "Rolls-Royce Phantom in front of luxury mansion"
        },
        {
            id: 2,
            src: "RRinterrior.png",
            alt: "Rolls-Royce Ghost interior craftsmanship"
        },
        {
            id: 3,
            src: "RRinmoutain.png",
            alt: "Rolls-Royce Cullinan in mountainous terrain"
        },
        {
            id: 4,
            src: "RRsuset.png",
            alt: "Rolls-Royce Wraith at sunset"
        },
        {
            id: 5,
            src: "rolls-royce-dawn-black-badge-4k-logo-wallpaper-preview.jpg",
            alt: "Rolls-Royce Bespoke atelier"
        },
        {
            id: 6,
            src: "rrspirit.png",
            alt: "Rolls-Royce Spirit of Ecstasy"
        }
    ];
    
    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageId = parseInt(item.getAttribute('data-id'));
            const image = galleryImages.find(img => img.id === imageId);
            
            if (image) {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Heritage Timeline
function initHeritage() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    if (!timelinePoints.length) return;
    
    // Heritage milestones data
    const heritageMilestones = [
        {
            year: "1904",
            title: "The Beginning",
            description: "Charles Rolls and Henry Royce meet at the Midland Hotel in Manchester, forming an iconic partnership.",
            image: "1904RR.png"
        },
        {
            year: "1907",
            title: "Spirit of Ecstasy",
            description: "The iconic Spirit of Ecstasy mascot is created by sculptor Charles Sykes.",
            image: "1907RR.png"
        },
        {
            year: "1925",
            title: "The Phantom I",
            description: "The first Phantom is introduced, setting new standards for luxury automobiles.",
            image: "1925RR.png"
        },
        {
            year: "2003",
            title: "Renaissance",
            description: "The first Goodwood-era Phantom is unveiled, marking a new chapter for Rolls-Royce.",
            image: "2003RR.png"
        },
        {
            year: "2023",
            title: "Electric Future",
            description: "Rolls-Royce introduces Spectre, its first fully-electric motor car.",
            image: "2023RR.png"
        }
    ];
    
    // Update heritage content
    function updateHeritageContent(index) {
        const milestone = heritageMilestones[index];
        
        document.getElementById('heritageTitle').textContent = milestone.title;
        document.getElementById('heritageYear').textContent = milestone.year;
        document.getElementById('heritageDescription').textContent = milestone.description;
        document.getElementById('heritageImage').src = milestone.image;
        document.getElementById('heritageImage').alt = milestone.title;
        
        // Update active timeline point
        timelinePoints.forEach(point => point.classList.remove('active'));
        timelinePoints[index].classList.add('active');
    }
    
    // Timeline point click
    timelinePoints.forEach((point, index) => {
        point.addEventListener('click', () => {
            updateHeritageContent(index);
        });
    });
    
    // Initialize with first milestone
    updateHeritageContent(0);
}

// Testimonials Slider
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!testimonials.length || !dots.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Update active testimonial
    function updateTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Previous testimonial
    prevBtn.addEventListener('click', () => {
        const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        updateTestimonial(newIndex);
    });
    
    // Next testimonial
    nextBtn.addEventListener('click', () => {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        updateTestimonial(newIndex);
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
        updateTestimonial(newIndex);
    }, 6000);
    
    // Pause auto-rotation on hover
    const testimonialsContainer = document.querySelector('.testimonials-container');
    
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
                updateTestimonial(newIndex);
            }, 6000);
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const model = document.getElementById('model').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (!name || !email || !model || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Form submission success message
        alert('Thank you for your inquiry. We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!revealElements.length) return;
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Check on load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

// Book Test Drive Button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('test-drive-btn') || 
        (e.target.closest('.luxury-btn') && e.target.closest('.luxury-btn').textContent.includes('Test Drive'))) {
        
        const modelName = document.getElementById('detailModelName')?.textContent || 'Rolls-Royce';
        alert(`Thank you for your interest in the ${modelName}. Our luxury consultant will contact you shortly.`);
    }
});

// Declare lucide variable
const lucide = window.lucide || {};