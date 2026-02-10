const revealBtn = document.getElementById("reveal-btn")
const longMessage = document.getElementById("long-message")

revealBtn.addEventListener("click", () => {
    const isOpen = longMessage.classList.toggle("is-open");

    revealBtn.setAttribute("aria-expanded", String(isOpen));
    longMessage.setAttribute("aria-hidden", String(!isOpen))

    revealBtn.textContent = isOpen ? "Hide my note" : "Reveal my note";
});