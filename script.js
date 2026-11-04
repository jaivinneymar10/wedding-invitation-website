document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const coverScreen = document.getElementById('coverScreen');
    const invitationWrapper = document.getElementById('invitationWrapper');
    const mapBtn = document.getElementById('mapBtn');
    const mapModal = document.getElementById('mapModal');
    const closeMap = document.getElementById('closeMap');
    const particleContainer = document.getElementById('particle-container');
    const doorLeft = document.getElementById('doorLeft');
    const doorRight = document.getElementById('doorRight');
    const coverContent = document.querySelector('.cover-content');

    // Open Invitation
    openBtn.addEventListener('click', () => {
        coverContent.classList.add('hide');

        setTimeout(() => {
            doorLeft.classList.add('open');
            doorRight.classList.add('open');
        }, 600); // Wait for text to fade

        setTimeout(() => {
            coverScreen.classList.add('hidden');
            invitationWrapper.classList.remove('hidden');
            createParticles();

            // Start Music
            const bgMusic = document.getElementById('bgMusic');
            const musicBtn = document.getElementById('musicBtn');
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
            musicBtn.classList.remove('hidden');

            // Activate 3D hover tracking on card
            setTimeout(() => {
                document.addEventListener("mousemove", (e) => {
                    const card = document.querySelector('.card');
                    const x = (window.innerWidth / 2 - e.pageX) / 60;
                    const y = (e.pageY - window.innerHeight / 2) / 60;
                    card.style.transition = 'transform 0.1s ease-out';
                    card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
                });
            }, 2000);

        }, 2000); // Wait for doors to open
    });


    // Map Modal Toggles
    mapBtn.addEventListener('click', () => {
        mapModal.classList.remove('hidden');
    });

    closeMap.addEventListener('click', () => {
        mapModal.classList.add('hidden');
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === mapModal) {
            mapModal.classList.add('hidden');
        }
    });

    // Particle/Petal generation
    function createParticles() {
        const particleCount = 20; // Number of petals falling at once

        for (let i = 0; i < particleCount; i++) {
            createSingleParticle(i * 300); // Stagger initial creation
        }
    }

    function createSingleParticle(delay = 0) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            // Randomize petal properties
            const size = Math.random() * 15 + 10; // 10px to 25px
            const leftPos = Math.random() * 100; // 0% to 100% width
            const animDuration = Math.random() * 5 + 7; // 7s to 12s drop time

            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${leftPos}vw`;
            petal.style.animationDuration = `${animDuration}s`;

            particleContainer.appendChild(petal);

            // Remove petal after it falls and create another one
            setTimeout(() => {
                petal.remove();
                if (!invitationWrapper.classList.contains('hidden')) {
                    createSingleParticle();
                }
            }, animDuration * 1000);

        }, delay);
    }

    // Music Toggle
    const bgMusicEvent = document.getElementById('bgMusic');
    const musicBtnEvent = document.getElementById('musicBtn');
    let isPlaying = true;

    musicBtnEvent.addEventListener('click', () => {
        if (isPlaying) {
            bgMusicEvent.pause();
            musicBtnEvent.innerHTML = '🔇';
            musicBtnEvent.style.animationPlayState = 'paused';
        } else {
            bgMusicEvent.play();
            musicBtnEvent.innerHTML = '🎵';
            musicBtnEvent.style.animationPlayState = 'running';
        }
        isPlaying = !isPlaying;
    });

    // Countdown Timer (Target: may 08, 2026 16:00:00)
    const weddingDate = new Date("may 8, 2026 16:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<h3>Happily Ever After!</h3>";
            return;
        }

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
});
