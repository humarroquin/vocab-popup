"use strict";

async function getWordInfo(word) {
  // fetch data from API
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  // convert to JSON
  const json = await res.json();

  // select first entry
  const entry = json[0];
  const phonetics = entry.phonetics.find((p) => p.text);
  const meaning = entry.meanings[0];

  return {
    partOfSpeech: meaning.partOfSpeech,
    pronunciation: phonetics.text,
    pronunciationAudio: phonetics && phonetics.audio ? phonetics.audio : null,
  };
}

document.addEventListener("mouseup", async () => {
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

  // API call
  try {
    const data = await getWordInfo(selection);
    popup.innerHTML = `
        <strong>${selection}</strong></br>
        <em>${data.partOfSpeech}</em></br>
        Pronunciation: ${data.pronunciation || "N/A"}
        ${
          data.pronunciationAudio
            ? '<button id="play-sound">🔊 Play</button>'
            : ""
        }
    `;
    // Play audio when button is clicked
    if (data.pronunciationAudio) {
      const btn = document.getElementById("play-sound");
      btn.addEventListener("click", () => {
        const audio = new Audio(data.pronunciationAudio);
        audio.play();
      });
    }
  } catch {
    popup.innerText = "Could not fetch definition.";
    console.error(err);
  }
});
