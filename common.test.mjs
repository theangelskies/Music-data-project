import test from "node:test";
import {
  countUsers,
  countBy,
  maxByValue,
  formatSong,
  filterFridayNight,
  getLongestStreak,
  getEveryDaySongs,
  getTopGenres,
  analyzeUser,
} from "./common.mjs";

/* -----------------------------
   BASIC HELPER FUNCTION TESTS
--------------------------------*/

// countUsers
test("countUsers returns correct number of users", () => {
  assert.equal(countUsers(), 4);
});

// countBy basic functionality
test("countBy counts values correctly", () => {
  const arr = [{ a: 1 }, { a: 2 }, { a: 1 }, { a: 3 }];
  const result = countBy(arr, (x) => x.a);

  assert.equal(result.get(1), 2);
  assert.equal(result.get(2), 1);
  assert.equal(result.get(3), 1);
});
// countBy empty array
test("countBy returns empty map for empty array", () => {
  const result = countBy([], (x) => x);
  assert.equal(result.size, 0);
});

// maxByValue
test("maxByValue returns key with highest value", () => {
  const map = new Map([
    ["x", 5],
    ["y", 10],
    ["z", 3],
  ]);

  assert.equal(maxByValue(map), "y");
});

// maxByValue single entry
test("maxByValue works with single entry", () => {
  const map = new Map([["only", 1]]);
  assert.equal(maxByValue(map), "only");
});

// formatSong
test("formatSong formats correctly", () => {
  const song = { title: "Hello", artist: "Adele" };
  assert.equal(formatSong(song), "Hello - Adele");
});

// formatSong different values
test("formatSong works with different artists", () => {
  const song = { title: "Blinding Lights", artist: "The Weeknd" };
  assert.equal(formatSong(song), "Blinding Lights - The Weeknd");
});

/* -----------------------------
   FRIDAY NIGHT FILTER
--------------------------------*/

test("filterFridayNight returns songs played Friday evening", () => {
  const songs = [
    {
      timestamp: "2024-08-02T18:30:00",
      title: "A",
      artist: "X",
      duration_seconds: 200,
    },
    {
      timestamp: "2024-08-02T15:00:00",
      title: "B",
      artist: "Y",
      duration_seconds: 200,
    },
  ];

  const result = filterFridayNight(songs);

  assert.equal(result.length, 1);
  assert.equal(result[0].title, "A");
});

test("filterFridayNight returns empty if no Friday evening songs", () => {
  const songs = [
    {
      timestamp: "2024-08-01T20:00:00",
      title: "A",
      artist: "X",
      duration_seconds: 200,
    },
  ];

  const result = filterFridayNight(songs);

  assert.equal(result.length, 0);
});

/* -----------------------------
   LONGEST STREAK
--------------------------------*/

test("getLongestStreak finds correct song streak", () => {
  const songs = [
    { title: "A", artist: "X" },
    { title: "A", artist: "X" },
    { title: "B", artist: "Y" },
    { title: "B", artist: "Y" },
    { title: "B", artist: "Y" },
  ];

  const result = getLongestStreak(songs);

  assert.equal(result.song, "B - Y");
  assert.equal(result.length, 3);
});

