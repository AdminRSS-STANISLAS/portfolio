// ----- typed role text -----
const roles = [
  'Développeur freelance',
  'Applications web & mobile',
  'Outils métier sur mesure',
  'Développement assisté par IA'
];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
if (typedEl) typeLoop();

// ----- navbar scroll state + mobile menu -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ----- cursor glow -----
const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (e) => {
  glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

// ----- footer year -----
document.getElementById('year').textContent = new Date().getFullYear();

// ----- scroll reveal -----
const revealTargets = document.querySelectorAll(
  '.skill-card, .timeline-item, .cert-card, .about-card, .about-facts, .contact-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.in-view { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// ----- matrix rain background -----
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let cols, drops;
const chars = '01アイウエオカキクケコサシスセソ<>{}[]/;#';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / 18);
  drops = new Array(cols).fill(0).map(() => Math.random() * -100);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawMatrix() {
  ctx.fillStyle = 'rgba(7, 11, 18, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '14px JetBrains Mono, monospace';

  for (let i = 0; i < cols; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 18;
    const y = drops[i] * 18;
    ctx.fillStyle = Math.random() > 0.97 ? '#3ab7ff' : 'rgba(34, 224, 160, 0.55)';
    ctx.fillText(text, x, y);
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  setInterval(drawMatrix, 55);
}
