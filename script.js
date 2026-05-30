/* ===== SCRIPT.JS ===== */

// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.querySelectorAll('span').forEach((s, i) => {
    s.style.transform = open
      ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 1 ? 'opacity:0' : 'translateY(-7px) rotate(-45deg)' : '';
    s.style.opacity = open && i === 1 ? '0' : '1';
  });
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Skill bars animate on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.w + '%';
      skillObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(el => skillObserver.observe(el));

// ── Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ── Contact form (mailto fallback)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const subject = form.querySelector('#subject').value.trim() || 'Portfolio Contact';
  const message = form.querySelector('#message').value.trim();
  if (!name || !email || !message) { note.textContent = 'Please fill in all required fields.'; return; }
  const mailto = `mailto:mdsayammunshi27@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;
  note.textContent = '✓ Opening your mail client…';
  form.reset();
  setTimeout(() => note.textContent = '', 4000);
});

// ── Typed text effect in hero tagline
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const texts = [
    'Networking & System Administration Enthusiast',
    'IT Infrastructure Builder',
    'Cisco & MikroTik Specialist',
    'Virtualization & Security Learner',
  ];
  let ti = 0, ci = 0, deleting = false;
  const type = () => {
    const current = texts[ti];
    if (!deleting) {
      tagline.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      tagline.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 45 : 75);
  };
  setTimeout(type, 1200);
}

// ── Smooth hover tilt on project/edu cards
document.querySelectorAll('.project-card, .edu-card, .about-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
