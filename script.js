const pokemonImages = [
    { name: '이상해씨', imageUrl: 'images/1-1.png' },
    { name: '파이리', imageUrl: 'images/4-1.png' },
    { name: '꼬부기', imageUrl: 'images/7.png' },
    { name: '치코리타', imageUrl: 'images/2-2.png' },
    { name: '브케인', imageUrl: 'images/5.png' },
    { name: '리아코', imageUrl: 'images/9.png' },
    { name: '나무지기', imageUrl: 'images/3.png' },
    { name: '아차모', imageUrl: 'images/6.png' },
    { name: '물짱이', imageUrl: 'images/8.png' },
    { name: '모부기', imageUrl: 'images/10.png' },
    { name: '불꽃숭이', imageUrl: 'images/11.png' },
    { name: '팽도리', imageUrl: 'images/12.png' },
    { name: '주리비얀', imageUrl: 'images/13.png' },
    { name: '뚜꾸리', imageUrl: 'images/14.png' },
    { name: '수댕이', imageUrl: 'images/15.png' },
    { name: '도치마론', imageUrl: 'images/16.png' },
    { name: '푸호꼬', imageUrl: 'images/17.png' },
    { name: '개구마르', imageUrl: 'images/18.png' },
    { name: '나몰빼미', imageUrl: 'images/19.png' },
    { name: '냐오불', imageUrl: 'images/20.png' },
    { name: '누리공', imageUrl: 'images/21.png' },
    { name: '흥나숭', imageUrl: 'images/22.png' },
    { name: '염버니', imageUrl: 'images/23.png' },
    { name: '울머기', imageUrl: 'images/24.png' },
    { name: '나오하', imageUrl: 'images/25.png' },
    { name: '뜨아거', imageUrl: 'images/26.png' },
    { name: '꾸왁스', imageUrl: 'images/27.png' }
];

const drawButton = document.getElementById('draw-button');
const pokemonImagesContainer = [
    { container: document.getElementById('pokemon-1'), name: document.getElementById('pokemon-name-1') },
    { container: document.getElementById('pokemon-2'), name: document.getElementById('pokemon-name-2') },
    { container: document.getElementById('pokemon-3'), name: document.getElementById('pokemon-name-3') }
];
const historyContainer = document.getElementById('history-container');
const drawSound = document.getElementById('draw-sound');

function updateHistory(selectedIndexes) {
    const historyItem = document.createElement('div');
    const names = selectedIndexes.map(index => pokemonImages[index].name).join(', ');
    historyItem.textContent = `추첨된 포켓몬: ${names}`;
    historyContainer.appendChild(historyItem);
}

function drawPokemon() {
    // 기존에 보이던 이미지를 숨김
    pokemonImagesContainer.forEach(container => {
        const img = container.container.querySelector('img');
        img.style.display = 'none';
        container.name.style.display = 'none';
    });

    // 랜덤으로 3개의 포켓몬 이미지 추첨
    const selectedIndexes = [];
    while (selectedIndexes.length < 3) {
        const randomIndex = Math.floor(Math.random() * pokemonImages.length);
        if (!selectedIndexes.includes(randomIndex)) {
            selectedIndexes.push(randomIndex);
        }
    }

    // 히스토리 갱신
    updateHistory(selectedIndexes);

    // 효과음 재생
    drawSound.play();

    // 각 이미지 컨테이너에 새로운 이미지와 이름 순차적으로 설정
    selectedIndexes.forEach((index, i) => {
        setTimeout(() => {
            const img = pokemonImagesContainer[i].container.querySelector('img');
            const name = pokemonImages[index].name;
            img.src = pokemonImages[index].imageUrl;
            pokemonImagesContainer[i].name.textContent = name;
            img.style.display = 'block';
            pokemonImagesContainer[i].name.style.display = 'block';
        }, i * 1000); // 1초 간격으로 순차적으로 이미지 나오게 설정
    });
}

drawButton.addEventListener('click', drawPokemon);
