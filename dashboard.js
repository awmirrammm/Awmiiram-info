document.addEventListener('DOMContentLoaded', () => {
    const skeletonLoader = document.querySelector('.skeleton-loader'); // Added
    const dashboardContainer = document.querySelector('.dashboard-container'); // Added, this is the main content

    // Show skeleton loader initially
    if (skeletonLoader) {
        skeletonLoader.style.opacity = '1';
        skeletonLoader.style.pointerEvents = 'auto';
    }

    // Simulate content loading for skeleton loader
    setTimeout(() => {
        if (skeletonLoader) {
            skeletonLoader.style.opacity = '0';
            skeletonLoader.style.pointerEvents = 'none';
        }
        if (dashboardContainer) {
            dashboardContainer.style.opacity = '1';
            dashboardContainer.style.pointerEvents = 'auto';
        }
    }, 1000); // Adjust loading time as needed

    // Check login status (moved after skeleton loader init)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return;
    }

    // Background slideshow functionality
    const backgroundImages = [
        'shinobu-kocho-5120x2880-19754.jpg',
        'jinx-graffiti-5120x2880-19975.jpg',
        'neon-judy-alvarez-5120x2880-20180.jpg'
    ];
    let currentImageIndex = 0;
    const backgroundSlideshow = document.querySelector('.background-slideshow');

    function changeBackground() {
        backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
        backgroundSlideshow.classList.add('active');

        setTimeout(() => {
            backgroundSlideshow.classList.remove('active');
        }, 2300);

        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    changeBackground();
    setInterval(changeBackground, 3000);

    // Welcome button functionality
    const welcomeButton = document.querySelector('.welcome-button');
    if (welcomeButton) {
        welcomeButton.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to index.html
        });
    }

    // Logout functionality
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn'); // Clear login status
            window.location.href = 'login.html'; // Redirect to login page
        });
    }
});
