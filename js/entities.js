// Entity classes for game objects
class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.direction = 'right';
        this.state = 'idle';
        this.frame = 0;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.frame++;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: 32 * CONFIG.canvas.pixelScale,
            height: 32 * CONFIG.canvas.pixelScale
        };
    }
}

class Zyra extends Entity {
    constructor(x, y) {
        super(x, y);
        this.speed = 150;
        this.isLookingAt = null;
        this.eyeContactTimer = 0;
        this.exhaustion = 0;
        this.maxExhaustion = 100;
        this.hasFrisbee = false;
    }

    update(dt, keys) {
        // Handle input
        this.vx = 0;
        this.vy = 0;

        if (keys['ArrowLeft'] || keys['KeyA']) {
            this.vx = -this.speed;
            this.direction = 'left';
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
            this.vx = this.speed;
            this.direction = 'right';
        }
        if (keys['ArrowUp'] || keys['KeyW']) {
            this.vy = -this.speed;
        }
        if (keys['ArrowDown'] || keys['KeyS']) {
            this.vy = this.speed;
        }

        // Update state
        if (this.vx !== 0 || this.vy !== 0) {
            this.state = 'walking';
        } else {
            this.state = 'idle';
        }

        super.update(dt);

        // Bounds checking
        const bounds = this.getBounds();
        if (this.x < 0) this.x = 0;
        if (this.x > CONFIG.canvas.width - bounds.width) {
            this.x = CONFIG.canvas.width - bounds.width;
        }
        if (this.y < 100) this.y = 100;
        if (this.y > CONFIG.canvas.height - bounds.height) {
            this.y = CONFIG.canvas.height - bounds.height;
        }
    }

    draw(ctx) {
        Sprites.drawZyra(ctx, this.x, this.y, this.direction, this.frame, this.state);
    }

    // Check if looking at another entity (simplified - based on facing direction and proximity)
    checkEyeContact(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Must be within range
        if (distance > 300) return false;

        // Check if facing the right direction
        const facingRight = this.direction === 'right';
        const otherIsRight = dx > 0;

        return facingRight === otherIsRight;
    }
}

class Human extends Entity {
    constructor(x, y, type) {
        super(x, y);
        this.type = type; // 'morgan' or 'david'
        this.speed = 80;
        this.waypoints = [];
        this.currentWaypoint = 0;
        this.isLookingAtZyra = false;
        this.dialogue = null;
    }

    setWaypoints(points) {
        this.waypoints = points;
        this.currentWaypoint = 0;
    }

    update(dt) {
        if (this.waypoints.length > 0) {
            const target = this.waypoints[this.currentWaypoint];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
                this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
                this.state = 'idle';
            } else {
                this.vx = (dx / distance) * this.speed;
                this.vy = (dy / distance) * this.speed;
                this.direction = this.vx > 0 ? 'right' : 'left';
                this.state = 'walking';
            }
        }

        super.update(dt);
    }

    draw(ctx) {
        if (this.type === 'morgan') {
            Sprites.drawMorgan(ctx, this.x, this.y, this.direction, this.frame, this.state);
        } else {
            Sprites.drawDavid(ctx, this.x, this.y, this.direction, this.frame, this.state);
        }
    }

    checkLookingAtZyra(zyra) {
        const dx = zyra.x - this.x;
        const dy = zyra.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 250) return false;

        const facingRight = this.direction === 'right';
        const zyraIsRight = dx > 0;

        return facingRight === zyraIsRight;
    }
}

class Frisbee extends Entity {
    constructor(x, y) {
        super(x, y);
        this.rotation = 0;
        this.isFlying = false;
        this.targetX = 0;
        this.targetY = 0;
        this.caught = false;
    }

    throw(targetX, targetY, speed = 300) {
        this.isFlying = true;
        this.caught = false;
        this.targetX = targetX;
        this.targetY = targetY;
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
    }

    update(dt) {
        if (this.isFlying) {
            this.rotation += 10 * dt;
            super.update(dt);

            // Check if reached target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
                this.isFlying = false;
                this.vx = 0;
                this.vy = 0;
            }
        }
    }

    draw(ctx) {
        Sprites.drawFrisbee(ctx, this.x, this.y, this.rotation);
    }
}
