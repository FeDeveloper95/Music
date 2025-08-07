document.addEventListener('DOMContentLoaded', () => {
    // --- DATI ---
    const songs = [
        { title: 'Home', artist: 'Benvenuto!', isHome: true },
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
            title: 'Can\'t Go Back',
            artist: 'Bush',
            image: 'covers/cant-go-back.png',
            audio: 'audio/cant-go-back.mp3'
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
            audio: 'audio/faded.m4a'
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
            audio: 'audio/hey.m4a'
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
            title: 'North Star',
            artist: 'Bush',
            image: 'covers/north-star.jpg',
            audio: 'audio/north-star.mp3'
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
            audio: 'audio/special-like-stars.m4a'
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
            audio: 'audio/why-do-i.m4a'
        }
    ];
    let currentSongIndex = 0, isPlaying = false, isShuffle = false, repeatMode = 0;
    let touchStartX = 0, touchEndX = 0;

    // --- ELEMENTI DEL DOM ---
    const appContainer = document.querySelector('.app-container');
    const songListEl = document.getElementById('song-list');
    const songImageEl = document.querySelector('.song-image img');
    const songImageTouchArea = document.getElementById('song-image-touch-area');
    const songTitleEl = document.querySelector('.song-details h2');
    const songArtistEl = document.querySelector('.song-details p');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const playPauseIcon = playPauseBtn.querySelector('.material-symbols-outlined');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const searchInput = document.getElementById('search');
    const shuffleBtn = document.getElementById('shuffle');
    const repeatBtn = document.getElementById('repeat');
    const homeView = document.getElementById('home-view');
    const playerView = document.getElementById('player-view');
    const usernameEl = document.getElementById('username');
    const welcomeMessageEl = document.getElementById('welcome-message');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const mobileNav = document.getElementById('mobile-nav');
    const easterEggContainer = document.getElementById('easter-egg-container');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const progressBar = document.getElementById('progress-bar');
    const toastNotification = document.getElementById('toast-notification');
    const offlineIndicator = document.getElementById('offline-indicator');

    // Viste e Menu
    const views = {
        info: document.getElementById('info-view'),
        changelog: document.getElementById('changelog-view'),
        theme: document.getElementById('theme-view'),
    };
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    
    // Pulsanti
    const buttons = {
        theme: document.getElementById('theme-btn'),
        downloadAll: document.getElementById('download-all-btn'),
        copyLink: document.getElementById('copy-link-btn'),
        changelog: document.getElementById('changelog-btn'),
        info: document.getElementById('info-btn'),
        download: document.getElementById('download-btn'),
        share: document.getElementById('share-btn'),
        closeInfo: document.getElementById('close-info-btn'),
        closeChangelog: document.getElementById('close-changelog-btn'),
        closeTheme: document.getElementById('close-theme-btn'),
    };
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    
    // --- FUNZIONI DI CONTROLLO UI ---
    function showMainView(viewName) {
        homeView.classList.toggle('hidden', viewName !== 'home');
        playerView.classList.toggle('hidden', viewName !== 'player');
    }

    function toggleSidebar(show) { appContainer.classList.toggle('sidebar-open', show); }
    
    function togglePopup(viewName, show) {
        if (views[viewName]) {
            views[viewName].classList.toggle('hidden', !show);
        }
    }

    function showToast(message) {
        toastNotification.textContent = message;
        toastNotification.classList.add('visible');
        setTimeout(() => toastNotification.classList.remove('visible'), 3000);
    }
    
    // --- FUNZIONI PLAYER (Versione Semplificata e Stabile) ---
    const playSong = () => {
        if (!audioPlayer.src || audioPlayer.src.endsWith('#')) return;
        audioPlayer.play().then(() => {
            isPlaying = true;
            updatePlayerStateUI();
        }).catch(error => {
            console.error("Errore di riproduzione:", error);
            isPlaying = false;
            updatePlayerStateUI();
        });
    };
    
    const pauseSong = () => {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayerStateUI();
    };

    function updatePlayerStateUI() {
        playPauseBtn.classList.toggle('is-playing', isPlaying);
        playPauseIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    }
    
    function formatSongTitleForUrl(title) {
        return title.toLowerCase()
            .replace(/[àáâãäå]/g, 'a').replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i').replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u').replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-').replace(/^-+|-+$/g, '');
    }
    
    function loadSong(songIndex, autoPlay = false) {
        const song = songs[songIndex];
        if (!song) return;

        if (currentSongIndex > 0) {
            localStorage.setItem(`song_pos_${currentSongIndex}`, audioPlayer.currentTime);
        }

        currentSongIndex = songIndex;
        document.querySelectorAll('.song-list li.active').forEach(item => item.classList.remove('active'));
        document.querySelectorAll(`.song-list li[data-index="${songIndex}"]`).forEach(item => item.classList.add('active'));

        if (song.isHome) {
            showMainView('home');
            history.pushState(null, '', window.location.pathname);
            if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
            if (isPlaying) pauseSong();
            buttons.download.style.display = 'none';
            buttons.share.style.display = 'none';
            return;
        }

        showMainView('player');
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        songImageEl.src = song.image;
        audioPlayer.src = song.audio;

        buttons.download.style.display = 'grid';
        buttons.share.style.display = 'grid';

        const songUrlTitle = formatSongTitleForUrl(song.title);
        history.pushState(null, '', '#' + songUrlTitle);

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: song.title,
                artist: song.artist,
                album: 'Music',
                artwork: [{ src: song.image, sizes: '512x512', type: 'image/png' }]
            });
        }

        const savedPosition = localStorage.getItem(`song_pos_${currentSongIndex}`);
        audioPlayer.oncanplaythrough = () => {
            if (savedPosition) {
                audioPlayer.currentTime = parseFloat(savedPosition);
            }
            if (autoPlay) {
                playSong();
            }
            audioPlayer.oncanplaythrough = null;
        };

        if (!autoPlay) {
            pauseSong();
        }
    }

    function handleNextSong() {
        if (isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * (songs.length - 1)) + 1;
            } while (songs.length > 2 && newIndex === currentSongIndex);
            currentSongIndex = newIndex;
        } else {
            currentSongIndex++;
            if (currentSongIndex >= songs.length) currentSongIndex = (repeatMode === 1) ? 1 : 0;
        }
        loadSong(currentSongIndex, true);
    }

    function handlePrevSong() {
        if (audioPlayer.currentTime > 3) {
            audioPlayer.currentTime = 0;
        } else {
            currentSongIndex--;
            if (currentSongIndex < 1) currentSongIndex = songs.length - 1;
            loadSong(currentSongIndex, true);
        }
    }

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
    }

    function updateProgressBar() {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progressPercent;
            progressBar.style.backgroundSize = `${progressPercent}% 100%`;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        } else {
            progressBar.value = 0;
            progressBar.style.backgroundSize = '0% 100%';
        }
    }

    // --- FUNZIONI TEMA ---
    const applyTheme = (theme) => {
        document.body.classList.remove('light-theme', 'dark-theme');
        if (theme === 'dark' || theme === 'light') {
            document.body.classList.add(`${theme}-theme`);
        }
        localStorage.setItem('theme', theme);
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        document.getElementById(`theme-${savedTheme}`).checked = true;
        applyTheme(savedTheme);
    };

    // --- RENDERIZZAZIONE LISTA ---
    function renderSongList(songsToRender) {
        songListEl.innerHTML = '';
        const homeLi = document.createElement('li');
        homeLi.classList.add('home-list-item');
        homeLi.dataset.index = 0;
        homeLi.innerHTML = `<span class="material-symbols-outlined">home</span>Home`;
        homeLi.addEventListener('click', () => { loadSong(0); toggleSidebar(false); });
        songListEl.appendChild(homeLi);

        songsToRender.forEach(song => {
            if (song.isHome) return;
            const songIndex = songs.indexOf(song);
            const li = document.createElement('li');
            li.dataset.index = songIndex;
            li.innerHTML = `<img src="${song.image}" width="40" height="40" loading="lazy"><div><div style="font-weight: 500;">${song.title}</div><div style="font-size: 14px; color: var(--text-secondary);">${song.artist}</div></div>`;
            li.addEventListener('click', () => { loadSong(songIndex, true); toggleSidebar(false); });
            songListEl.appendChild(li);
        });
    }

    // --- FUNZIONALITÀ AGGIUNTIVE ---
    const updateRepeatButton = () => {
        repeatBtn.classList.toggle('active', repeatMode > 0);
        repeatBtn.querySelector('.material-symbols-outlined').textContent = repeatMode === 2 ? 'repeat_one' : 'repeat';
    };

    const loadUsername = () => {
        const name = localStorage.getItem('musicPlayerUsername') || 'utente';
        usernameEl.textContent = name;
        welcomeMessageEl.classList.toggle('hidden', name.toLowerCase() !== 'utente');
    };

    const saveUsername = () => {
        const name = usernameEl.textContent.trim();
        if (name) {
            localStorage.setItem('musicPlayerUsername', name);
            welcomeMessageEl.classList.toggle('hidden', name.toLowerCase() !== 'utente');
            if (name.toLowerCase() === 'gaia') showGaiaEasterEgg();
        }
    };

    function showGaiaEasterEgg() {
        easterEggContainer.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-emoji');
            heart.textContent = '🩵';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            easterEggContainer.appendChild(heart);
        }
        setTimeout(() => easterEggContainer.innerHTML = '', 4000);
    }

    function getSongIndexFromHash(hash) {
        if (!hash) return 0;
        const formattedTitle = hash.replace(/^#/, '');
        const index = songs.findIndex(song => !song.isHome && formatSongTitleForUrl(song.title) === formattedTitle);
        return index > -1 ? index : 0;
    }

    async function downloadAllSongs() {
        showToast("Avvio del download di tutti i brani...");
        for (const song of songs) {
            if (!song.isHome) {
                const link = document.createElement('a');
                link.href = song.audio;
                link.download = `${song.title}.${song.audio.split('.').pop()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                await new Promise(r => setTimeout(r, 500));
            }
        }
    }

    function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast("Link copiato negli appunti!");
        }, () => {
            showToast("Errore nella copia del link.");
        });
    }

    function shareSong() {
        const currentSong = songs[currentSongIndex];
        if (navigator.share && !currentSong.isHome) {
            navigator.share({
                title: `${currentSong.title} - ${currentSong.artist}`,
                text: `Ascolta ${currentSong.title} di ${currentSong.artist}!`,
                url: window.location.href,
            }).catch((error) => console.log('Errore di condivisione', error));
        } else {
            copyLink();
        }
    }

    // --- EVENT LISTENERS ---
    playPauseBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
    nextBtn.addEventListener('click', handleNextSong);
    prevBtn.addEventListener('click', handlePrevSong);

    audioPlayer.addEventListener('timeupdate', () => {
        updateProgressBar();
        if (Math.round(audioPlayer.currentTime) % 5 === 0 && !songs[currentSongIndex].isHome) {
            localStorage.setItem(`song_pos_${currentSongIndex}`, audioPlayer.currentTime);
        }
    });
    audioPlayer.addEventListener('loadedmetadata', updateProgressBar);
    audioPlayer.addEventListener('ended', () => {
        localStorage.removeItem(`song_pos_${currentSongIndex}`);
        if (repeatMode === 2) {
            audioPlayer.currentTime = 0;
            playSong();
        } else {
            handleNextSong();
        }
    });

    progressBar.addEventListener('input', () => {
        if (audioPlayer.duration) audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });

    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        showToast(isShuffle ? "Shuffle attivato" : "Shuffle disattivato");
    });

    repeatBtn.addEventListener('click', () => {
        repeatMode = (repeatMode + 1) % 3;
        updateRepeatButton();
        const modes = ["Nessuna ripetizione", "Ripeti tutti", "Ripeti brano"];
        showToast(modes[repeatMode]);
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredSongs = songs.filter(s => !s.isHome && (s.title.toLowerCase().includes(query) || (s.artist && s.artist.toLowerCase().includes(query))));
        renderSongList(filteredSongs);
    });

    usernameEl.addEventListener('blur', saveUsername);
    usernameEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); usernameEl.blur(); } });

    closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impedisce la chiusura immediata
        settingsMenu.classList.toggle('visible');
        settingsBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsMenu.classList.remove('visible');
            settingsBtn.classList.remove('active');
        }
    });

    Object.keys(views).forEach(key => {
        buttons[key]?.addEventListener('click', () => {
            settingsMenu.classList.remove('visible');
            settingsBtn.classList.remove('active');
            togglePopup(key, true);
        });
        buttons[`close${key.charAt(0).toUpperCase() + key.slice(1)}`]?.addEventListener('click', () => togglePopup(key, false));
        views[key].addEventListener('click', (e) => {
            if (e.target === views[key]) togglePopup(key, false);
        });
    });

    buttons.downloadAll.addEventListener('click', downloadAllSongs);
    buttons.copyLink.addEventListener('click', copyLink);
    buttons.share.addEventListener('click', shareSong);
    buttons.download.addEventListener('click', (e) => {
        e.preventDefault();
        const currentSong = songs[currentSongIndex];
        if (currentSong && currentSong.audio) {
            const link = document.createElement('a');
            link.href = currentSong.audio;
            link.download = `${currentSong.title}.${currentSong.audio.split('.').pop()}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("Download avviato!");
        }
    });

    themeRadios.forEach(radio => radio.addEventListener('change', (e) => applyTheme(e.target.value)));

    mobileNav.addEventListener('click', e => {
        const target = e.target.closest('.nav-item');
        if (!target) return;
        const action = target.dataset.action;
        document.querySelector('.nav-item.active')?.classList.remove('active');
        target.classList.add('active');
        if (action === 'open-songs') {
            toggleSidebar(true);
        } else {
            toggleSidebar(false);
            if (action === 'go-home') loadSong(0);
            else if (action === 'go-player') showMainView('player');
        }
    });

    window.addEventListener('hashchange', () => {
        const newIndex = getSongIndexFromHash(window.location.hash);
        if (newIndex >= 0 && newIndex !== currentSongIndex) {
            loadSong(newIndex, true);
        }
    });

    songImageTouchArea.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    songImageTouchArea.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) handleNextSong();
            else handlePrevSong();
        }
    });

    window.addEventListener('online', () => offlineIndicator.classList.remove('visible'));
    window.addEventListener('offline', () => {
        offlineIndicator.textContent = "Sei offline. La musica in cache è disponibile.";
        offlineIndicator.classList.add('visible');
    });

    // --- INIZIALIZZAZIONE ---
    function initialize() {
        renderSongList(songs);
        loadUsername();
        loadTheme();
        updateRepeatButton();
        shuffleBtn.classList.toggle('active', isShuffle);

        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', playSong);
            navigator.mediaSession.setActionHandler('pause', pauseSong);
            navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong);
            navigator.mediaSession.setActionHandler('nexttrack', handleNextSong);
        }

        const startIndex = getSongIndexFromHash(window.location.hash);
        loadSong(startIndex, startIndex !== 0);

        updateProgressBar();
    }
    initialize();
});