document.addEventListener("DOMContentLoaded", () => {

  const EMOJIS = ["❤️", "🤍", "💖", "💘", "✨", "🌸"];

  function spawnHeart() {
    // do NOT spawn while locked
    if (document.body.classList.contains("locked")) return;

    const el = document.createElement("div");
    el.className = "heart";
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

    // random position & size
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = 14 + Math.random() * 18 + "px";

    // random fall speed
    const duration = 6 + Math.random() * 5;
    el.style.animationDuration = duration + "s";

    // stagger start (prevents falling in line)
    el.style.animationDelay = -Math.random() * duration + "s";

    el.style.opacity = 0.6 + Math.random() * 0.4;

    document.body.appendChild(el);

    setTimeout(() => el.remove(), duration * 1000);
  }

  // gentle rate (mobile friendly)
  setInterval(spawnHeart, 450);

});