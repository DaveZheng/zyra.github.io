// Initialize and start the game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    // Draw Zyra's face on title screen
    const titleCanvas = document.getElementById('title-canvas');
    const titleCtx = titleCanvas.getContext('2d');
    titleCtx.imageSmoothingEnabled = false;
    Sprites.drawZyraFace(titleCtx, 4, 4, 8);

    // Start button
    document.getElementById('start-btn').addEventListener('click', () => {
        document.getElementById('start-screen').classList.add('hidden');
        game.start();
        game.showMissionSelect();
    });
});
