// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-down')
    .forEach(el => observer.observe(el));


// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// ===== BACK TO TOP =====
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
});
backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');
const iconsNav = document.querySelector('.icons-nav');

hamburger.addEventListener('click', () => {
    const isOpen = navbar.style.display === 'flex';

    navbar.style.cssText = isOpen
        ? ''
        : `display:flex; flex-direction:column; position:fixed; top:65px; left:0;
           width:100%; background:rgba(255,255,255,0.97); backdrop-filter:blur(12px);
           padding:30px 30px; gap:22px; box-shadow:0 10px 30px rgba(0,0,0,0.1);
           z-index:999; animation:slideDown 0.3s ease;`;

    iconsNav.style.cssText = isOpen
        ? ''
        : `display:flex; position:fixed; top:${30 + 65 + navbar.childElementCount * 40}px;
           left:0; width:100%; justify-content:center;
           background:rgba(255,255,255,0.97); padding:0 30px 30px; z-index:999;`;

    hamburger.querySelectorAll('span').forEach((s, i) => {
        s.style.transform = !isOpen
            ? (i === 0 ? 'rotate(45deg) translate(5px,5px)'
             : i === 1 ? 'scaleX(0)'
             : 'rotate(-45deg) translate(5px,-5px)')
            : '';
    });
});

// Close mobile menu on link click
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.style.cssText = '';
        iconsNav.style.cssText = '';
        hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
});


// ===== FILTER TABS =====
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});


// ===== WISHLIST TOGGLE =====
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const icon = this.querySelector('i');
        const isLiked = icon.classList.contains('fa-solid');
        icon.className = isLiked ? 'fa-regular fa-heart' : 'fa-solid fa-heart';
        this.style.background = isLiked ? '' : '#ffe0e4';
        this.style.color = isLiked ? '' : '#c4717a';
    });
});


// ===== NEWSLETTER =====
function handleSubscribe(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const btn   = e.target.querySelector('button');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
    btn.style.background = '#6aab8e';
    input.value = '';
    setTimeout(() => {
        btn.innerHTML = 'Subscribe <i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = '';
    }, 3000);
}


// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollY >= section.offsetTop &&
            scrollY < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active-nav');
                }
            });
        }
    });
});