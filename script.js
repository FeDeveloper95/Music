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
    if (songIndex < 0 || songIndex >= songs.length) {
        if (songs.length > 0) {
            currentSongIndex = 0; // Fallback alla prima canzone se l'indice è errato
            songIndex = 0;
        } else {
            // Caso in cui non ci sono canzoni
            songImageEl.src = 'covers/default-cover.jpg';
            songTitleEl.textContent = 'Nessuna canzone';
            songArtistEl.textContent = '';
            if (audioPlayer.src !== '') audioPlayer.src = ''; // Pulisci src solo se necessario
            if (downloadBtn) {
                downloadBtn.href = '#';
                downloadBtn.download = '';
            }
            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = null;
                navigator.mediaSession.playbackState = "none";
            }
            progressBar.value = 0;
            return;
        }
    }
    const song = songs[songIndex];

    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;

    if (downloadBtn) {
        downloadBtn.href = song.audio;
        const audioFileName = song.audio.substring(song.audio.lastIndexOf('/') + 1);
        downloadBtn.download = `${song.artist} - ${song.title}.${audioFileName.split('.').pop()}`;
    }

    // Imposta la sorgente audio. Il browser è generalmente intelligente nel non ricaricare
    // se l'URL assoluto risultante è lo stesso di quello corrente.
    // Questo avvierà il processo di caricamento del browser se src è nuovo.
    audioPlayer.src = song.audio;

    songImageEl.classList.add('fade-out');
    setTimeout(() => {
        songImageEl.src = song.image;
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: 'Bush Music Collection',
                artwork: [ // Fornisci artwork per la Media Session API
                    { src: song.image, sizes: '128x128', type: 'image/jpeg' },
                    { src: song.image, sizes: '256x256', type: 'image/jpeg' },
                    { src: song.image, sizes: '512x512', type: 'image/jpeg' }
                ]
            });
        }
        songImageEl.classList.remove('fade-out');
    }, 150); // Timeout per l'effetto visivo dell'immagine

    progressBar.value = 0; // Resetta la barra di avanzamento
}

// Funzione di riproduzione
function playSong() {
    if (songs.length === 0 || !audioPlayer.src || audioPlayer.src === window.location.href || audioPlayer.src.endsWith('/null')) {
        pauseSong(); // Assicura che l'UI sia in stato di pausa se non c'è nulla da riprodurre
        return;
    }

    const doPlay = () => {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Riproduzione avviata con successo
                isPlaying = true;
                playPauseBtn.classList.remove('fa-play');
                playPauseBtn.classList.add('fa-pause');
                if ('mediaSession' in navigator) navigator.mediaSession.playbackState = "playing";
            }).catch(error => {
                // Errore durante audioPlayer.play() (es. autoplay bloccato dal browser)
                console.error("Errore audioPlayer.play():", error);
                pauseSong(); // Torna allo stato di pausa se play() è rifiutato
            });
        }
    };

    // Controlla se il media è pronto per la riproduzione
    // readyState 4 === HTMLMediaElement.HAVE_ENOUGH_DATA (può suonare fino alla fine)
    if (audioPlayer.readyState >= 4) {
        doPlay();
    } else {
        // Se non è pronto, attendi l'evento 'canplaythrough'
        const canPlayThroughListener = () => {
            doPlay();
            // Rimuovi i listener una volta usati per evitare duplicazioni
            audioPlayer.removeEventListener('canplaythrough', canPlayThroughListener);
            audioPlayer.removeEventListener('error', errorListener);
        };
        const errorListener = (e) => {
            console.error("Errore caricamento audio:", e);
            pauseSong();
            audioPlayer.removeEventListener('canplaythrough', canPlayThroughListener);
            audioPlayer.removeEventListener('error', errorListener);
        };
        // Aggiungi listener una tantum
        audioPlayer.addEventListener('canplaythrough', canPlayThroughListener, { once: true });
        audioPlayer.addEventListener('error', errorListener, { once: true });
        // In alcuni casi, potrebbe essere necessario chiamare audioPlayer.load() se il caricamento si blocca,
        // ma solitamente non è necessario se .src è stato appena modificato.
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
    if (songs.length === 0) return;

    if (repeatMode === 2) { // Repeat One
        audioPlayer.currentTime = 0; // Riavvolgi
        playSong(); // E suona di nuovo
    } else {
        handleNextSong();
    }
});

// Funzione per gestire la prossima canzone
function handleNextSong() {
    if (songs.length === 0) {
        pauseSong();
        return;
    }
    // Gestione del caso con una sola canzone
    if (songs.length === 1 && repeatMode !== 2) {
        // Se non è "repeat one" (già gestito da 'ended'), riavvolgi e suona.
        audioPlayer.currentTime = 0;
        playSong();
        return;
    }

    let previousSongIndex = currentSongIndex;

    if (isShuffle) {
        if (songs.length > 1) {
            do {
                currentSongIndex = Math.floor(Math.random() * songs.length);
            } while (currentSongIndex === previousSongIndex);
        } else {
             currentSongIndex = 0; // Unica canzone disponibile
        }
    } else { // No shuffle
        currentSongIndex++;
    }

    // Gestione fine lista e modalità repeat
    if (currentSongIndex >= songs.length) {
        if (repeatMode === 1) { // Repeat All
            currentSongIndex = 0;
        } else if (repeatMode === 0 && !isShuffle) { // No Repeat e No Shuffle
            currentSongIndex = 0; // Torna alla prima canzone
            loadSong(currentSongIndex);
            playSong(); // Riproduci automaticamente
            return;     // Uscita anticipata perché la gestione è completa
        } else {
            // Altri casi (es. shuffle che finisce, o stato imprevisto), torna a 0
            currentSongIndex = 0;
        }
    }
    loadSong(currentSongIndex);
    playSong();
}

nextBtn.addEventListener('click', handleNextSong);

// Canzone precedente
function handlePrevSong() {
    if (songs.length === 0) return;
    if (songs.length === 1) {
        audioPlayer.currentTime = 0; // Riavvolgi se c'è una sola canzone
        playSong();
        return;
    }
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
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
            const originalIndex = songs.findIndex(s => s.audio === song.audio && s.title === song.title);
            if (originalIndex !== -1) {
                currentSongIndex = originalIndex;
                loadSong(currentSongIndex);
                playSong();
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
        (song.artist && song.artist.toLowerCase().includes(query)) // Aggiunto controllo per artist
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
    navigator.mediaSession.setActionHandler('play', () => { if (songs.length > 0) playSong(); });
    navigator.mediaSession.setActionHandler('pause', () => { if (songs.length > 0) pauseSong(); });
    navigator.mediaSession.setActionHandler('previoustrack', () => { if (songs.length > 0) handlePrevSong(); });
    navigator.mediaSession.setActionHandler('nexttrack', () => { if (songs.length > 0) handleNextSong(); });
}

// Inizializzazione
function initializePlayer() {
    displaySongs(songs);
    if (songs.length > 0) {
        loadSong(currentSongIndex); // Carica la prima canzone
        pauseSong(); // Assicura che l'UI sia "paused" e pronta per il play dell'utente
    } else {
        // Gestisci UI per nessuna canzone, se necessario (loadSong lo fa già in parte)
        loadSong(-1); // Chiama loadSong per impostare lo stato "nessuna canzone"
        pauseSong();
    }
    updateRepeatButtonState();
}

initializePlayer();
