window.addEventListener('load', () => {
    const skeletonLoader = document.querySelector('.skeleton-loader');
    const mainContent = document.querySelector('.main-content');

    setTimeout(() => {
        skeletonLoader.style.opacity = '0';
        skeletonLoader.style.pointerEvents = 'none';
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
    }, 2000); // Simulate 2 seconds loading time
});

const emailButton = document.querySelector('.email-button');
const emailPopup = document.querySelector('.email-popup');
const closeButton = document.querySelector('.close-button');

emailButton.addEventListener('click', () => {
    emailPopup.style.display = 'flex'; // Show the pop-up
});

closeButton.addEventListener('click', () => {
    emailPopup.style.display = 'none'; // Hide the pop-up
});

// Close pop-up when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target == emailPopup) {
        emailPopup.style.display = 'none';
    }
});

