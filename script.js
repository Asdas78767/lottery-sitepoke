const submitSelectionUrl = '/api/submit-selection';  // 이미지 제출 API
const triggerDrawUrl = '/api/trigger-draw';  // 추첨 API
const getDrawResultsUrl = '/api/get-draw-results';  // 당첨 결과 API

let participantsCount = 0;  // 참가자 수
let loggedIn = false;  // 로그인 여부
let isAdmin = false;  // 관리자 여부
let winners = [];  // 당첨자 목록
let selectedImages = [];  // 선택된 이미지

// HTML 요소들
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const drawBtn = document.getElementById('draw-btn');
const submitSelectionBtn = document.getElementById('submit-selection-btn');
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

// 로그인 버튼 이벤트
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

// 회원가입 버튼 이벤트
signupBtn.addEventListener('click', () => {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    alert('회원가입이 완료되었습니다.');
    updateUI();
});

// 회원가입/로그인 폼 전환
signupLink.addEventListener('click', () => {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});
loginLink.addEventListener('click', () => {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

// 포켓몬 이미지 클릭 시 선택
const images = document.querySelectorAll('.pokemon-image');
images.forEach(image => {
    image.addEventListener('click', () => {
        if (selectedImages.length < 4) {
            image.classList.toggle('selected');
            if (image.classList.contains('selected')) {
                selectedImages.push(image.alt);
            } else {
                const index = selectedImages.indexOf(image.alt);
                if (index > -1) {
                    selectedImages.splice(index, 1);
                }
            }
        } else if (image.classList.contains('selected')) {
            image.classList.remove('selected');
            const index = selectedImages.indexOf(image.alt);
            if (index > -1) {
                selectedImages.splice(index, 1);
            }
        }
    });
});

// 선택 제출 버튼 이벤트
submitSelectionBtn.addEventListener('click', () => {
    if (selectedImages.length === 4) {
        fetch(submitSelectionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ images: selectedImages })
        }).then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(`HTTP error! Status: ${response.status}, Message: ${err.message}`); });
            }
            return response.json();
        }).then(data => {
            alert('선택이 제출되었습니다.');
            saveSubmissionDate();
        }).catch(error => {
            console.error('Submission Error:', error);
            alert(`제출 실패. 다시 시도해 주세요. 오류 메시지: ${error.message}`);
        });
    } else {
        alert('4개의 이미지를 선택하세요.');
    }
});

// 추첨 버튼 이벤트
drawBtn.addEventListener('click', () => {
    if (!loggedIn) {
        alert('로그인이 필요합니다.');
        return;
    }

    fetch(triggerDrawUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => {
          winners = data.winners;
          displayWinners();
          completionMessage.style.display = 'block';
          drawBtn.style.display = 'none';
      }).catch(error => {
          console.error('Draw Error:', error);
          alert('추첨 실패. 다시 시도해 주세요.');
      });
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

    // 선택된 이미지 표시
    const selectedImagesContainer = document.createElement('div');
    selectedImagesContainer.classList.add('selected-images-container');
    winners.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `/lottery-sitepoke/images/${image}`;
        imgElement.alt = image;
        selectedImagesContainer.appendChild(imgElement);
    });
    drawResult.appendChild(selectedImagesContainer);
}

// 카운트다운 업데이트
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
        lottoForm.classList.add('active');
        participantsCount++;
        participantsCountElem.textContent = participantsCount;
        loginForm.classList.remove('active');
        signupForm.classList.remove('active');

        if (isAdmin) {
            drawBtn.style.display = 'block'; // 관리자일 때 추첨 버튼 표시
            drawResult.style.display = 'block'; // 관리자일 때 결과 표시
        } else {
            console.log('Non-admin user logged in');
        }
    } else {
        lottoForm.classList.remove('active');
    }
}

// 오늘 제출 여부 확인
function hasSubmittedToday() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || {};
    const today = new Date().toISOString().split('T')[0];
    return submissions[today] !== undefined;
}

// 제출 날짜 저장
function saveSubmissionDate() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || {};
    const today = new Date().toISOString().split('T')[0];
    submissions[today] = true;
    localStorage.setItem('submissions', JSON.stringify(submissions));
}

// 카운트다운 업데이트 1초마다 실행
setInterval(updateCountdown, 1000);
