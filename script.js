/* =====================================================
   Birthday Website — script.js
   Designed with love 🌸
===================================================== */

/* ── FLOATING PETALS ── */
const petalBg = document.getElementById('petalBg');
for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${8 + Math.random() * 10}px;
    height: ${12 + Math.random() * 10}px;
    animation-duration: ${6 + Math.random() * 10}s;
    animation-delay: ${Math.random() * 10}s;
    transform: rotate(${Math.random() * 360}deg);
  `;
  petalBg.appendChild(p);
}

/* ── MUSIC BUTTON (decorative toggle) ── */
let musicOn = false;
document.getElementById('musicBtn').addEventListener('click', () => {
  musicOn = !musicOn;
  document.getElementById('musicBtn').textContent = musicOn ? '🔇' : '🎵';
  showToast(musicOn ? '🎵 Feeling the vibe!' : '🔇 Muted');
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
reveals.forEach(r => revealObserver.observe(r));

/* ── COUNTDOWN TIMER ── */
const timerEl = document.getElementById('countdownTimer');
const birthdayStr = timerEl ? timerEl.dataset.birthday : null;

function updateCountdown() {
  if (!birthdayStr) return;

  const now = new Date();
  let target = new Date(birthdayStr);
  target.setFullYear(now.getFullYear());
  if (target <= now) target.setFullYear(now.getFullYear() + 1);

  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';
    document.getElementById('countdownMsg').textContent = '🎉 TODAY IS HER BIRTHDAY! Celebrate!';
    launchConfetti();
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);

  document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}

if (birthdayStr) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ── CONFETTI ── */
const confettiColors = [
  '#f4a7b9', '#e8c97a', '#c96b8a',
  '#fde8ef', '#a8d8b9', '#f9d0dc', '#b8d4f0'
];

function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 30}vh;
        background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-delay: ${Math.random() * 0.5}s;
        animation-duration: ${2 + Math.random() * 1.5}s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }, i * 25);
  }
}

/* ── CELEBRATE BUTTON ── */
document.getElementById('celebrateBtn').addEventListener('click', () => {
  launchConfetti();
  showToast("🎉 Here's to the most amazing girl! 🥂");
});

/* ── TOAST ── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── FIRE CONFETTI ON LOAD (small burst) ── */
window.addEventListener('load', () => {
  setTimeout(() => launchConfetti(), 1500);
});
