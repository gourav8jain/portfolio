// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    initPortfolio();
});

function initPortfolio() {
    // Add smooth scrolling for competency items
    addCompetencyInteractions();
    
    // Add contact link functionality
    addContactFunctionality();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add print functionality
    addPrintFunctionality();
}

function addCompetencyInteractions() {
    const competencyItems = document.querySelectorAll('.competency-item');
    
    competencyItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function addContactFunctionality() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            // Handle different contact types
            if (text.includes('@')) {
                // Email
                window.open(`mailto:${text}`, '_blank');
            } else if (text.includes('linkedin.com')) {
                // LinkedIn
                window.open(`https://${text}`, '_blank');
            } else if (text.includes('+')) {
                // Phone
                window.open(`tel:${text}`, '_blank');
            }
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.color = '#2563eb';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
        });
    });
}

function addScrollAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function addPrintFunctionality() {
    // Add print button functionality if needed
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Portfolio';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-weight: 500;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.background = '#1d4ed8';
        this.style.transform = 'translateY(-2px)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = '#2563eb';
        this.style.transform = '';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // Add to page
    document.body.appendChild(printButton);
    
    // Hide print button when printing
    const mediaQuery = window.matchMedia('print');
    mediaQuery.addListener(function(e) {
        if (e.matches) {
            printButton.style.display = 'none';
        } else {
            printButton.style.display = 'block';
        }
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Escape key to close any modals (if added later)
    if (e.key === 'Escape') {
        // Handle escape functionality
    }
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {
        // Add touch-specific interactions if needed
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Handle scroll optimizations
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Add accessibility improvements
function addAccessibilityFeatures() {
    // Add ARIA labels
    const competencyItems = document.querySelectorAll('.competency-item');
    competencyItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Competency: ${item.textContent}`);
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
addAccessibilityFeatures(); 