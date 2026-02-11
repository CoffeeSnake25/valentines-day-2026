/**
 * ================================
 * DOM ELEMENT REFERENCES
 * ================================
 */

const card = document.querySelector("main");
const revealBtn = document.getElementById("reveal-btn");
const longMessage = document.getElementById("long-message");

const nextBtn = document.getElementById("next-reason");
const shuffleBtn = document.getElementById("shuffle-reason");
const reasonText = document.getElementById("reason-text");


/**
 * ================================
 * HEART SPAWN UTILITY
 * ================================
 * Creates a floating heart at the given page coordinates
 */

function spawnHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤️";

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.transform = "translateX(-50%)";

  document.body.appendChild(heart);

  // Clean up after animation completes
  setTimeout(() => heart.remove(), 950);
}


/**
 * ================================
 * CARD INTERACTION (HEARTS ON CLICK)
 * ================================
 * Clicking anywhere inside the card spawns a heart,
 * except when clicking buttons (handled separately).
 */

if (card) {
  card.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;

    spawnHeart(
      e.clientX + window.scrollX,
      e.clientY + window.scrollY
    );
  });
}

/**
 * ================================
 * CARD FOLD ANIMATION
 * ================================
 * Folds the card back slightly when
 * the long message is revealed.
 */

function unfoldCardIfNeeded() {
  if (!card || hasUnfolded) return;
  hasUnfolded = true;
  card.classList.remove("is-folded");
}

let hasUnfolded = false;

if (card) {
  card.addEventListener("click", (e) => {
    // If you clicked a button (or anything inside a button), do nothing here.
    const clickedButton = e.target.closest("button");
    if (clickedButton) return;

    // Unfold once on first non-button click
    if (!hasUnfolded) {
      hasUnfolded = true;
      card.classList.remove("is-folded");
    }

    // Hearts still work on background clicks
    spawnHeart(e.clientX + window.scrollX, e.clientY + window.scrollY);
  });
}




/**
 * ================================
 * REVEAL NOTE TOGGLE
 * ================================
 * Toggles the long message open/closed with accessibility updates.
 */



if (revealBtn && longMessage) {
  revealBtn.addEventListener("click", () => {
    unfoldCardIfNeeded();
    const isOpen = longMessage.classList.toggle("is-open");

    revealBtn.setAttribute("aria-expanded", String(isOpen));
    longMessage.setAttribute("aria-hidden", String(!isOpen));
    revealBtn.textContent = isOpen ? "Hide my note" : "Reveal my note";

    // Celebrate opening the note
    if (isOpen) {
      const rect = revealBtn.getBoundingClientRect();
      spawnHeart(
        rect.left + rect.width / 2 + window.scrollX,
        rect.top + window.scrollY
      );
    }
  });
}


/**
 * ================================
 * REASONS CAROUSEL
 * ================================
 */

const reasons = [
  "You are the kindest person I know",
  "You have the best laugh",
  "You have an amazing smile",
  "I get lost in your eyes",
  "You let me see your boobs",
  "You make ordinary days feel special",
  "You feel like home to me"
];

let currentIndex = 0;

// Initialize first reason
if (reasonText) {
  reasonText.textContent = reasons[currentIndex];
}

if (nextBtn && shuffleBtn && reasonText) {

  nextBtn.addEventListener("click", (e) => {
    currentIndex = (currentIndex + 1) % reasons.length;
    reasonText.textContent = reasons[currentIndex];

    const rect = e.target.getBoundingClientRect();
    spawnHeart(
      rect.left + rect.width / 2 + window.scrollX,
      rect.top + window.scrollY
    );
  });

  shuffleBtn.addEventListener("click", (e) => {
    currentIndex = Math.floor(Math.random() * reasons.length);
    reasonText.textContent = reasons[currentIndex];

    const rect = e.target.getBoundingClientRect();
    spawnHeart(
      rect.left + rect.width / 2 + window.scrollX,
      rect.top + window.scrollY
    );
  });
}