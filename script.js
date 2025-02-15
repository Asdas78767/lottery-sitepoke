let participantsCount = 0;
let loggedIn = false;
let isAdmin = false;
let winners = [];

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const drawBtn = document.getElementById('draw-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const lottoForm = document.getElementById('lotto-form');
const winnersList = document.getElementById('winners-list');
const participantsCountElem = document.getElementById('participants-count');
const countdownElem = document.getElementById('timer');
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const drawResult = document.getElementById('draw-result');
const completionMessage = document.getElementById('completion-message');
const countdownDate = new Date().setHours(22, 0, 0, 0); // 매일 10시까지

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '4483') {
        isAdmin = true;
        loggedIn = true;
        alert('관리자로 로그인했습니다.');
    } else {
        loggedIn = true;
    }

    updateUI();
});

signupBtn.addEventListener('click', () => {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    alert('회원가입이 완료되었습니다.');
    updateUI();
});

signupLink.addEventListener('click', () => {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});

loginLink.addEventListener('click', () => {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

drawBtn.addEventListener('click', () => {
    if (!loggedIn) {
        alert('로그인이 필요합니다.');
        return;
    }

    const minecraftId = document.getElementById('minecraft-id').value;
    if (hasSubmittedToday(minecraftId)) {
        alert('You have already submitted today. Please try again tomorrow.');
        return;
    }

    winners = [];
    const images = document.querySelectorAll('.pokemon-image');
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * images.length);
        winners.push(images[randomIndex].alt);
    }

    displayWinners();
    completionMessage.style.display = 'block';
    drawBtn.style.display = 'none';
    saveSubmissionDate(minecraftId);
});

function displayWinners() {
    winnersList.innerHTML = '';
    winners.forEach(winner => {
        const li = document.createElement('li');
        li.textContent = winner;
        winnersList.appendChild(li);
    });
    drawResult.style.display = 'block';
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        alert('새로운 추첨이 시작되었습니다!');
        countdownDate.setDate(countdownDate.getDate() + 1); // 다음 날로 설정
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElem.textContent = `${hours}시간 ${minutes}분 ${seconds}초`;
}

function updateUI() {
    if (loggedIn) {
        lottoForm.classList.add('active');
        participantsCount++;
        participantsCountElem.textContent = participantsCount;
        loginForm.classList.remove('active');
        signupForm.classList.remove('active');
    } else {
        lottoForm.classList.remove('active');
    }
}

function hasSubmittedToday(minecraftId) {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || {};
    const today = new Date().toISOString().split('T')[0];
    return submissions[minecraftId] === today;
}

function saveSubmissionDate(minecraftId) {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || {};
    const today = new Date().toISOString().split('T')[0];
    submissions[minecraftId] = today;
    localStorage.setItem('submissions', JSON.stringify(submissions));
}

setInterval(updateCountdown, 1000);
