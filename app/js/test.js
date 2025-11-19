// Trigger contact alert when a visitor clicks the CTA button.
const contactButton = document.getElementById("contactButton");

if (contactButton) {
  contactButton.addEventListener("click", () => {
    alert("Дякую за інтерес! Напишіть мені на youremail@namehere");
  });
}
