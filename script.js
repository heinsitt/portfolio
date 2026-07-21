/* ============================================
   HEIN SITT PORTFOLIO — ART × TECH FUSION v7
   New: Matrix rain + color cycling + logo set cycling
   ============================================ */

/* === THEME === */
const themeBtn = document.getElementById('theme-toggle');
const themeIco = document.getElementById('theme-icon');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeIco) themeIco.classList.replace('fa-sun', 'fa-moon');
}

if (themeBtn && themeIco) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const dark = document.body.classList.contains('light-mode');
        themeIco.classList.toggle('fa-sun', !dark);
        themeIco.classList.toggle('fa-moon', dark);
        localStorage.setItem('theme', dark ? 'light' : 'dark');
    });
}

/* === HEADER === */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* === MOBILE MENU === */
const burger = document.getElementById('hamburger');
const mMenu = document.getElementById('mobile-menu');
const mClose = document.getElementById('mobile-close');
const mLinks = document.querySelectorAll('.mobile-nav-links a');

if (burger) burger.addEventListener('click', () => mMenu?.classList.add('open'));
if (mClose) mClose.addEventListener('click', () => mMenu?.classList.remove('open'));
mLinks.forEach(l => l.addEventListener('click', () => mMenu?.classList.remove('open')));

/* === ACTIVE NAV === */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActive() {
    const y = window.scrollY + 100;
    sections.forEach(sec => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
            navLinks.forEach(l => {
                l.classList.remove('active');
                if (l.getAttribute('href') === '#' + sec.id) l.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActive, { passive: true });

/* === REVEAL ON SCROLL === */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* === TIMELINE REVEAL ANIMATION — slide from left/right === */
const tlItems = document.querySelectorAll('.tl-item');
const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const item = e.target;
            item.classList.add('visible');
            // Also explicitly add visible to the card child (tl-reveal-left/right)
            const card = item.querySelector('.tl-reveal-left, .tl-reveal-right');
            if (card) {
                setTimeout(() => card.classList.add('visible'), 80);
            }
            tlObs.unobserve(item);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
tlItems.forEach(item => tlObs.observe(item));

/* === TYPING EFFECT === */
const typedEl = document.getElementById('typed');
const phrases = ['NOC & Systems Engineer', 'Cloud / DevOps Enthusiast', 'Infrastructure Reliability', 'Automation & CI/CD'];
let pIdx = 0, cIdx = 0, isDel = false;

function typeEffect() {
    const phrase = phrases[pIdx];
    cIdx = isDel ? cIdx - 1 : cIdx + 1;
    if (typedEl) typedEl.textContent = phrase.substring(0, cIdx);
    let delay = isDel ? 45 : 75;
    if (!isDel && cIdx === phrase.length) { delay = 2000; isDel = true; }
    else if (isDel && cIdx === 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; delay = 400; }
    setTimeout(typeEffect, delay);
}
if (typedEl) setTimeout(typeEffect, 1000);

/* === LIGHTBOX === */
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    if (lb && img) { img.src = src; lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* === FORM === */
/* === CONTACT FORM — SENDS TO EMAIL VIA FORMSUBMIT === */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;
        const orig = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            if (key === '_honey') continue;
            data.append(key, value);
        }

        fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
        })
        .then(response => {
            if (response.ok) {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = 'linear-gradient(135deg, #00ff9d, #00b870)';
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 2500);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed. Try again.';
            btn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            setTimeout(() => {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.disabled = false;
            }, 2500);
        });
    });
});

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

/* === LOGO CLI ANIMATION (behind name) === */
const cliEl = document.getElementById('cli-anim');
if (cliEl) {
    const frames = ['>_', '> ', '>_'];
    let fi = 0;
    setInterval(() => { cliEl.textContent = frames[fi % 3]; fi++; }, 500);
}

/* === TECH TILE STAGGER REVEAL === */
const techTiles = document.querySelectorAll('.tech-tile');
const techObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const idx = Array.from(techTiles).indexOf(e.target);
            setTimeout(() => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }, idx * 40);
            techObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
techTiles.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(20px)';
    t.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    techObs.observe(t);
});

/* === FLOATING LOGO SET CYCLING — every 30 seconds === */
const setA = document.querySelectorAll('.float-set-a');
const setB = document.querySelectorAll('.float-set-b');

// Start with set A visible
setA.forEach(el => el.classList.add('visible'));

function cycleLogos() {
    if (setA[0] && setA[0].classList.contains('visible')) {
        // Switch to set B
        setA.forEach(el => { el.classList.remove('visible'); el.classList.add('hidden'); });
        setB.forEach(el => { el.classList.remove('hidden'); el.classList.add('visible'); });
    } else {
        // Switch back to set A
        setB.forEach(el => { el.classList.remove('visible'); el.classList.add('hidden'); });
        setA.forEach(el => { el.classList.remove('hidden'); el.classList.add('visible'); });
    }
}
setInterval(cycleLogos, 30000);

/* === MATRIX RAIN — disabled on mobile for performance === */
const canvas = document.getElementById('matrix-canvas');
const isMobile = window.innerWidth <= 900;
if (canvas && !isMobile) {
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const fontSize = 16;
    let columns = Math.floor(W / fontSize);
    let drops = Array(columns).fill(1);

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        columns = Math.floor(W / fontSize);
        drops = Array(columns).fill(1);
    });

    const chars = '01アイウエカキクケコサシスセソABCDEFGHIJ0110110100110101';

    // Color sets — cycled every 30 seconds
    const colorSets = [
        { head: '#00e5ff', mid: '#0099b8', fade: 'rgba(8,8,15,0.12)' },  // cyan
        { head: '#ff2d75', mid: '#c01060', fade: 'rgba(8,8,15,0.12)' },  // magenta
        { head: '#ffb627', mid: '#cc8a00', fade: 'rgba(8,8,15,0.12)' },  // amber
        { head: '#00ff9d', mid: '#00b870', fade: 'rgba(8,8,15,0.12)' },  // teal
    ];
    let colorIdx = 0;

    // Light mode: stronger colors + semi-opaque dark fade so chars are visible
    function getColors() {
        const isLight = document.body.classList.contains('light-mode');
        const cs = colorSets[colorIdx];
        if (isLight) {
            return {
                head: cs.head,          // keep bright head color
                mid: cs.mid,            // keep mid color (visible on light bg)
                fade: 'rgba(240,237,230,0.18)',  // slightly darker cream fade
            };
        }
        return cs;
    }

    // Switch color every 30 seconds
    setInterval(() => { colorIdx = (colorIdx + 1) % colorSets.length; }, 30000);

    function drawMatrix() {
        const cs = getColors();
        ctx.fillStyle = cs.fade;
        ctx.fillRect(0, 0, W, H);
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const y = drops[i] * fontSize;
            const isHead = drops[i] <= 1 || Math.random() < 0.04;

            ctx.fillStyle = isHead ? cs.head : cs.mid;
            if (isHead) {
                ctx.shadowColor = cs.head;
                ctx.shadowBlur = 8;
            } else {
                ctx.shadowBlur = 0;
            }
            ctx.fillText(text, i * fontSize, y);
            ctx.shadowBlur = 0;

            if (y > H && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

        // Use rAF with throttle for smoother performance
    let lastDraw = 0;
    function rafMatrix(ts) {
        if (ts - lastDraw > 50) { drawMatrix(); lastDraw = ts; }
        requestAnimationFrame(rafMatrix);
    }
    requestAnimationFrame(rafMatrix);
}

// Mobile: hide canvas entirely
if (canvas && isMobile) { canvas.style.display = 'none'; }


/* === SKETCH DRAW-IN ANIMATIONS === */
const sketchCircle = document.querySelector('.sketch-circle path');
if (sketchCircle) {
    const length = sketchCircle.getTotalLength();
    sketchCircle.style.strokeDasharray = length;
    sketchCircle.style.strokeDashoffset = length;
    sketchCircle.style.transition = 'stroke-dashoffset 2s ease';
    setTimeout(() => { sketchCircle.style.strokeDashoffset = '0'; }, 500);
    setTimeout(() => {
        sketchCircle.style.strokeDasharray = '4,3';
        sketchCircle.style.strokeDashoffset = '0';
        sketchCircle.style.transition = 'none';
    }, 2500);
}

const sketchPaths = document.querySelectorAll('.name-underline path, .title-underline path, .hero-sketch path');
sketchPaths.forEach((path, i) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.transition = `stroke-dashoffset 1.5s ease ${i * 0.1}s`;
    setTimeout(() => { path.style.strokeDashoffset = '0'; }, 200 + i * 100);
    setTimeout(() => {
        path.style.strokeDasharray = 'none';
        path.style.strokeDashoffset = '0';
        path.style.transition = 'none';
    }, 2000 + i * 100);
});

/* === PARALLAX ON BLOBS — disabled on mobile === */
if (!isMobile) {
    const blobs = document.querySelectorAll('.blob');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sY = window.scrollY;
                blobs.forEach((b, i) => {
                    b.style.translate = `0 ${sY * (i + 1) * 0.3 * -0.05}px`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* === FOOTER LIVE GRAPH — upward trending neon line with arrow === */
(function() {
    const canvas = document.getElementById('footer-graph');
    if (!canvas) return;

    // Make canvas wider for the trending graph style
    canvas.width = 140;
    canvas.height = 38;

    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // History buffer — stores last N y-values, slowly trending upward
    const N = 30;
    const history = [];
    let baseY = H * 0.75;  // start near bottom
    let noise = 0;

    // Seed history
    for (let i = 0; i < N; i++) {
        history.push(baseY - (i / N) * H * 0.45);
    }

    function getLineColor() {
        return document.body.classList.contains('light-mode') ? '#00a878' : '#00ff9d';
    }
    function getGlowColor() {
        return document.body.classList.contains('light-mode') ? 'rgba(0,168,120,0.4)' : 'rgba(0,255,157,0.5)';
    }

    function tick() {
        // Shift history left, push new value: general downward trend in Y = upward visually
        const last = history[history.length - 1];
        noise += (Math.random() - 0.42) * 3.5;  // slight upward bias (0.42 < 0.5)
        noise *= 0.85; // dampen
        let next = last + noise - 0.35; // -0.35 per frame = slow upward drift
        // Clamp: keep within canvas with margin
        next = Math.max(4, Math.min(H - 8, next));
        history.push(next);
        if (history.length > N) history.shift();
    }

    function draw() {
        tick();
        const color = getLineColor();
        const glow = getGlowColor();

        ctx.clearRect(0, 0, W, H);

        // Gradient fill under the line
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, glow);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        history.forEach((y, i) => {
            const x = (i / (N - 1)) * (W - 14);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.lineTo((N - 1) / (N - 1) * (W - 14), H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Main line
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.beginPath();
        history.forEach((y, i) => {
            const x = (i / (N - 1)) * (W - 14);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Arrow at tip
        const tipX = (W - 14);
        const tipY = history[history.length - 1];
        const prevY = history[history.length - 2];
        const angle = Math.atan2(tipY - prevY, (W - 14) - ((N - 2) / (N - 1)) * (W - 14));

        ctx.save();
        ctx.translate(tipX, tipY);
        ctx.rotate(angle);
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(12, 0);
        ctx.lineTo(0, -5);
        ctx.lineTo(3, 0);
        ctx.lineTo(0, 5);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();

        // Pulsing dot at tip
        ctx.beginPath();
        ctx.arc(tipX, tipY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        requestAnimationFrame(draw);
    }
    draw();
})();

/* === COMING SOON TERMINAL TYPEWRITER === */
(function() {
    const cmdEl = document.getElementById('cs-cmd');
    if (!cmdEl) return;
    const lines = [
        'git clone projects.repo',
        'docker build -t mini-lab .',
        'kubectl apply -f lab.yaml',
        'aws ec2 describe-instances',
        'uploading projects...',
    ];
    let li = 0, ci = 0, deleting = false;
    function tick() {
        const line = lines[li];
        ci = deleting ? ci - 1 : ci + 1;
        cmdEl.textContent = line.substring(0, ci);
        let delay = deleting ? 35 : 70;
        if (!deleting && ci === line.length) { delay = 1800; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 300; }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 800);
})();

/* === TIMELINE FALLBACK — force visible after 2s if observer didn't fire === */
setTimeout(() => {
    document.querySelectorAll('.tl-reveal-left, .tl-reveal-right').forEach(el => {
        el.classList.add('visible');
    });
    document.querySelectorAll('.tl-item').forEach(el => {
        el.classList.add('visible');
    });
}, 2000);

/* === SECTION SCROLL-IN ANIMATION === */
(function() {
    const sections = document.querySelectorAll('.section');
    const secObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
                secObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
    sections.forEach(s => secObs.observe(s));
    // Fallback: show all after 3s in case observer doesn't fire
    // Immediate fallback for mobile
if (window.innerWidth <= 900) {
    sections.forEach(s => s.classList.add('in-view'));
} else {
    setTimeout(() => sections.forEach(s => s.classList.add('in-view')), 3000);
}

})();
