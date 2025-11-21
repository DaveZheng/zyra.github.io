// Mission 1: Eye Contact at the Door
const Mission1 = {
    id: 1,
    title: 'Mission 1: Eye Contact',
    description: 'Wait by the door and catch Mom\'s eye for 10 seconds!',

    // Mission state
    eyeContactTime: 0,
    requiredTime: 10,
    morganLooking: false,
    completed: false,

    // Entities
    zyra: null,
    morgan: null,
    david: null,
    doorX: 50,
    doorY: 200,

    davidDialogues: [
        "Hmm, need to check those reports...",
        "The API isn't going to fix itself...",
        "Did that PR get merged yet?",
        "Just one more code review...",
        "I should refactor that module...",
    ],
    currentDavidDialogue: null,
    davidDialogueTimer: 0,

    init(game) {
        this.eyeContactTime = 0;
        this.completed = false;
        this.morganLooking = false;
        this.currentDavidDialogue = null;
        this.davidDialogueTimer = 0;

        // Create entities
        this.zyra = new Zyra(this.doorX + 100, this.doorY + 100);
        this.morgan = new Human(400, 300, 'morgan');
        this.david = new Human(600, 400, 'david');

        // Morgan wanders around the room
        this.morgan.setWaypoints([
            { x: 200, y: 250 },
            { x: 500, y: 300 },
            { x: 400, y: 450 },
            { x: 150, y: 400 },
            { x: 300, y: 200 },
        ]);

        // David walks around too but ignores Zyra
        this.david.setWaypoints([
            { x: 600, y: 350 },
            { x: 700, y: 450 },
            { x: 650, y: 250 },
            { x: 550, y: 400 },
        ]);

        // Show mission intro
        game.showMissionBanner(this.title, this.description);
    },

    update(game, dt) {
        if (this.completed) return;

        const keys = game.keys;

        // Update entities
        this.zyra.update(dt, keys);
        this.morgan.update(dt);
        this.david.update(dt);

        // Check if Zyra is near the door
        const nearDoor = this.zyra.x < this.doorX + 200 &&
                         Math.abs(this.zyra.y - this.doorY) < 150;

        // Check eye contact with Morgan
        const zyraLookingAtMorgan = this.zyra.checkEyeContact(this.morgan);
        this.morganLooking = this.morgan.checkLookingAtZyra(this.zyra);

        if (nearDoor && zyraLookingAtMorgan && this.morganLooking) {
            this.eyeContactTime += dt;
            this.zyra.state = 'happy';
            game.updateProgress(this.eyeContactTime, this.requiredTime, 'Eye contact with Mom');

            if (this.eyeContactTime >= this.requiredTime) {
                this.complete(game);
            }
        }

        // Check if Zyra looks at David
        const zyraLookingAtDavid = this.zyra.checkEyeContact(this.david);
        const davidLooking = this.david.checkLookingAtZyra(this.zyra);

        if (zyraLookingAtDavid && davidLooking && !this.currentDavidDialogue) {
            // David says something about work and ignores
            this.currentDavidDialogue = this.davidDialogues[
                Math.floor(Math.random() * this.davidDialogues.length)
            ];
            this.davidDialogueTimer = 2;
            game.showDialogue('David', this.currentDavidDialogue);
        }

        // Update David's dialogue timer
        if (this.davidDialogueTimer > 0) {
            this.davidDialogueTimer -= dt;
            if (this.davidDialogueTimer <= 0) {
                this.currentDavidDialogue = null;
                game.hideDialogue();
            }
        }

        // Update objective
        if (!nearDoor) {
            game.setObjective('Get to the door and wait for Mom!');
        } else if (!zyraLookingAtMorgan) {
            game.setObjective('Face Mom (use arrow keys)');
        } else if (!this.morganLooking) {
            game.setObjective('Wait for Mom to look at you...');
        }
    },

    draw(game, ctx) {
        // Draw living room background
        this.drawBackground(ctx);

        // Draw door
        Sprites.drawDoor(ctx, this.doorX, this.doorY);

        // Draw entities
        this.david.draw(ctx);
        this.morgan.draw(ctx);
        this.zyra.draw(ctx);

        // Draw eye contact indicator
        if (this.morganLooking && this.zyra.checkEyeContact(this.morgan)) {
            this.drawEyeContactBeam(ctx, this.zyra, this.morgan);
        }
    },

    drawBackground(ctx) {
        const s = CONFIG.canvas.pixelScale;

        // Floor
        ctx.fillStyle = CONFIG.colors.floor;
        ctx.fillRect(0, CONFIG.canvas.height - 150, CONFIG.canvas.width, 150);

        // Wall
        ctx.fillStyle = CONFIG.colors.wall;
        ctx.fillRect(0, 0, CONFIG.canvas.width, CONFIG.canvas.height - 150);

        // Baseboard
        ctx.fillStyle = '#5c4a3a';
        ctx.fillRect(0, CONFIG.canvas.height - 160, CONFIG.canvas.width, 20);

        // Window
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(500, 80, 120, 100);
        ctx.fillStyle = '#8b4513';
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#8b4513';
        ctx.strokeRect(500, 80, 120, 100);
        ctx.beginPath();
        ctx.moveTo(560, 80);
        ctx.lineTo(560, 180);
        ctx.stroke();

        // Couch
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(300, 380, 200, 80);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(300, 350, 200, 40);
    },

    drawEyeContactBeam(ctx, from, to) {
        ctx.save();
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 200) * 0.3;
        ctx.beginPath();
        ctx.moveTo(from.x + 50, from.y + 20);
        ctx.lineTo(to.x + 50, to.y + 30);
        ctx.stroke();
        ctx.restore();
    },

    complete(game) {
        this.completed = true;
        game.showDialogue('Morgan', 'Aww, who\'s a good girl! Yes you are, Zyra!');

        setTimeout(() => {
            game.hideDialogue();
            game.showMissionBanner('Mission Complete!', 'Mom noticed you! Time for the backyard!');
            CONFIG.missions[1].unlocked = true;

            setTimeout(() => {
                game.hideMissionBanner();
                game.showMissionSelect();
            }, 3000);
        }, 2000);
    }
};
