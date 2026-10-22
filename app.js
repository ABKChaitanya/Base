const greeting = document.getElementById("greeting");
const button = document.getElementById("time-button");

button.addEventListener("click", () => {
  greeting.textContent = new Date().toLocaleTimeString();
});
