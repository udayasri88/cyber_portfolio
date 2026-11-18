// Scroll reveals and lightweight matrix rain background
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas?.getContext("2d");
const glyphs = "01アイウエオカキクケコサシスセソタチツテト";
let columns = 0, drops = [];
function resizeMatrix() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / 18);
  drops = Array(columns).fill(1);
}
function drawMatrix() {
  if (!canvas || !ctx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ctx.fillStyle = "rgba(8, 11, 16, 0.075)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff9c";
  ctx.font = "12px monospace";
  drops.forEach((y, index) => {
    const char = glyphs[Math.floor(Math.random() * glyphs.length)];
    ctx.fillText(char, index * 18, y * 18);
    if (y * 18 > canvas.height && Math.random() > 0.978) drops[index] = 0;
    drops[index]++;
  });
}
resizeMatrix();
window.addEventListener("resize", resizeMatrix);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(drawMatrix, 65);
}
