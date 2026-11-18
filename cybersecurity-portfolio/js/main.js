// Navigation, terminal typing and pointer glow
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".nav-link, .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const commands = ["analyze --events", "monitor --threats", "stay curious"];
const typedCommand = document.getElementById("typed-command");
let commandIndex = 0, charIndex = 0, deleting = false;
function typeCommand() {
  if (!typedCommand) return;
  const current = commands[commandIndex];
  typedCommand.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeCommand, 85);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeCommand, 1250);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeCommand, 38);
  } else {
    deleting = false;
    commandIndex = (commandIndex + 1) % commands.length;
    setTimeout(typeCommand, 350);
  }
}
typeCommand();

document.getElementById("year").textContent = new Date().getFullYear();

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", event => {
  if (!glow || event.pointerType !== "mouse") return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-link")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));
