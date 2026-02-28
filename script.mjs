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
// Render question section helper
const addSection = (title, value) => {
  if (!value) return;
  const s = document.createElement("section");
  s.innerHTML = `<h2>${title}</h2><p>${value}</p>`;
  content.appendChild(s);
};
// Render user data
const renderUserData = (userID) => {
  const data = analyzeUser(userID);
  content.innerHTML = "";

  if (!data) {
    content.innerHTML = "<p>This user didn’t listen to any songs.</p>";
    return;
  }

  addSection("1. Most listened to song (count)", data.mostSongCount);
  addSection("2. Most listened to artist (count)", data.mostArtistCount);
  addSection("3. Most listened to song (time)", data.mostSongTime);
  addSection("4. Most listened to artist (time)", data.mostArtistTime);
  addSection(
    "5. Most listened song on Friday nights (count)",
    data.fridaySongsCount,
  );
  addSection(
    "6. Most listened song on Friday nights (time)",
    data.fridaySongsTime,
  );