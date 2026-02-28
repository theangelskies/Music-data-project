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

  // Longest streak
  if (data.longestStreak) {
    const s = document.createElement("section");
    s.innerHTML = `<h2>7. Song listened most times in a row</h2>
                   <p>${data.longestStreak.song}</p>
                   <p>Times in a row: <strong>${data.longestStreak.length}</strong></p>`;
    content.appendChild(s);
  }

  // Every day songs
  if (data.everyDaySongs.length) {
    const s = document.createElement("section");
    s.innerHTML = "<h2>8. Songs listened to every day</h2>";
    const ul = document.createElement("ul");
    data.everyDaySongs.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = song;
      ul.appendChild(li);
    });
    s.appendChild(ul);
    content.appendChild(s);
  }

  // Top genres
  if (data.topGenres.length) {
    const s = document.createElement("section");
    s.innerHTML = "<h2>9. Top genres</h2>";
    const ol = document.createElement("ol");
    data.topGenres.forEach((g) => {
      const li = document.createElement("li");
      li.textContent = g;
      ol.appendChild(li);
    });
    s.appendChild(ol);
    content.appendChild(s);
  }
};

// Event listener
userSelect.addEventListener("change", () => {
  const id = userSelect.value;

  if (!id) {
    // Return to home state
    content.innerHTML =
      "<p>Please select a user to view their listening analysis.</p>";
    return;
  }

  renderUserData(id);
});
