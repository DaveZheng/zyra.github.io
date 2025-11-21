// Initialize and start the game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    // Start button
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('start-screen').classList.add('hidden');
        game.start();
        game.showMissionSelect();
    });
});
