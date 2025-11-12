// Select all cards with classes .card-1 through .card-9
const cards = [];

for (let i = 1; i <= 9; i++) {
  const card = document.querySelector(`.card-${i}`);
  if (card) cards.push(card);
}

// Add event listeners
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("card-active")) {
      card.classList.remove("card-active");
    } else {
      cards.forEach((c) => c.classList.remove("card-active"));
      card.classList.add("card-active");

      // Scroll the clicked card into horizontal center
      card.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  });
});

// const popup = document.getElementById("popup");
// const closeBtn = popup.querySelector(".close-btn");
// const cards = document.querySelectorAll("[class^='card-']");

// // When clicking a card → show popup
// cards.forEach((card) => {
//   card.addEventListener("click", () => {
//     popup.classList.add("active");

//     // Optional: change content based on card
//     const title = popup.querySelector("h2");
//     title.textContent = card.textContent + " Details";
//   });
// });

// // Close popup
// closeBtn.addEventListener("click", () => popup.classList.remove("active"));

// // Also close when clicking outside popup box
// popup.addEventListener("click", (e) => {
//   if (e.target === popup) popup.classList.remove("active");
// });
