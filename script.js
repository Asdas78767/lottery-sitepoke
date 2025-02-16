const pokemonImages = [
    { name: 'Bulbasaur', imageUrl: 'images/1-1.png' },
    { name: 'Ivysaur', imageUrl: 'images/2-2.png' },
    { name: 'Venusaur', imageUrl: 'images/3.png' },
    { name: 'Charmander', imageUrl: 'images/4-1.png' },
    { name: 'Charmeleon', imageUrl: 'images/5.png' },
    { name: 'Charizard', imageUrl: 'images/6.png' },
    { name: 'Squirtle', imageUrl: 'images/7.png' },
    { name: 'Wartortle', imageUrl: 'images/8.png' },
    { name: 'Blastoise', imageUrl: 'images/9.png' },
    { name: 'Caterpie', imageUrl: 'images/10.png' },
    { name: 'Metapod', imageUrl: 'images/11.png' },
    { name: 'Butterfree', imageUrl: 'images/12.png' },
    { name: 'Weedle', imageUrl: 'images/13.png' },
    { name: 'Kakuna', imageUrl: 'images/14.png' },
    { name: 'Beedrill', imageUrl: 'images/15.png' },
    { name: 'Pidgey', imageUrl: 'images/16.png' },
    { name: 'Pidgeotto', imageUrl: 'images/17.png' },
    { name: 'Pidgeot', imageUrl: 'images/18.png' },
    { name: 'Rattata', imageUrl: 'images/19.png' },
    { name: 'Raticate', imageUrl: 'images/20.png' },
    { name: 'Zubat', imageUrl: 'images/21.png' },
    { name: 'Golbat', imageUrl: 'images/22.png' },
    { name: 'Oddish', imageUrl: 'images/23.png' },
    { name: 'Gloom', imageUrl: 'images/24.png' },
    { name: 'Vileplume', imageUrl: 'images/25.png' },
    { name: 'Paras', imageUrl: 'images/26.png' },
    { name: 'Parasect', imageUrl: 'images/27.png' }
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

drawButton.addEventListener('click', function() {
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
});
