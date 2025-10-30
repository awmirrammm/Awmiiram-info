document.addEventListener('DOMContentLoaded', () => {
    const skeletonLoader = document.querySelector('.skeleton-loader');
    const loginContainer = document.querySelector('.login-container');

    // Show skeleton
    if (skeletonLoader) {
        skeletonLoader.style.opacity = '1';
        skeletonLoader.style.pointerEvents = 'auto';
    }

    setTimeout(() => {
        if (skeletonLoader) {
            skeletonLoader.style.opacity = '0';
            skeletonLoader.style.pointerEvents = 'none';
        }
        if (loginContainer) {
            loginContainer.style.opacity = '1';
            loginContainer.style.pointerEvents = 'auto';
        }
    }, 1000);

    // Background slideshow
    const backgroundImages = [
        'From KlickPin CF searchapp _ Граффити в виде слов Планшет Фоны для iphone.jpg',
        'IMG_20240908_192349_779.jpg',
        'From KlickPin CF Pin by Aubids08 on Quick Saves _ Cool wallpapers for laptop Macbook air wallpaper Stussy wallpaper.jpg'
    ];
    let currentImageIndex = 0;
    const backgroundSlideshow = document.querySelector('.background-slideshow');

    function changeBackground() {
        backgroundSlideshow.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
        backgroundSlideshow.classList.add('active');
        setTimeout(() => backgroundSlideshow.classList.remove('active'), 2300);
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }

    changeBackground();
    setInterval(changeBackground, 3000);

    // Forms
    const signInTab = document.getElementById('signInTab');
    const signUpTab = document.getElementById('signUpTab');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const currentProfileAvatar = document.getElementById('currentProfileAvatar');

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
        updateLoginAvatar();
    }

    signInTab.addEventListener('click', () => showForm('signIn'));
    signUpTab.addEventListener('click', () => showForm('signUp'));
    showForm('signIn');

    function updateLoginAvatar() {
        const storedAvatarUrl = sessionStorage.getItem('profileAvatarUrl');
        if (currentProfileAvatar) {
            if (storedAvatarUrl) {
                currentProfileAvatar.src = storedAvatarUrl;
                currentProfileAvatar.style.backgroundColor = '';
            } else {
                currentProfileAvatar.src = '';
                currentProfileAvatar.style.backgroundColor = '#808080';
            }
        }
    }
    updateLoginAvatar();

    // Sign Up
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;
        const email = document.getElementById('signUpEmail').value;
        const fileInput = document.getElementById('signUpProfileImageFile');

        if (!username || !password || !email) {
            alert('All fields required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid Email');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(u => u.username === username)) {
            alert('Username exists');
            return;
        }
        if (users.find(u => u.email === email)) {
            alert('Email exists');
            return;
        }

        let avatarBase64 = '';
        if (fileInput && fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarBase64 = event.target.result;
                users.push({ username, password, email, avatar: avatarBase64 });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Sign Up Successful!');
                showForm('signIn');
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            users.push({ username, password, email, avatar: '' });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign Up Successful!');
            showForm('signIn');
        }
    });

    // ✅ ADMIN LOGIN 🔥
    const ADMIN_USERNAME = "awmir";
    const ADMIN_PASSWORD = "awmir8787";
    const ADMIN_AVATAR = "IMG_20240908_192349_779.jpg"; // ✅ your image

    // Sign In
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;

        // ADMIN LOGIN FIRST
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUsername', ADMIN_USERNAME);
            sessionStorage.setItem('loggedInEmail', 'admin@awmir.com');
            sessionStorage.setItem('profileAvatarUrl', ADMIN_AVATAR);

            alert("Welcome Admin");
            window.location.href = "dashboard.html";
            return;
        }

        // Normal login
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(u => u.username === username && u.password === password);

        if (foundUser) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loggedInUsername', foundUser.username);
            sessionStorage.setItem('loggedInEmail', foundUser.email);

            if (foundUser.avatar) {
                sessionStorage.setItem('profileAvatarUrl', foundUser.avatar);
            } else {
                sessionStorage.removeItem('profileAvatarUrl');
            }

            alert('Login Successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid Username or Password.');
        }
    });
});

// TRAP MOTION BG
const canvas = document.getElementById("trapBG");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 75;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(0, 170, 255, ${this.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#00aaff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function setup() {
    particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
setup();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setup();
});
