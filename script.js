const songs = [
    {
        title: "Neon Dreams",
        artist: "Unknown Artist",
        src: "song1.mp3"
    },
    {
        title: "Midnight Drive",
        artist: "Unknown Artist",
        src: "song2.mp3"
    },
    {
        title: "Cyber Waves",
        artist: "Unknown Artist",
        src: "song3.mp3"
    }
];

let currentSong = 0;

const audio = new Audio();

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

function loadSong(index) {
    const song = songs[index];

    audio.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    progress.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}

function playSong() {
    audio.play();
    playButton.textContent = "⏸";
}

function pauseSong() {
    audio.pause();
    playButton.textContent = "▶";
}

playButton.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener("click", () => {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
});

audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    nextButton.click();
});

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

audio.volume = 1;

loadSong(currentSong);