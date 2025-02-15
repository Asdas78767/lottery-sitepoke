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
const countdownDate = new Date().setHours(22, 0, 0, 0); // 매일 10시까지

// 로그인 함수
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

// 회원가입 함수
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    alert('회원가입이 완료되었습니다.');
    updateUI();
});

// 로그인/회원가입 UI 변경
signupLink.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// 추첨 기능
drawBtn.addEventListener('click', () => {
    if (!loggedIn) {
        alert('로그인이 필요합니다.');
        return;
    }

    winners = [];
    const images = document.querySelectorAll('.pokemon-image');
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * images.length);
        winners.push(images[randomIndex].alt);
    }

    displayWinners();
});

// 당첨자 표시
function displayWinners() {
    winnersList.innerHTML = '';
    winners.forEach(winner => {
        const li = document.createElement('li');
        li.textContent = winner;
        winnersList.appendChild(li);
    });
    drawResult.style.display = 'block';
}

// 카운트다운 기능
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

// UI 업데이트
function updateUI() {
    if (loggedIn) {
        lottoForm.style.display = 'block';
        participantsCount++;
        participantsCountElem.textContent = participantsCount;
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
    } else {
        lottoForm.style.display = 'none';
    }
}

// 매초마다 카운트다운 업데이트
setInterval(updateCountdown, 1000);
