const heartButton = document.querySelector("#heartButton");
const clearHeartsButton = document.querySelector("#clearHeartsButton");

const heartShapes = ["♥", "♡"];
const heartColors = ["#db8d96", "#f3a3ab", "#ffffff", "#ffcabf", "#a95f69"];

function createHeart() {
  const heart = document.createElement("span");
  const size = Math.floor(Math.random() * 18) + 16;
  const drift = Math.floor(Math.random() * 180) - 90;
  const duration = (Math.random() * 2.4 + 3.4).toFixed(2);
  const landingBottom = Math.floor(Math.random() * 52) + 8;
  const landingRotate = Math.floor(Math.random() * 44) - 22;
  const landingScale = (Math.random() * 0.28 + 0.92).toFixed(2);

  heart.className = "falling-heart";
  heart.textContent = heartShapes[Math.floor(Math.random() * heartShapes.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${size}px`;
  heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.style.setProperty("--drift", `${drift}px`);
  heart.style.setProperty("--fall-duration", `${duration}s`);
  heart.style.setProperty("--landing-bottom", `${landingBottom}px`);
  heart.style.animationDelay = `${Math.random() * 0.35}s`;

  document.body.appendChild(heart);
  heart.addEventListener(
    "animationend",
    () => {
      const bounds = heart.getBoundingClientRect();

      heart.className = "landed-heart";
      heart.style.animation = "none";
      heart.style.left = `${Math.min(Math.max(bounds.left, 0), window.innerWidth - bounds.width)}px`;
      heart.style.top = "auto";
      heart.style.bottom = `${landingBottom}px`;
      heart.style.transform = `rotate(${landingRotate}deg) scale(${landingScale})`;
    },
    { once: true },
  );
}

function showerHearts() {
  const heartCount = window.matchMedia("(max-width: 520px)").matches ? 28 : 46;

  for (let index = 0; index < heartCount; index += 1) {
    window.setTimeout(createHeart, index * 45);
  }
}

function clearHearts() {
  document.querySelectorAll(".falling-heart, .landed-heart").forEach((heart) => {
    heart.remove();
  });
}

heartButton?.addEventListener("click", showerHearts);
clearHeartsButton?.addEventListener("click", clearHearts);
