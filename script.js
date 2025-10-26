
document.addEventListener('DOMContentLoaded', () => {
    const emailButton = document.querySelector('.email-button');
    const emailPopup = document.querySelector('.email-popup');
    const closeButton = document.querySelector('.close-button');
    const mainContent = document.querySelector('.main-content');
    const skeletonLoader = document.querySelector('.skeleton-loader');

    // Show skeleton loader initially
    skeletonLoader.style.opacity = '1';

    // Simulate content loading
    setTimeout(() => {
        skeletonLoader.style.opacity = '0';
        skeletonLoader.style.pointerEvents = 'none';
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
    }, 2000); // Adjust loading time as needed

    emailButton.addEventListener('click', () => {
        emailPopup.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        emailPopup.style.display = 'none';
    });

    // Close popup if clicking outside the content (optional)
    emailPopup.addEventListener('click', (event) => {
        if (event.target === emailPopup) {
            emailPopup.style.display = 'none';
        }
    });

    // Mouse halo effect
    const mouseHalo = document.createElement('div');
    mouseHalo.classList.add('mouse-halo');
    document.body.appendChild(mouseHalo);

    document.addEventListener('mousemove', (e) => {
        mouseHalo.style.left = e.clientX + 'px';
        mouseHalo.style.top = e.clientY + 'px';
    });
});

