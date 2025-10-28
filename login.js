document.addEventListener('DOMContentLoaded', () => {
    const skeletonLoader = document.querySelector('.skeleton-loader'); // Added
    const loginContainer = document.querySelector('.login-container'); // Added, this is the main content

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
        if (loginContainer) {
            loginContainer.style.opacity = '1';
            loginContainer.style.pointerEvents = 'auto';
        }
    }, 1000); // Adjust loading time as needed

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
        }, 2300); // Adjusted to be slightly less than interval

        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    changeBackground();
    setInterval(changeBackground, 3000);

    // Authentication Forms Handling
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const currentProfileAvatar = document.getElementById('currentProfileAvatar'); // For preview

    // Function to switch between forms
    function showForm(formId) {
        if (formId === 'signIn') {
            signInForm.style.display = 'block';
            signUpForm.style.display = 'none';
            signInTab.classList.add('active');
            signUpTab.classList.remove('active');
        } else {
            signInForm.style.display = 'none';
            signUpForm.style.display = 'block';
            signInTab.classList.remove('active');
            signUpTab.classList.add('active');
        }
        // Update avatar preview when switching forms (for sign up form)
        updateLoginAvatar();
    }

    // Event listeners for tab buttons
    signInTab.addEventListener('click', () => showForm('signIn'));
    signUpTab.addEventListener('click', () => showForm('signUp'));

    // Initial form display
    showForm('signIn');

    // Update profile avatar on login page load and file input change
    function updateLoginAvatar() {
        const storedAvatarUrl = sessionStorage.getItem('profileAvatarUrl');

        if (currentProfileAvatar) {
            if (storedAvatarUrl) {
                currentProfileAvatar.src = storedAvatarUrl;
                currentProfileAvatar.style.backgroundColor = ''; // Clear default background
            } else {
                currentProfileAvatar.src = '';
                currentProfileAvatar.style.backgroundColor = '#808080'; // Default gray circle
            }
        }
    }

    updateLoginAvatar(); // Call on page load

    // Preview selected image for Sign Up form
    const signUpProfileImageFile = document.getElementById('signUpProfileImageFile');
    if (signUpProfileImageFile) {
        signUpProfileImageFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (currentProfileAvatar) {
                        currentProfileAvatar.src = e.target.result;
                        currentProfileAvatar.style.backgroundColor = '';
                    }
                };
                reader.readAsDataURL(file);
            } else {
                // If no file selected, reset to default
                if (currentProfileAvatar) {
                    currentProfileAvatar.src = '';
                    currentProfileAvatar.style.backgroundColor = '#808080';
                }
            }
        });
    }

    // Sign Up Form Submission
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;
        const email = document.getElementById('signUpEmail').value; // Get email value
        const profileImageFile = document.getElementById('signUpProfileImageFile');

        // Basic validation for sign up (e.g., username not empty)
        if (!username || !password || !email) {
            alert('Username, Password, and Email are required for Sign Up.');
            return;
        }

        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Get existing users or initialize empty array
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username or email already exists
        if (users.find(user => user.username === username)) {
            alert('Username already exists. Please choose a different one.');
            return;
        }
        if (users.find(user => user.email === email)) {
            alert('Email already registered. Please use a different email or Sign In.');
            return;
        }

        // Handle profile image upload (Base64)
        let avatarBase64 = '';
        if (profileImageFile && profileImageFile.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarBase64 = event.target.result;
                const newUser = { username, password, email, avatar: avatarBase64 }; // Added email
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Sign Up Successful! You can now Sign In.');
                showForm('signIn'); // Switch to sign in form
            };
            reader.readAsDataURL(profileImageFile.files[0]);
        } else {
            const newUser = { username, password, email, avatar: avatarBase64 }; // Added email
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign Up Successful! You can now Sign In.');
            showForm('signIn'); // Switch to sign in form
        }
    });

    // Sign In Form Submission
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUsername', foundUser.username);
            sessionStorage.setItem('loggedInEmail', foundUser.email); // Store email
            if (foundUser.avatar) {
                sessionStorage.setItem('profileAvatarUrl', foundUser.avatar);
            } else {
                sessionStorage.removeItem('profileAvatarUrl');
            }
            alert('Login Successful!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            alert('Invalid Username or Password.');
        }
    });

    // Also update on storage changes (e.g., if a user logs out in another tab)
    window.addEventListener('storage', updateLoginAvatar);
});
