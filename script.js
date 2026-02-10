const card = document.querySelector("main");

if (card) {
    card.addEventListener("click", (e) => {
    // prevent double hearts when clicking buttons
    if (e.target.tagName === "BUTTON") return;

    spawnHeart(
        e.clientX + window.scrollX,
        e.clientY + window.scrollY
    );
    });
}


const revealBtn = document.getElementById("reveal-btn")
const longMessage = document.getElementById("long-message")

revealBtn.addEventListener("click", () => {
    const isOpen = longMessage.classList.toggle("is-open");

    revealBtn.setAttribute("aria-expanded", String(isOpen));
    longMessage.setAttribute("aria-hidden", String(!isOpen))

    revealBtn.textContent = isOpen ? "Hide my note" : "Reveal my note";

    if (isOpen) {
        const rect = revealBtn.getBoundingClientRect();
        spawnHeart(
            rect.left + rect.width / 2 + window.scrollX,
            rect.top + window.scrollY
        );
    }
});

const reasons = [
    "You are the kindest person I know",
    "You have the best laugh",
    "You have an amazing smile",
    "I get lost in your eyes",
    "You let me see your boobs"
];

let currentIndex = 0;

const nextBtn = document.getElementById("next-reason");
const shuffleBtn = document.getElementById("shuffle-reason");
const reasonText = document.getElementById("reason-text");
reasonText.textContent = reasons[currentIndex];

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
        const randomIndex = Math.floor(Math.random() * reasons.length);
        currentIndex = randomIndex;
        reasonText.textContent = reasons[currentIndex];

        const rect = e.target.getBoundingClientRect();
        spawnHeart(
            rect.left + rect.width / 2 + window.scrollX,
            rect.top + window.scrollY
        );
    })
}

function spawnHeart(x, y) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤️";

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.transform = "translateX(-50%)"

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 700);
}