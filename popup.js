const menu = document.getElementById('menu');
const game = document.getElementById('game');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
    menu.style.display = 'none';
    game.style.display = 'flex';
});
