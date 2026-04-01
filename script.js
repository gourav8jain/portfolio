/* ============================================================
   GOURAV JAIN PORTFOLIO — script.js
   Interactive: Typing Effect · Counters · Scroll Animations
   Skill Bars · Navbar · Mobile Menu · Back-to-Top · Contact Form
   ============================================================ */

'use strict';

// ---- Scroll Progress Bar ----
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(window.scrollY / total) * 100}%`;
}, { passive: true });

// ---- Navbar ----
const navbar  = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
let   navOverlay;

function initNavbar() {
    // Scrolled class
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        // Back to top
        const btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once

    // Mobile menu overlay
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link, .btn-nav-cta').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Active link on scroll
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    const highlight = throttle(() => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });
    }, 100);
    window.addEventListener('scroll', highlight, { passive: true });
}

function toggleMenu() {
    const open = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    navOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
}

// ---- Typing Effect ----
const PHRASES = [
    'Global Engineering Leader',
    'Microsoft Azure MVP',
    'GenAI Evangelist',
    'Fintech & Payments Expert',
    'Distributed Systems Architect',
    'Engineering Team Builder',
];

function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    let phraseIdx = 0, charIdx = 0, deleting = false;

    function tick() {
        const phrase = PHRASES[phraseIdx];
        if (!deleting) {
            charIdx++;
            el.textContent = phrase.slice(0, charIdx);
            if (charIdx === phrase.length) {
                deleting = true;
                setTimeout(tick, 2200);
                return;
            }
            setTimeout(tick, 75);
        } else {
            charIdx--;
            el.textContent = phrase.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % PHRASES.length;
                setTimeout(tick, 400);
                return;
            }
            setTimeout(tick, 38);
        }
    }
    setTimeout(tick, 800);
}

// ---- Counter Animation ----
function animateCounter(el, target, duration = 1800) {
    let start = null;
    const isFloat = String(target).includes('.');
    function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = isFloat ? value.toFixed(1) : Math.floor(value);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = isFloat ? target.toFixed(1) : target;
    }
    requestAnimationFrame(step);
}

// ---- AOS (scroll-triggered fade-ins) ----
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ---- Counters in hero stats ----
function initHeroCounters() {
    const statNums = document.querySelectorAll('.hero-stats .stat-num[data-count]');
    if (!statNums.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
}

// ---- Counters in about section ----
function initAboutCounters() {
    const counters = document.querySelectorAll('.about-stats .counter[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCounter(el, parseFloat(el.dataset.count));
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

// ---- Skill Bars ----
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill[data-width]');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                setTimeout(() => {
                    fill.style.width = fill.dataset.width + '%';
                }, 200);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(el => observer.observe(el));
}

// ---- Back to Top ----
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---- Contact Form ----
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Load EmailJS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => emailjs.init('ecDANBzlRs3xWqwes');
    document.head.appendChild(script);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const name    = form.name.value.trim();
        const email   = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        btn.disabled = true;

        try {
            await emailjs.send('service_0vxugex', 'template_lycsxuu', {
                to_email:   'gourav8jain@gmail.com',
                from_name:  name,
                from_email: email,
                subject,
                message,
                reply_to:   email,
                date: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
                time: new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:true }),
            });
            showNotification('Message sent! I\'ll get back to you soon. 🚀', 'success');
            form.reset();
        } catch {
            showNotification('Failed to send. Please email me directly at gourav8jain@gmail.com', 'error');
        } finally {
            btn.innerHTML = orig;
            btn.disabled = false;
        }
    });
}

// ---- Notification ----
function showNotification(msg, type = 'info') {
    const el = document.getElementById('notification');
    if (!el) return;
    const icons = { success: 'fas fa-check-circle', error: 'fas fa-exclamation-circle', info: 'fas fa-info-circle' };
    el.innerHTML = `<i class="${icons[type] || icons.info}"></i><span>${msg}</span>`;
    el.className = `notification ${type} show`;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 5000);
}

// ---- Cloud tag hover colors ----
function initCloudTags() {
    const colors = ['#2563eb','#06b6d4','#8b5cf6','#10b981','#f59e0b','#ec4899'];
    document.querySelectorAll('.cloud-tag').forEach((tag, i) => {
        const c = colors[i % colors.length];
        tag.addEventListener('mouseenter', () => { tag.style.borderColor = c; tag.style.color = c; });
        tag.addEventListener('mouseleave', () => { tag.style.borderColor = ''; tag.style.color = ''; });
    });
}

// ---- Utility: Throttle ----
function throttle(fn, ms) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn.apply(this, args); }
    };
}

// ---- Service Worker ----
function initSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
        });
    }
}

// ---- Init all ----
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initTyping();
    initAOS();
    initHeroCounters();
    initAboutCounters();
    initSkillBars();
    initBackToTop();
    initContactForm();
    initCloudTags();
    initSW();
});
