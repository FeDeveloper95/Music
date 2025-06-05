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
        audio: 'audio/crazy-of-you.mp3'
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
        title: 'On my way',
        artist: 'Bush, Alan Walker, Sabrina Carpenter',
        image: 'covers/on-my-way.jpg',
        audio: 'audio/on-my-way.mp3'
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
        title: 'Whatever',
        artist: 'Bush',
        image: 'covers/Whatever.png',
        audio: 'audio/Whatever.mp3'
    },
    {
        title: 'Why Do I',
        artist: 'Bush',
        image: 'covers/why-do-i.jpg',
        audio: 'audio/why-do-i.m4a' // Formato m4a
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one

// Elementi del DOM
const songListEl = document.querySelector('.song-list');
const songImageEl = document.querySelector('.song-image img');
const songDetailsEl = document.querySelector('.song-details');
const songTitleEl = document.querySelector('.song-details h2');
const songArtistEl = document.querySelector('.song-details p');
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const searchInput = document.getElementById('search');
const downloadBtn = document.getElementById('download');
const progressBar = document.getElementById('progress-bar');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');

const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

// Funzione per caricare una canzone
function loadSong(songIndex) {
    const song = songs[songIndex];

    songImageEl.classList.add('fade-out');
    setTimeout(() => {
        songImageEl.src = song.image;
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        audioPlayer.src = song.audio;
        if (downloadBtn) {
            downloadBtn.href = song.audio;
            // Imposta il nome del file per il download (opzionale, ma migliora l'UX)
            // Estrai il nome del file dal percorso audio
            const audioFileName = song.audio.substring(song.audio.lastIndexOf('/') + 1);
            downloadBtn.download = `${song.artist} - ${song.title}.${audioFileName.split('.').pop()}`;

        }
        songImageEl.classList.remove('fade-out');

        // Media Session API
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: 'Bush Music Collection', // Puoi personalizzare o lasciare vuoto
                artwork: [
                    // È buona norma fornire diverse dimensioni se disponibili
                    // Per ora usiamo la stessa immagine, il browser/OS la scalerà
                    { src: song.image, sizes: '128x128', type: 'image/png' }, // Adatta tipo se usi jpg
                    { src: song.image, sizes: '256x256', type: 'image/png' },
                    { src: song.image, sizes: '512x512', type: 'image/png' }
                ]
            });
        }
    }, 300);
    progressBar.value = 0;
}

// Funzioni di riproduzione
function playSong() {
    audioPlayer.play().then(() => {
        isPlaying = true;
        playPauseBtn.classList.remove('fa-play');
        playPauseBtn.classList.add('fa-pause');
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = "playing";
        }
    }).catch(error => console.error("Errore durante la riproduzione:", error));
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = "paused";
    }
}

playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

// Barra di avanzamento
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});
progressBar.addEventListener('input', () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});

// Logica canzone terminata (Shuffle/Repeat)
audioPlayer.addEventListener('ended', () => {
    if (repeatMode === 2) { // Repeat One
        audioPlayer.currentTime = 0;
        playSong();
    } else {
        handleNextSong(); // Chiama la logica per la prossima canzone
    }
});

// Funzione per gestire la prossima canzone (chiamata da nextBtn e da 'ended')
function handleNextSong() {
    let previousSongIndex = currentSongIndex; // Per evitare ripetizione immediata in shuffle

    if (isShuffle) {
        if (songs.length <= 1) {
            currentSongIndex = 0;
        } else {
            do {
                currentSongIndex = Math.floor(Math.random() * songs.length);
            } while (currentSongIndex === previousSongIndex); // Evita di suonare la stessa canzone di fila
        }
    } else { // No shuffle
        currentSongIndex++;
    }

    // Gestione fine lista e repeat all
    if (currentSongIndex >= songs.length) {
        if (repeatMode === 1) { // Repeat All
            currentSongIndex = 0;
        } else { // No repeat (e non shuffle, o shuffle ha esaurito le opzioni non ripetute)
            if (!isShuffle) { // Se non è shuffle, fermati alla fine della lista (o vai all'inizio e metti in pausa)
                currentSongIndex = 0; 
                loadSong(currentSongIndex);
                pauseSong();
                return; // Esci per non avviare la riproduzione automatica
            }
            // Se è shuffle e in qualche modo si arriva qui (improbabile con la logica do-while), 
            // si potrebbe reimpostare o gestire diversamente, ma la logica attuale dovrebbe prevenire.
        }
    }
    
    loadSong(currentSongIndex);
    playSong(); // Riproduci la nuova canzone caricata
}

nextBtn.addEventListener('click', handleNextSong);

// Canzone precedente (ignora shuffle per semplicità, fa il giro della lista)
function handlePrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong(); // Riproduci sempre quando si preme manualmente prev
}
prevBtn.addEventListener('click', handlePrevSong);


// Shuffle
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active-shuffle', isShuffle);
});

// Repeat
function updateRepeatButtonState() {
    repeatBtn.classList.remove('active-repeat-all', 'active-repeat-one');
    if (repeatMode === 1) {
        repeatBtn.classList.add('active-repeat-all');
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>'; // Icona standard per repeat all
    } else if (repeatMode === 2) {
        repeatBtn.classList.add('active-repeat-one');
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i><span class="repeat-one-badge">1</span>'; // Icona con badge '1'
    } else {
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>'; // Icona standard quando off
    }
}
repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    updateRepeatButtonState();
});


// Generazione lista canzoni
function displaySongs(songArray) {
    songListEl.innerHTML = '';
    songArray.forEach((song) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.tabIndex = 0; // Per accessibilità (navigazione da tastiera)
        li.setAttribute('role', 'button');

        li.addEventListener('click', () => {
            currentSongIndex = songs.indexOf(song);
            loadSong(currentSongIndex);
            playSong();
            if (sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
        li.addEventListener('keydown', (e) => { // Per accessibilità
            if (e.key === 'Enter' || e.key === ' ') {
                li.click();
            }
        });
        songListEl.appendChild(li);
    });
}

// Ricerca
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query));
    displaySongs(filteredSongs);
});

// Tema Chiaro/Scuro
function setTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
}
setTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);

// Menu Mobile
if (menuButton && sidebar) {
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
}

// Media Session Action Handlers
if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', playSong);
    navigator.mediaSession.setActionHandler('pause', pauseSong);
    navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong);
    navigator.mediaSession.setActionHandler('nexttrack', handleNextSong);
    // Potresti aggiungere 'seekbackward', 'seekforward', 'stop' ecc.
}


// Inizializzazione
displaySongs(songs);
loadSong(currentSongIndex);
updateRepeatButtonState(); // Imposta stato iniziale bottone repeat
