// Main game class
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CONFIG.canvas.width;
        this.canvas.height = CONFIG.canvas.height;

        this.keys = {};
        this.currentMission = null;
        this.lastTime = 0;
        this.running = false;

        // UI elements
        this.ui = {
            startScreen: document.getElementById('start-screen'),
            missionSelect: document.getElementById('mission-select'),
            missionList: document.getElementById('mission-list'),
            missionBanner: document.getElementById('mission-banner'),
            dialogueBox: document.getElementById('dialogue-box'),
            dialogueSpeaker: document.getElementById('dialogue-speaker'),
            dialogueText: document.getElementById('dialogue-text'),
            objective: document.getElementById('mission-objective'),
            progressContainer: document.getElementById('progress-bar-container'),
            progressBar: document.getElementById('progress-bar'),
            progressLabel: document.getElementById('progress-label')
        };

        this.setupInput();
    }

    setupInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    gameLoop(currentTime = 0) {
        if (!this.running) return;

        const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        this.update(dt);
        this.draw();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(dt) {
        if (this.currentMission) {
            this.currentMission.update(this, dt);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.currentMission) {
            this.currentMission.draw(this, this.ctx);
        }
    }

    // Mission management
    loadMission(mission) {
        this.currentMission = mission;
        this.hideMissionSelect();
        mission.init(this);
    }

    showMissionSelect() {
        this.currentMission = null;
        this.ui.missionSelect.classList.remove('hidden');
        this.ui.progressContainer.classList.add('hidden');
        this.updateMissionList();
    }

    hideMissionSelect() {
        this.ui.missionSelect.classList.add('hidden');
    }

    updateMissionList() {
        this.ui.missionList.innerHTML = '';
        const missions = [Mission1, Mission2];

        CONFIG.missions.forEach((missionConfig, index) => {
            const btn = document.createElement('button');
            btn.className = 'mission-btn' + (missionConfig.unlocked ? '' : ' locked');
            btn.innerHTML = `
                <span class="mission-title">${missionConfig.title}</span>
                ${missionConfig.description}
                ${!missionConfig.unlocked ? '<br><br>🔒 Complete previous mission to unlock' : ''}
            `;

            if (missionConfig.unlocked) {
                btn.addEventListener('click', () => {
                    this.loadMission(missions[index]);
                });
            }

            this.ui.missionList.appendChild(btn);
        });
    }

    // UI helpers
    showMissionBanner(title, description) {
        this.ui.missionBanner.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
        this.ui.missionBanner.classList.remove('hidden');

        setTimeout(() => {
            this.hideMissionBanner();
        }, 2500);
    }

    hideMissionBanner() {
        this.ui.missionBanner.classList.add('hidden');
    }

    showDialogue(speaker, text) {
        this.ui.dialogueSpeaker.textContent = speaker;
        this.ui.dialogueText.textContent = text;
        this.ui.dialogueBox.classList.remove('hidden');
    }

    hideDialogue() {
        this.ui.dialogueBox.classList.add('hidden');
    }

    setObjective(text) {
        this.ui.objective.textContent = text;
    }

    updateProgress(current, max, label) {
        this.ui.progressContainer.classList.remove('hidden');
        const percentage = Math.min((current / max) * 100, 100);
        this.ui.progressBar.style.setProperty('--progress', percentage + '%');
        this.ui.progressLabel.textContent = `${label}: ${current.toFixed(1)}/${max}`;
    }

    hideProgress() {
        this.ui.progressContainer.classList.add('hidden');
    }
}
