import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

export const countUsers = () => getUserIDs().length;

export const countBy = (arr, keyFn) => {
  const map = new Map();
  arr.forEach((item) => {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  });
  return map;
};

export const maxByValue = (map) => {
  if (map.size === 0) return undefined;

  let maxKey;
  let maxValue = -Infinity;

  for (const [key, value] of map.entries()) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }

  return maxKey;
};

export const formatSong = (song) => `${song.title} - ${song.artist}`;

export const filterFridayNight = (songs) =>
  songs.filter((s) => {
    const date = new Date(s.timestamp);
    const day = date.getDay();
    const hour = date.getHours();
    return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
  });

export const getLongestStreak = (songs) => {
  if (!songs.length) return null;

  let longest = { song: "", length: 0 };
  let currentSong = null;
  let currentCount = 0;

  const updateLongest = () => {
    if (currentCount > longest.length) {
      longest = { song: currentSong, length: currentCount };
    }
  };

  songs.forEach((s) => {
    const id = s.song_id ?? `${s.title}|${s.artist}`;

    if (id === currentSong) {
      currentCount++;
    } else {
      updateLongest();
      currentSong = id;
      currentCount = 1;
    }
  });

  updateLongest();

  let title;
  let artist;

  if (songs[0].song_id) {
    const songData = getSong(longest.song);
    title = songData.title;
    artist = songData.artist;
  } else {
    [title, artist] = longest.song.split("|");
  }

  return {
    song: `${title} - ${artist}`,
    length: longest.length,
  };
};

export const getEveryDaySongs = (songs) => {
  if (!songs.length) return [];

  const dates = songs.map((s) => new Date(s.timestamp));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const allDays = new Set();

  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDays.add(d.toISOString().split("T")[0]);
  }

  const map = new Map();

  songs.forEach((s) => {
    const name = formatSong(s);
    const day = s.timestamp.split("T")[0];

    if (!map.has(name)) map.set(name, new Set());
    map.get(name).add(day);
  });

  return [...map.entries()]
    .filter(([, set]) => set.size === allDays.size)
    .map(([song]) => song);
};

export const getTopGenres = (songs, n = 3) => {
  const map = countBy(songs, (s) => s.genre);

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)
    .slice(0, n);
};

export const analyzeUser = (userID) => {
  const events = getListenEvents(userID);

  if (!events || events.length === 0) return null;

  const songs = events.map((e) => ({
    ...e,
    ...getSong(e.song_id),
  }));

  const mostSongCount = maxByValue(countBy(songs, (s) => formatSong(s)));
  const mostArtistCount = maxByValue(countBy(songs, (s) => s.artist));

  const mostSongTime = maxByValue(
    songs.reduce((map, s) => {
      const name = formatSong(s);
      map.set(name, (map.get(name) || 0) + s.duration_seconds);
      return map;
    }, new Map()),
  );

  const mostArtistTime = maxByValue(
    songs.reduce((map, s) => {
      map.set(s.artist, (map.get(s.artist) || 0) + s.duration_seconds);
      return map;
    }, new Map()),
  );

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

  const longestStreak = getLongestStreak(songs);
  const everyDaySongs = getEveryDaySongs(songs);
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
