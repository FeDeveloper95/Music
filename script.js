// Dati delle canzoni
const songs = [
    {
        title: 'Home',
        artist: 'Benvenuto!',
        isHome: true // Proprietà speciale per identificare la schermata Home
    },
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

// Nuovi elementi per la vista Home/Player
const homeView = document.getElementById('home-view');
const playerView = document.getElementById('player-view');
const usernameEl = document.getElementById('username');


// Funzione per creare uno "slug" URL-friendly da un titolo
function createSlug(title) {
    if (!title) return '';
    return title.toLowerCase()
        .replace(/\s+/g, '-')           // Sostituisce spazi con -
        .replace(/[^\w\-]+/g, '')       // Rimuove caratteri non validi
        .replace(/\-\-+/g, '-')         // Sostituisce -- multipli con - singolo
        .replace(/^-+/, '')             // Rimuove - dall'inizio
        .replace(/-+$/, '');            // Rimuove - dalla fine
}

// Funzioni per mostrare/nascondere le viste con transizione
function showHomeView() {
    homeView.classList.remove('view-hidden');
    playerView.classList.add('view-hidden');
    
    // Logica aggiuntiva per resettare lo stato del player
    pauseSong();
    audioPlayer.src = '';
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.playbackState = "none";
    }
    // Pulisce l'hash dall'URL senza aggiungere alla cronologia
    history.pushState("", document.title, window.location.pathname + window.location.search);
}

function showPlayerView() {
    homeView.classList.add('view-hidden');
    playerView.classList.remove('view-hidden');
}

// Funzione per caricare una canzone
function loadSong(songIndex) {
    if (songIndex < 0 || songIndex >= songs.length) {
        currentSongIndex = 0; 
        songIndex = 0;
    }
    
    const song = songs[songIndex];

    if (song.isHome) {
        showHomeView();
        return;
    }

    showPlayerView();

    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;

    if (downloadBtn) {
        downloadBtn.href = song.audio;
        const audioFileName = song.audio.substring(song.audio.lastIndexOf('/') + 1);
        downloadBtn.download = `${song.artist} - ${song.title}.${audioFileName.split('.').pop()}`;
    }

    audioPlayer.src = song.audio;
    // Aggiorna l'hash dell'URL per il deep linking
    location.hash = song.slug;

    songImageEl.classList.add('fade-out');
    setTimeout(() => {
        songImageEl.src = song.image;
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: 'Bush Music Collection',
                artwork: [
                    { src: song.image, sizes: '128x128', type: 'image/jpeg' },
                    { src: song.image, sizes: '256x256', type: 'image/jpeg' },
                    { src: song.image, sizes: '512x512', type: 'image/jpeg' }
                ]
            });
        }
        songImageEl.classList.remove('fade-out');
    }, 150); 

    progressBar.value = 0;
}

// Funzione di riproduzione
function playSong() {
    if (songs.length === 0 || !audioPlayer.src || audioPlayer.src === window.location.href || audioPlayer.src.endsWith('/null')) {
        pauseSong();
        return;
    }

    const doPlay = () => {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isPlaying = true;
                playPauseBtn.classList.remove('fa-play');
                playPauseBtn.classList.add('fa-pause');
                if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
            }).catch(error => {
                console.error("Autoplay bloccato o errore di riproduzione:", error);
                pauseSong();
            });
        }
    };

    if (audioPlayer.readyState >= 4) {
        doPlay();
    } else {
        const canPlayThroughListener = () => {
            doPlay();
            audioPlayer.removeEventListener('canplaythrough', canPlayThroughListener);
            audioPlayer.removeEventListener('error', errorListener);
        };
        const errorListener = (e) => {
            console.error("Errore caricamento audio:", e);
            pauseSong();
            audioPlayer.removeEventListener('canplaythrough', canPlayThroughListener);
            audioPlayer.removeEventListener('error', errorListener);
        };
        audioPlayer.addEventListener('canplaythrough', canPlayThroughListener, { once: true });
        audioPlayer.addEventListener('error', errorListener, { once: true });
    }
}

// Funzione Pausa
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.classList.remove('fa-pause');
    playPauseBtn.classList.add('fa-play');
    if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = "paused";
    }
}

// Evento click Play/Pausa
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

// Logica canzone terminata
audioPlayer.addEventListener('ended', () => {
    if (songs.length <= 1) return; 

    if (repeatMode === 2) {
        audioPlayer.currentTime = 0;
        playSong();
    } else {
        handleNextSong();
    }
});

// Funzione per gestire la prossima canzone
function handleNextSong() {
    if (songs.length <= 1) { 
        pauseSong();
        return;
    }

    let previousSongIndex = currentSongIndex;

    if (isShuffle) {
        if (songs.length > 2) { 
            do {
                currentSongIndex = Math.floor(Math.random() * (songs.length - 1)) + 1;
            } while (currentSongIndex === previousSongIndex);
        } else {
             currentSongIndex = 1; 
        }
    } else {
        currentSongIndex++;
    }

    if (currentSongIndex >= songs.length) {
        if (repeatMode === 1) { 
            currentSongIndex = 1; 
        } else {
            currentSongIndex = 0; 
        }
    }
    
    loadSong(currentSongIndex);
    if (!songs[currentSongIndex].isHome) {
        playSong();
    }
}

nextBtn.addEventListener('click', handleNextSong);

// Canzone precedente
function handlePrevSong() {
    if (songs.length <= 1) return;
    
    currentSongIndex--;
    if (currentSongIndex < 1) { 
        currentSongIndex = songs.length - 1; 
    }

    loadSong(currentSongIndex);
    if (!songs[currentSongIndex].isHome) {
        playSong();
    }
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
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    } else if (repeatMode === 2) {
        repeatBtn.classList.add('active-repeat-one');
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i><span class="repeat-one-badge">1</span>';
    } else {
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    }
}
repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    updateRepeatButtonState();
});

// Generazione lista canzoni
function displaySongs(songArray) {
    songListEl.innerHTML = '';
    if (songArray.length === 0) {
        const li = document.createElement('li');
        li.textContent = "Nessuna canzone disponibile.";
        li.style.textAlign = "center";
        li.style.cursor = "default";
        songListEl.appendChild(li);
        return;
    }

    songArray.forEach((song) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.tabIndex = 0;
        li.setAttribute('role', 'button');

        li.addEventListener('click', () => {
            const originalIndex = songs.findIndex(s => s.title === song.title && s.artist === song.artist);
            if (originalIndex !== -1) {
                currentSongIndex = originalIndex;
                loadSong(currentSongIndex);
                if (!song.isHome) {
                    playSong();
                }
                if (sidebar.classList.contains('show')) {
                    sidebar.classList.remove('show');
                }
            }
        });
        li.addEventListener('keydown', (e) => {
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
    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        (song.artist && song.artist.toLowerCase().includes(query))
    );
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
    navigator.mediaSession.setActionHandler('play', () => { if (!songs[currentSongIndex].isHome) playSong(); });
    navigator.mediaSession.setActionHandler('pause', () => { if (!songs[currentSongIndex].isHome) pauseSong(); });
    navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong);
    navigator.mediaSession.setActionHandler('nexttrack', handleNextSong);
}

// Gestione Nome Utente
function loadUsername() {
    const savedName = localStorage.getItem('musicPlayerUsername');
    if (savedName) {
        usernameEl.textContent = savedName;
    }
}

function saveUsername() {
    const newName = usernameEl.textContent.trim().replace(/<br>/g, '');
    if (newName) {
        localStorage.setItem('musicPlayerUsername', newName);
    } else {
        usernameEl.textContent = 'utente';
        localStorage.removeItem('musicPlayerUsername');
    }
}

usernameEl.addEventListener('blur', saveUsername);
usernameEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        usernameEl.blur();
    }
});

// Inizializzazione
function initializePlayer() {
    // 1. Genera slug per ogni canzone
    songs.forEach(song => {
        if (!song.isHome) {
            song.slug = createSlug(song.title);
        }
    });

    loadUsername();
    displaySongs(songs);

    // 2. Controlla se c'è una canzone nell'hash dell'URL
    const songSlug = location.hash.substring(1);
    let startingIndex = 0; // Default a Home (indice 0)

    if (songSlug) {
        const songIndexFromSlug = songs.findIndex(s => s.slug === songSlug);
        if (songIndexFromSlug !== -1) {
            startingIndex = songIndexFromSlug;
        }
    }

    currentSongIndex = startingIndex;
    loadSong(currentSongIndex);
    
    // 3. Se si parte da una canzone specifica, prova a riprodurla
    if (startingIndex !== 0) {
        setTimeout(() => {
            playSong(); // L'autoplay potrebbe essere bloccato dal browser
        }, 200); // Piccolo ritardo per dare tempo al browser di caricare
    }

    updateRepeatButtonState();
}

// Avvia tutto
initializePlayer();
