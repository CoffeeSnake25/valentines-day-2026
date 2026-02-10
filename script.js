const revealBtn = document.getElementById("reveal-btn")
const longMessage = document.getElementById("long-message")

revealBtn.addEventListener("click", () => {
    const isOpen = longMessage.classList.toggle("is-open");

    revealBtn.setAttribute("aria-expanded", String(isOpen));
    longMessage.setAttribute("aria-hidden", String(!isOpen))

    revealBtn.textContent = isOpen ? "Hide my note" : "Reveal my note";
});

const reasons = [
    "Reason one",
    "Reason two",
    "Reason three"
];

let currentIndex = 0;

const nextBtn = document.getElementById("next-reason");
const shuffleBtn = document.getElementById("shuffle-reason");
const reasonText = document.getElementById("reason-text");
reasonText.textContent = reasons[currentIndex];

if (nextBtn && shuffleBtn && reasonText) {
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % reasons.length;
        reasonText.textContent = reasons[currentIndex];
    })

    shuffleBtn.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        currentIndex = randomIndex;
        reasonText.textContent = reasons[currentIndex];
    })
}
