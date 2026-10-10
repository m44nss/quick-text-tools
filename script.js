const textInput = document.querySelector("#text-input");
const wordCount = document.querySelector("#word-count");
const charCount = document.querySelector("#char-count");
const charNoSpaceCount = document.querySelector("#char-no-space-count");
const readingTime = document.querySelector("#reading-time");
const status = document.querySelector("#status");

function updateStats() {
  const text = textInput.value;
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const minutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  wordCount.textContent = words;
  charCount.textContent = text.length;
  charNoSpaceCount.textContent = text.replace(/\s/g, "").length;
  readingTime.textContent = `${minutes} min`;
}

textInput.addEventListener("input", () => {
  updateStats();
  status.textContent = "";
});

document.querySelector("#uppercase-btn").addEventListener("click", () => {
  textInput.value = textInput.value.toUpperCase();
  updateStats();
  status.textContent = "Converted to uppercase.";
});

document.querySelector("#lowercase-btn").addEventListener("click", () => {
  textInput.value = textInput.value.toLowerCase();
  updateStats();
  status.textContent = "Converted to lowercase.";
});

document.querySelector("#clear-btn").addEventListener("click", () => {
  textInput.value = "";
  updateStats();
  status.textContent = "Text cleared.";
  textInput.focus();
});

document.querySelector("#copy-btn").addEventListener("click", async () => {
  if (!textInput.value) {
    status.textContent = "Add some text before copying.";
    return;
  }

  try {
    await navigator.clipboard.writeText(textInput.value);
    status.textContent = "Text copied to clipboard.";
  } catch {
    textInput.select();
    const copied = document.execCommand("copy");
    status.textContent = copied
      ? "Text copied to clipboard."
      : "Copy was blocked by the browser. Select and copy the text manually.";
  }
});

updateStats();
