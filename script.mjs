import { getUserIDs } from "./data.mjs";
import { analyzeUser, formatSong } from "./common.mjs";

const userSelect = document.getElementById("user-select");
const content = document.getElementById("content");
// Populate dropdown
getUserIDs().forEach((id) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = `User ${id}`;
  userSelect.appendChild(option);
});
