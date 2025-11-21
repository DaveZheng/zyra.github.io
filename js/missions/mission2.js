// Mission 2: Frisbee in the Backyard
const Mission2 = {
    id: 2,
    title: 'Mission 2: Frisbee Time',
    description: 'Catch frisbees until exhausted, then signal you\'re done!',

    // Mission state
    frisbeeCatches: 0,
    requiredCatches: 8,
    exhaustion: 0,
    maxExhaustion: 100,
    exhausted: false,
    signaling: false,
    signalTimer: 0,
    requiredSignalTime: 3,
    completed: false,

    // Entities
    zyra: null,
    morgan: null,
    david: null,
    frisbee: null,
    thrower: null, // Who threw the frisbee

    init(game) {
        this.frisbeeCatches = 0;
        this.exhaustion = 0;
        this.exhausted = false;
        this.signaling = false;
        this.signalTimer = 0;
        this.completed = false;

        // Create entities - backyard positions
        this.zyra = new Zyra(400, 400);
        this.morgan = new Human(100, 300, 'morgan');
        this.david = new Human(200, 350, 'david');
        this.frisbee = new Frisbee(100, 280);

        // Parents stand still in the backyard
        this.morgan.waypoints = [];
        this.david.waypoints = [];

        this.thrower = this.morgan;

        game.showMissionBanner(this.title, this.description);

        // Start throwing after intro
        setTimeout(() => {
            this.throwFrisbee();
        }, 2500);
    },

    throwFrisbee() {
        if (this.exhausted || this.completed) return;

        // Alternate throwers
        this.thrower = this.thrower === this.morgan ? this.david : this.morgan;
        this.frisbee.x = this.thrower.x + 50;
        this.frisbee.y = this.thrower.y;

        // Random target position
        const targetX = 300 + Math.random() * 400;
        const targetY = 250 + Math.random() * 250;

        this.frisbee.throw(targetX, targetY, 250 + Math.random() * 100);
    },

    update(game, dt) {
        if (this.completed) return;

        const keys = game.keys;

        // Update entities
        this.zyra.update(dt, keys);
        this.frisbee.update(dt);

        if (!this.exhausted) {
            // Check frisbee catch
            if (this.frisbee.isFlying && !this.frisbee.caught) {
                const dx = this.zyra.x - this.frisbee.x;
                const dy = this.zyra.y - this.frisbee.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 60) {
                    this.frisbee.caught = true;
                    this.frisbee.isFlying = false;
                    this.frisbeeCatches++;
                    this.exhaustion += 12;
                    this.zyra.state = 'happy';

                    game.showDialogue(
                        this.thrower === this.morgan ? 'Morgan' : 'David',
                        ['Good catch!', 'Nice one, Zyra!', 'Go get it!', 'Atta girl!'][
                            Math.floor(Math.random() * 4)
                        ]
                    );

                    // Throw again after a delay
                    setTimeout(() => {
                        game.hideDialogue();
                        if (!this.exhausted) {
                            this.throwFrisbee();
                        }
                    }, 1500);
                }
            }

            // Frisbee landed without catch
            if (!this.frisbee.isFlying && !this.frisbee.caught) {
                setTimeout(() => {
                    if (!this.frisbee.isFlying && !this.exhausted) {
                        this.throwFrisbee();
                    }
                }, 2000);
                this.frisbee.caught = true; // Mark as handled
            }

            // Check if exhausted
            if (this.frisbeeCatches >= this.requiredCatches) {
                this.exhausted = true;
                this.frisbee.isFlying = false;
                game.showDialogue('', 'Zyra is exhausted! Signal that you\'re done by sitting still with the frisbee out of reach.');

                setTimeout(() => {
                    game.hideDialogue();
                }, 3000);
            }

            game.updateProgress(this.frisbeeCatches, this.requiredCatches, 'Frisbees caught');
            game.setObjective('Catch the frisbee! (WASD/Arrows to move)');
        } else {
            // Exhausted - need to signal done
            // Place frisbee near Zyra but out of parent's reach
            if (!this.signaling) {
                this.frisbee.x = this.zyra.x + 60;
                this.frisbee.y = this.zyra.y;
            }

            // Check if properly signaling
            const zyraStill = Math.abs(this.zyra.vx) < 1 && Math.abs(this.zyra.vy) < 1;
            const farFromParents = this.getDistanceToClosestParent() > 200;
            const lookingAtParent = this.zyra.checkEyeContact(this.morgan) ||
                                   this.zyra.checkEyeContact(this.david);

            if (zyraStill && farFromParents && lookingAtParent) {
                this.signaling = true;
                this.signalTimer += dt;
                this.zyra.state = 'sitting';
                game.updateProgress(this.signalTimer, this.requiredSignalTime, 'Signaling...');

                if (this.signalTimer >= this.requiredSignalTime) {
                    this.complete(game);
                }
            } else {
                this.signaling = false;
                this.signalTimer = 0;
            }

            // Update objective
            if (!farFromParents) {
                game.setObjective('Move away from Mom and Dad (stay out of reach)');
            } else if (!zyraStill) {
                game.setObjective('Sit still!');
            } else if (!lookingAtParent) {
                game.setObjective('Look at Mom or Dad');
            } else {
                game.setObjective('Hold still...');
            }
        }
    },

    getDistanceToClosestParent() {
        const dx1 = this.zyra.x - this.morgan.x;
        const dy1 = this.zyra.y - this.morgan.y;
        const dx2 = this.zyra.x - this.david.x;
        const dy2 = this.zyra.y - this.david.y;
        return Math.min(
            Math.sqrt(dx1 * dx1 + dy1 * dy1),
            Math.sqrt(dx2 * dx2 + dy2 * dy2)
        );
    },

    draw(game, ctx) {
        // Draw backyard background
        this.drawBackground(ctx);

        // Draw entities
        this.morgan.draw(ctx);
        this.david.draw(ctx);
        this.frisbee.draw(ctx);
        this.zyra.draw(ctx);

        // Draw exhaustion bar if getting tired
        if (this.exhaustion > 0) {
            this.drawExhaustionBar(ctx);
        }
    },

    drawBackground(ctx) {
        // Sky
        ctx.fillStyle = CONFIG.colors.sky;
        ctx.fillRect(0, 0, CONFIG.canvas.width, 200);

        // Grass
        ctx.fillStyle = CONFIG.colors.grass;
        ctx.fillRect(0, 200, CONFIG.canvas.width, CONFIG.canvas.height - 200);

        // Darker grass patches
        ctx.fillStyle = '#3cb371';
        for (let i = 0; i < 20; i++) {
            const x = (i * 137) % CONFIG.canvas.width;
            const y = 220 + (i * 73) % 350;
            ctx.fillRect(x, y, 30, 20);
        }

        // Fence
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(0, 180, CONFIG.canvas.width, 20);
        for (let i = 0; i < CONFIG.canvas.width; i += 60) {
            ctx.fillRect(i, 120, 15, 80);
        }

        // Sun
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(700, 80, 40, 0, Math.PI * 2);
        ctx.fill();
    },

    drawExhaustionBar(ctx) {
        const barWidth = 150;
        const barHeight = 15;
        const x = CONFIG.canvas.width - barWidth - 20;
        const y = 20;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(x - 5, y - 5, barWidth + 10, barHeight + 30);

        ctx.fillStyle = '#666';
        ctx.fillRect(x, y, barWidth, barHeight);

        const fillWidth = (this.exhaustion / this.maxExhaustion) * barWidth;
        ctx.fillStyle = this.exhaustion > 80 ? '#ef4444' : '#fbbf24';
        ctx.fillRect(x, y, fillWidth, barHeight);

        ctx.fillStyle = 'white';
        ctx.font = '10px "Press Start 2P"';
        ctx.fillText('Tired', x, y + 28);
    },

    complete(game) {
        this.completed = true;

        game.showDialogue('Morgan', 'Okay Zyra, I get it! Let\'s go inside and rest.');

        setTimeout(() => {
            game.hideDialogue();
            game.showMissionBanner('Mission Complete!',
                'Great job! Zyra successfully communicated she was done playing!');

            setTimeout(() => {
                game.hideMissionBanner();
                game.showMissionSelect();
            }, 3000);
        }, 2500);
    }
};
