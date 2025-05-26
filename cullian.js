document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    
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

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });

    // Gallery image zoom effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // CTA button interaction
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', () => {
        // Add your booking logic here
        alert('Thank you for your interest in the Rolls-Royce Cullinan. Our luxury consultant will contact you shortly.');
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
});
// Add this to your existing JavaScript

// Color Preview Functionality
const colorCards = document.querySelectorAll('.color-card');
const colorPreview = document.getElementById('colorPreview');

const colorImages = {
    'Arctic White': 'cullinan-white.png',
    'Midnight Sapphire': 'cullinan-blue.png',
    // Add more color images
};

colorCards.forEach(card => {
    card.addEventListener('click', () => {
        const color = card.dataset.color;
        colorPreview.src = colorImages[color];
        
        // Remove active class from all cards
        colorCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
    });
});

// Scroll Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Specifications Toggle
const specGroups = document.querySelectorAll('.specs-group');

specGroups.forEach(group => {
    group.addEventListener('click', () => {
        group.classList.toggle('expanded');
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
});

// Dynamic MSRP Calculator
function updateMSRP() {
    const basePrice = 351250;
    let totalPrice = basePrice;
    
    // Add options pricing
    const selectedOptions = document.querySelectorAll('.option-selected');
    selectedOptions.forEach(option => {
        totalPrice += parseInt(option.dataset.price);
    });
    
    // Update MSRP display
    document.querySelector('.msrp-value').textContent = 
        `Starting at $${totalPrice.toLocaleString()}`;
}

// Color-specific Features
const colorFeatures = {
    'Arctic White': {
        interior: ['Seashell White', 'Black', 'Navy Blue'],
        wheelOptions: ['21-inch', '22-inch Polished'],
        availability: 'In Stock'
    },
    'Midnight Sapphire': {
        interior: ['Arctic White', 'Black', 'Navy Blue'],
        wheelOptions: ['22-inch Dark Finish', '22-inch Polished'],
        availability: 'Order Only'
    }
    // Add more color-specific features
};

function updateColorFeatures(color) {
    const features = colorFeatures[color];
    const featuresList = document.querySelector('.color-features');
    
    featuresList.innerHTML = `
        <h4>Available Options for ${color}</h4>
        <p>Interior Colors: ${features.interior.join(', ')}</p>
        <p>Wheel Options: ${features.wheelOptions.join(', ')}</p>
        <p>Availability: ${features.availability}</p>
    `;
}