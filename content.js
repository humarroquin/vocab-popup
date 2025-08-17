"use strict";

document.addEventListener("mouseup", () => {
  // get the highlighted section
  const selection = window.getSelection().toString().trim();
  // if nothing gets selected do nothing
  if (!selection) return;

  // remove old popup
  const oldPopup = document.querySelector("#vocab-popup");
  if (oldPopup) oldPopup.remove();

  // create popup
  const popup = document.createElement("div");
  popup.id = "vocab-popup";
  popup.innerText = "Loading...";

  // add popup to page
  document.body.appendChild(popup);

  // Position popup near the selected word
  const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
  popup.style.top = `${range.y + window.scrollY + 25}px`; // slightly below
  popup.style.left = `${range.x + window.scrollX}px`;
});
