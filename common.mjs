import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

// ----------------------
// Basic Helpers
// ----------------------

export const countUsers = () => getUserIDs().length;

export const countBy = (arr, keyFn) => {

  return map;
};
export const maxByValue = (map) => {
  if (map.size === 0) return undefined;

    }
    export const formatSong = (song) => `${song.title} - ${song.artist}`;

    // ----------------------
    // Friday Night Filtering
    // Friday 17:00 → Saturday 04:00
    // ----------------------

    export const filterFridayNight = (songs) =>
      songs.filter((s) => {
   
      });

// ----------------------
// Longest Consecutive Streak
// ----------------------

export const getLongestStreak = (songs) => {
  if (!songs.length) return null;

  let longest = { song: "", length: 0 };
  let currentSong = null;
  let currentCount = 0;

  songs.forEach((s) => {
    const name = formatSong(s);

    if (name === currentSong) {
      currentCount++;
    } else {
      if (currentCount > longest.length) {
        longest = { song: currentSong, length: currentCount };
      }

      currentSong = name;
      currentCount = 1;
    }
  });

  if (currentCount > longest.length) {
    longest = { song: currentSong, length: currentCount };
  }

  return longest;
};

// ----------------------
// Songs listened every day
// ----------------------

export const getEveryDaySongs = (songs) => {
  if (!songs.length) return [];

  const days = [...new Set(songs.map((s) => s.timestamp.split("T")[0]))];

  const map = new Map();

  songs.forEach((s) => {
    const name = formatSong(s);
    const day = s.timestamp.split("T")[0];

    if (!map.has(name)) {
      map.set(name, new Set());
    }

    map.get(name).add(day);
  });

  return [...map.entries()]
    .filter(([song, set]) => set.size === days.length)
    .map(([song]) => song);
};

// ----------------------
// Top Genres
// ----------------------

export const getTopGenres = (songs, n = 3) => {
  const map = countBy(songs, (s) => s.genre);

  


// ----------------------
// Songs listened every day
// ----------------------

export const getEveryDaySongs = (songs) => {
  if (!songs.length) return [];

  const days = [...new Set(songs.map((s) => s.timestamp.split("T")[0]))];

  const map = new Map();

  songs.forEach((s) => {
    const name = formatSong(s);
    const day = s.timestamp.split("T")[0];

    if (!map.has(name)) {
      map.set(name, new Set());
    }

    map.get(name).add(day);
  });

  return [...map.entries()]
    .filter(([song, set]) => set.size === days.length)
    .map(([song]) => song);
};

// ----------------------
// Top Genres
// ----------------------

export const getTopGenres = (songs, n = 3) => {
  const map = countBy(songs, (s) => s.genre);

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)
    .slice(0, n);
};

// ----------------------
// Main Analysis
// ----------------------

export const analyzeUser = (userID) => {
  const events = getListenEvents(userID);

  if (!events || events.length === 0) {
    return null;
  }

  const songs = events.map((e) => ({
    ...e,
    ...getSong(e.song_id),
  }));

  // Most listened song (count)
  const mostSongCount = maxByValue(countBy(songs, (s) => formatSong(s)));

  // Most listened artist (count)
  const mostArtistCount = maxByValue(countBy(songs, (s) => s.artist));

  // Most listened song (time)
  const mostSongTime = maxByValue(
    songs.reduce((map, s) => {
      const name = formatSong(s);
      map.set(name, (map.get(name) || 0) + s.duration_seconds);
      return map;
    }, new Map()),
  );

  // Most listened artist (time)
  const mostArtistTime = maxByValue(
    songs.reduce((map, s) => {
      map.set(s.artist, (map.get(s.artist) || 0) + s.duration_seconds);
      return map;
    }, new Map()),
  );

  // Friday night songs
  const fridaySongs = filterFridayNight(songs);

  const fridaySongsCount = fridaySongs.length
    ? maxByValue(countBy(fridaySongs, (s) => formatSong(s)))
    : null;

  const fridaySongsTime = fridaySongs.length
    ? maxByValue(
        fridaySongs.reduce((map, s) => {
          const name = formatSong(s);
          map.set(name, (map.get(name) || 0) + s.duration_seconds);
          return map;
        }, new Map()),
      )
    : null;

  // Longest streak
  const longestStreak = getLongestStreak(songs);

  // Songs listened every day
  const everyDaySongs = getEveryDaySongs(songs);

  // Top genres
  const topGenres = getTopGenres(songs);

  return {
    mostSongCount,
    mostArtistCount,
    mostSongTime,
    mostArtistTime,
    fridaySongsCount,
    fridaySongsTime,
    longestStreak,
    everyDaySongs,
    topGenres,
  };
};
