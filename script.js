
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsContainer = document.querySelector(".buttons");

const datePanel = document.getElementById("datePanel");
const noPanel = document.getElementById("noPanel");

const daysContainer = document.getElementById("days");
const confirmBtn = document.getElementById("confirmBtn");
const dateResult = document.getElementById("dateResult");

let selectedDay = "";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

// Generate the weekday buttons.
weekdays.forEach(day => {
  const button = document.createElement("button");

  button.className = "day";
  button.type = "button";
  button.textContent = day;

  button.addEventListener("click", () => {
    selectedDay = day;

    document.querySelectorAll(".day").forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    confirmBtn.disabled = false;
    confirmBtn.textContent = "Confirm this day 💗";
  });

  daysContainer.appendChild(button);
});

// YES button.
yesBtn.addEventListener("click", () => {
  datePanel.classList.remove("hidden");
  noPanel.classList.add("hidden");
});

// Move the NO button whenever it is clicked.
noBtn.addEventListener("click", () => {
  buttonsContainer.classList.add("no-button-moved");

  const area = buttonsContainer.getBoundingClientRect();
  const button = noBtn.getBoundingClientRect();
  const yes = yesBtn.getBoundingClientRect();
  const baseLeft = noBtn.offsetLeft;
  const baseTop = noBtn.offsetTop;
  const maxLeft = area.width - button.width;
  const maxTop = area.height - button.height;
  const minLeft = area.width / 2;
  const positions = [];

  for (let row = 0; row <= 2; row++) {
    for (let column = 0; column <= 2; column++) {
      const left = minLeft + (maxLeft - minLeft) * column / 2;
      const top = maxTop * row / 2;
      const overlapsYes =
        left < yes.right - area.left &&
        left + button.width > yes.left - area.left &&
        top < yes.bottom - area.top &&
        top + button.height > yes.top - area.top;

      if (!overlapsYes) {
        positions.push({ left, top });
      }
    }
  }

  const currentLeft = parseFloat(noBtn.style.left);
  const currentTop = parseFloat(noBtn.style.top);
  const newPositions = positions.filter(position =>
    position.left - baseLeft !== currentLeft ||
    position.top - baseTop !== currentTop
  );
  const availablePositions = newPositions.length ? newPositions : positions;

  if (availablePositions.length) {
    const position =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    noBtn.style.left = position.left - baseLeft + "px";
    noBtn.style.top = position.top - baseTop + "px";
  }
});

// Return to the invitation.
document.getElementById("backBtn").addEventListener("click", () => {
  noPanel.classList.add("hidden");
});

// Confirm selected day.
confirmBtn.addEventListener("click", () => {
  if (!selectedDay) return;

  dateResult.replaceChildren();

  const title = document.createElement("strong");
  title.textContent = "It's our 2nd date ! 💕";

  const message = document.createElement("p");
  message.textContent = "You picked " + selectedDay + ".";

  const note = document.createElement("p");
  note.textContent = "Take a screenshot to save your choice!";

  dateResult.append(title, message, note);
  dateResult.classList.remove("hidden");

  confirmBtn.textContent = "Day selected ✓";
});
