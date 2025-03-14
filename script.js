// Dati delle canzoni
const songs = [
    {
        title: 'Belong Together -Bush remix',
        artist: 'Bush',
        image: 'covers/belong-together.jpg',
        audio: 'audio/belong-together.mp3'
    },
    {
        title: 'By Your Side',
        artist: 'Bush',
        image: 'covers/by-your-side.jpg',
        audio: 'audio/by-your-side.mp3'
    },
    {
        title: 'Crazy of You',
        artist: 'Bush',
        image: 'covers/crazy-of-you.png',
        audio: 'audio/crazy-of-you'
    },
    {
        title: 'Die Alone -Bush remix',
        artist: 'Bush',
        image: 'covers/die-alone.jpg',
        audio: 'audio/die-alone.mp3'
    },
    {
        title: 'Faded',
        artist: 'Bush',
        image: 'covers/faded.jpg',
        audio: 'audio/faded.m4a' // Formato m4a
    },
    {
        title: 'Fall in Love with U',
        artist: 'Bush',
        image: 'covers/fall-in-love-with-u.jpg',
        audio: 'audio/fall-in-love-with-u.mp3'
    },
    {
        title: 'Forever Young',
        artist: 'Bush',
        image: 'covers/forever-young.jpg',
        audio: 'audio/forever-young.mp3'
    },
    {
        title: 'Forever Young Chill Mix',
        artist: 'Bush',
        image: 'covers/forever-young-chill-mix.jpg',
        audio: 'audio/forever-young-chill-mix.mp3'
    },
    {
        title: 'Hey',
        artist: 'Bush',
        image: 'covers/hey.jpg',
        audio: 'audio/hey.m4a' // Formato m4a
    },
    {
        title: 'Hey VIP Mix',
        artist: 'Bush',
        image: 'covers/hey-vip.jpg',
        audio: 'audio/hey-vip.mp3'
    },
    {
        title: 'I\'ll Be There',
        artist: 'Bush',
        image: 'covers/ill-be-there.jpg',
        audio: 'audio/ill-be-there.mp3'
    },
    {
        title: 'I\'ll Be With U',
        artist: 'Bush',
        image: 'covers/ill-be-with-u.jpg',
        audio: 'audio/ill-be-with-u.mp3'
    },
    {
        title: 'I\'ll Be With U - VIP Mix',
        artist: 'Bush',
        image: 'covers/ill-be-with-u-vip.jpg',
        audio: 'audio/ill-be-with-u-vip.mp3'
    },
    {
        title: 'I\'ll Be With U Pt. 2',
        artist: 'Bush',
        image: 'covers/ill-be-with-u-pt2.jpg',
        audio: 'audio/ill-be-with-u-pt2.mp3'
    },
    {
        title: 'Lost Souls',
        artist: 'Bush',
        image: 'covers/lost-souls.jpg',
        audio: 'audio/lost-souls.mp3'
    },
    {
        title: 'More Than Ever',
        artist: 'Bush',
        image: 'covers/more-than-ever.jpg',
        audio: 'audio/more-than-ever.mp3'
    },
    {
        title: 'Perfect as a Star',
        artist: 'Bush',
        image: 'covers/perfect-as-a-star.jpg',
        audio: 'audio/perfect-as-a-star.mp3'
    },
    {
        title: 'Play -Bush remix',
        artist: 'Bush',
        image: 'covers/play.jpg',
        audio: 'audio/play.mp3'
    },
    {
        title: 'Special Like Stars',
        artist: 'Bush',
        image: 'covers/special-like-stars.jpg',
        audio: 'audio/special-like-stars.m4a' // Formato m4a
    },
    {
        title: 'Still By Your Side',
        artist: 'Bush',
        image: 'covers/still-by-your-side.jpg',
        audio: 'audio/still-by-your-side.mp3'
    },
    {
        title: 'Why Do I',
        artist: 'Bush',
        image: 'covers/why-do-i.jpg',
        audio: 'audio/why-do-i.m4a' // Formato m4a
    }
];

let currentSongIndex = 0;

// Elementi del DOM
const songList = document.querySelector('.song-list');
const songImage = document.querySelector('.song-image img');
const songDetails = document.querySelector('.song-details');
const songTitle = document.querySelector('.song-details h2');
const songArtist = document.querySelector('.song-details p');
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const searchInput = document.getElementById('search');
const downloadBtn = document.getElementById('download');
const progressBar = document.getElementById('progress-bar');

// Elementi per il popup
const watermark = document.getElementById('watermark');
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');
const downloadEchoBtn = document.getElementById('download-echo');
const downloadMusicBtn = document.getElementById('download-music');

// Elemento per il pulsante del menu
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

// Funzione per caricare una canzone con animazioni
function loadSong(songIndex) {
    const song = songs[songIndex];

    // Aggiungi classi per la transizione
    songImage.classList.add('fade-out');
    songDetails.classList.add('fade-out');

    setTimeout(() => {
        // Aggiorna i contenuti
        songImage.src = song.image;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audioPlayer.src = song.audio;
        downloadBtn.href = song.audio;

        // Rimuovi le classi dopo aver aggiornato
        songImage.classList.remove('fade-out');
        songDetails.classList.remove('fade-out');
    }, 500);

    // Resetta la barra di avanzamento
    progressBar.value = 0;
}

let isPlaying = false;

// Funzioni di riproduzione
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.classList.remove('fa-play');
    playPauseBtn.classList.add('fa-pause');
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');
}

playPauseBtn.addEventListener('click', () => {
    isPlaying? pauseSong(): playSong();
});

audioPlayer.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    if (audioPlayer.duration) {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progressPercent;
    }
}

// Cambia la posizione della canzone quando l'utente interagisce con la barra
progressBar.addEventListener('input', () => {
    if (audioPlayer.duration) {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    }
});

audioPlayer.addEventListener('ended', () => {
    nextSong();
});

// Canzone successiva e precedente
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Generazione della lista delle canzoni
function displaySongs(songArray) {
    songList.innerHTML = '';
    songArray.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(li);
    });
}

// Funzione di ricerca
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));
    displaySongs(filteredSongs);
});

// Tema chiaro/scuro basato sulle preferenze del dispositivo
function setTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

setTheme();

// Rileva cambiamenti nel tema del dispositivo
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

// Popup per il download delle app
watermark.addEventListener('click', () => {
    popup.classList.add('show');
});

closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hide');
    setTimeout(() => {
        popup.classList.remove('show', 'hide');
    }, 300);
});

downloadEchoBtn.addEventListener('click', () => {
    // Apri il link di Google Drive in una nuova scheda
    window.open('https://drive.google.com/uc?export=download&id=1JUPShfJYN5Jhd2JDCjxpMClwRJDkqo1P', '_blank');
});

downloadMusicBtn.addEventListener('click', () => {
    window.location.href = 'Music.apk';
});

// Funzione per gestire il menu in modalità mobile
menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// Inizializzazione
displaySongs(songs);
loadSong(currentSongIndex);
