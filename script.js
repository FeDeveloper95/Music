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
    let currentSongIndex = 0, isPlaying = false, isShuffle = false, repeatMode = 0;

    // --- ELEMENTI DEL DOM ---
    const appContainer = document.querySelector('.app-container');
    const songListEl = document.getElementById('song-list');
    const songImageEl = document.querySelector('.song-image img');
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
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const mobileNav = document.getElementById('mobile-nav');
    const easterEggContainer = document.getElementById('easter-egg-container');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const progressBar = document.getElementById('progress-bar');
    const infoView = document.getElementById('info-view');
    const infoBtn = document.getElementById('info-btn');
    const closeInfoBtn = document.getElementById('close-info-btn');
    
    // --- FUNZIONI DI CONTROLLO UI ---
    function showMainView(viewName) {
        homeView.classList.toggle('hidden', viewName !== 'home');
        playerView.classList.toggle('hidden', viewName !== 'player');
    }
    function toggleSidebar(show) { appContainer.classList.toggle('sidebar-open', show); }
    function toggleInfoPopup(show) { infoView.classList.toggle('visible', show); }
    
    // --- FUNZIONI PLAYER ---
    function updatePlayerStateUI() {
        playPauseBtn.classList.toggle('is-playing', isPlaying);
        playPauseIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    }
    function loadSong(songIndex, autoPlay = false) {
        const song = songs[songIndex]; if (!song) return;
        currentSongIndex = songIndex;
        document.querySelectorAll('.song-list li.active').forEach(item => item.classList.remove('active'));
        document.querySelectorAll(`.song-list li[data-index="${songIndex}"]`).forEach(item => item.classList.add('active'));
        if (song.isHome) {
            showMainView('home');
            history.pushState(null, '', window.location.pathname);
            if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
            isPlaying = false; updatePlayerStateUI();
            return;
        }
        showMainView('player');
        songTitleEl.textContent = song.title; songArtistEl.textContent = song.artist;
        songImageEl.src = song.image; audioPlayer.src = song.audio;
        location.hash = songs.indexOf(song) > 0 ? songs.indexOf(song) : '';
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({ title: song.title, artist: song.artist, album: 'Music Player', artwork: [{ src: song.image, sizes: '512x512', type: 'image/jpeg' }] });
        }
        if (autoPlay) playSong();
        else { isPlaying = false; updatePlayerStateUI(); }
    }
    const playSong = () => { if (!audioPlayer.src || audioPlayer.src.endsWith('#')) return; isPlaying = true; audioPlayer.play().catch(e=>console.error(e)); updatePlayerStateUI(); };
    const pauseSong = () => { isPlaying = false; audioPlayer.pause(); updatePlayerStateUI(); };
    function handleNextSong() {
        if (isShuffle) { let newIndex; do { newIndex = Math.floor(Math.random() * (songs.length - 1)) + 1; } while (songs.length > 2 && newIndex === currentSongIndex); currentSongIndex = newIndex; }
        else { currentSongIndex++; if (currentSongIndex >= songs.length) currentSongIndex = (repeatMode === 1) ? 1 : 0; }
        loadSong(currentSongIndex, !songs[currentSongIndex].isHome);
    }
    function handlePrevSong() { currentSongIndex--; if (currentSongIndex < 1) currentSongIndex = songs.length - 1; loadSong(currentSongIndex, true); }
    const formatTime = seconds => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
    
    function updateProgressBar() {
        if (audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progressPercent;
            progressBar.style.backgroundSize = `${progressPercent}% 100%`;
            currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
            totalTimeEl.textContent = formatTime(audioPlayer.duration);
        } else {
            progressBar.value = 0;
            progressBar.style.backgroundSize = `0% 100%`;
        }
    }
    
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
            li.innerHTML = `<img src="${song.image}" width="40" height="40" style="border-radius: 8px; margin-right: 16px;"><div><div style="font-weight: 500;">${song.title}</div><div style="font-size: 14px; color: var(--text-secondary);">${song.artist}</div></div>`;
            li.addEventListener('click', () => { loadSong(songIndex, true); toggleSidebar(false); });
            songListEl.appendChild(li);
        });
    }

    // --- EASTER EGG & ALTRO ---
    const updateRepeatButton = () => { repeatBtn.classList.toggle('active', repeatMode > 0); repeatBtn.querySelector('.material-symbols-outlined').textContent = repeatMode === 2 ? 'repeat_one' : 'repeat'; };
    const loadUsername = () => { const name = localStorage.getItem('musicPlayerUsername'); if (name) usernameEl.textContent = name; };
    const saveUsername = () => { const name = usernameEl.textContent.trim(); if (name) { localStorage.setItem('musicPlayerUsername', name); if(name.toLowerCase() === 'gaia') showGaiaEasterEgg(); } };
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

    // --- EVENT LISTENERS ---
    playPauseBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());
    nextBtn.addEventListener('click', handleNextSong);
    prevBtn.addEventListener('click', handlePrevSong);
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('loadedmetadata', updateProgressBar);
    audioPlayer.addEventListener('ended', () => { if (repeatMode === 2) { audioPlayer.currentTime = 0; playSong(); } else { handleNextSong(); } });
    progressBar.addEventListener('input', () => { if (audioPlayer.duration) audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration; });
    shuffleBtn.addEventListener('click', () => { isShuffle = !isShuffle; shuffleBtn.classList.toggle('active', isShuffle); });
    repeatBtn.addEventListener('click', () => { repeatMode = (repeatMode + 1) % 3; updateRepeatButton(); });
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredSongs = songs.filter(s => !s.isHome && (s.title.toLowerCase().includes(query) || (s.artist && s.artist.toLowerCase().includes(query))));
        renderSongList(filteredSongs);
    });
    usernameEl.addEventListener('blur', saveUsername);
    usernameEl.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); usernameEl.blur(); } });
    closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
    infoBtn.addEventListener('click', () => toggleInfoPopup(true));
    closeInfoBtn.addEventListener('click', () => toggleInfoPopup(false));
    
    mobileNav.addEventListener('click', e => {
        const target = e.target.closest('.nav-item'); if (!target) return;
        const action = target.dataset.action;
        document.querySelector('.nav-item.active')?.classList.remove('active');
        target.classList.add('active');
        if (action === 'open-songs') {
            toggleSidebar(true);
        } else {
            toggleSidebar(false);
            if (action === 'go-home') {
                loadSong(0);
            } else if (action === 'go-player') {
                showMainView('player');
            }
        }
    });
    if ('mediaSession' in navigator) { navigator.mediaSession.setActionHandler('play', playSong); navigator.mediaSession.setActionHandler('pause', pauseSong); navigator.mediaSession.setActionHandler('previoustrack', handlePrevSong); navigator.mediaSession.setActionHandler('nexttrack', handleNextSong); }

    // --- INIZIALIZZAZIONE ---
    function initialize() {
        renderSongList(songs);
        loadUsername(); 
        updateRepeatButton(); 
        shuffleBtn.classList.toggle('active', isShuffle);
        const hash = location.hash.substring(1);
        let startIndex = hash ? parseInt(hash) : 0;
        if (isNaN(startIndex) || startIndex >= songs.length) startIndex = 0;
        loadSong(startIndex);
        updateProgressBar();
    }
    initialize();
});