
document.addEventListener('DOMContentLoaded', () => {
    const emailButton = document.querySelector('.email-button');
    const emailPopup = document.querySelector('.email-popup');
    const closeButton = document.querySelector('.close-button');
    const mainContent = document.querySelector('.main-content');
    const skeletonLoader = document.querySelector('.skeleton-loader');

    // User status (login/profile) handling
    const loginButton = document.querySelector('.user-status .login-button');
    const loggedInProfile = document.querySelector('.logged-in-profile');

    function updateLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        const storedUsername = sessionStorage.getItem('loggedInUsername'); // Retrieve username
        const storedAvatarUrl = sessionStorage.getItem('profileAvatarUrl'); // Retrieve avatar URL
        const usernameSpan = loggedInProfile ? loggedInProfile.querySelector('.username') : null;
        const userAvatar = loggedInProfile ? loggedInProfile.querySelector('.user-avatar') : null;

        if (isLoggedIn === 'true') {
            if (loginButton) loginButton.style.display = 'none';
            if (loggedInProfile) loggedInProfile.style.display = 'flex';
            
            if (usernameSpan && storedUsername) {
                usernameSpan.textContent = storedUsername; // Set username
            }

            if (userAvatar) {
                if (storedAvatarUrl) {
                    userAvatar.src = storedAvatarUrl; // Set avatar image
                    userAvatar.style.backgroundColor = ''; // Clear default background
                } else {
                    userAvatar.src = ''; // Clear src to show default background
                    userAvatar.style.backgroundColor = '#808080'; // Default gray circle
                }
            }
        } else {
            if (loginButton) loginButton.style.display = 'flex';
            if (loggedInProfile) loggedInProfile.style.display = 'none';
            
            if (usernameSpan) {
                usernameSpan.textContent = ''; // Reset to empty
            }
            if (userAvatar) {
                userAvatar.src = ''; // Clear src
                userAvatar.style.backgroundColor = '#808080'; // Set default gray
            }
        }
    }

    updateLoginStatus(); // Call on page load

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Removed Logout dropdown functionality related to Edit Profile button
    const logoutDropdown = document.querySelector('.logout-dropdown');
    const logoutButtonDropdown = document.querySelector('.logout-dropdown .logout-button');

    if (loggedInProfile) {
        loggedInProfile.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing immediately
            logoutDropdown.classList.toggle('show');
        });
    }

    if (logoutButtonDropdown) {
        logoutButtonDropdown.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn'); // Clear login status
            sessionStorage.removeItem('profileAvatarUrl'); // Clear profile avatar URL
            sessionStorage.removeItem('loggedInUsername'); // Clear username
            updateLoginStatus(); // Update UI to show login button
            // window.location.href = 'login.html'; // Removed redirection
        });
    }

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (logoutDropdown && !logoutDropdown.contains(event.target) && loggedInProfile && !loggedInProfile.contains(event.target)) {
            logoutDropdown.classList.remove('show');
        }
    });

    // Event listener for login/logout changes (e.g., from other tabs)
    window.addEventListener('storage', updateLoginStatus);

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
    // Add active class for transition
    backgroundSlideshow.classList.add('active');

    // Remove active class after transition to prepare for next image
    setTimeout(() => {
        backgroundSlideshow.classList.remove('active');
    }, 2300); // Adjusted to be slightly less than interval

    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Initial background set
changeBackground();

// Change background every 3 seconds (3000 milliseconds)
setInterval(changeBackground, 3000);

