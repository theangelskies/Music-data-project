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

