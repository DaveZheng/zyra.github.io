// Pixel art sprite drawing utilities
const Sprites = {
    // Draw a pixel (scaled)
    pixel(ctx, x, y, color, scale = CONFIG.canvas.pixelScale) {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
    },

    // Draw Zyra (dog) - simplified pixel art
    drawZyra(ctx, x, y, direction = 'right', frame = 0, state = 'idle') {
        const s = CONFIG.canvas.pixelScale;
        const c = CONFIG.colors.zyra;

        ctx.save();
        ctx.translate(x, y);

        if (direction === 'left') {
            ctx.scale(-1, 1);
            ctx.translate(-32, 0);
        }

        // Body
        ctx.fillStyle = c.body;
        ctx.fillRect(4*s, 8*s, 16*s, 10*s);

        // Darker underside
        ctx.fillStyle = c.dark;
        ctx.fillRect(4*s, 14*s, 16*s, 4*s);

        // Head
        ctx.fillStyle = c.body;
        ctx.fillRect(18*s, 4*s, 10*s, 10*s);

        // Snout
        ctx.fillStyle = c.light;
        ctx.fillRect(26*s, 8*s, 4*s, 4*s);

        // Nose
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(28*s, 9*s, 2*s, 2*s);

        // Eye
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(24*s, 6*s, 2*s, 2*s);

        // Ears
        ctx.fillStyle = c.dark;
        ctx.fillRect(18*s, 2*s, 4*s, 4*s);
        ctx.fillRect(24*s, 2*s, 4*s, 4*s);

        // Tail (wagging based on frame)
        const tailOffset = state === 'happy' ? Math.sin(frame * 0.3) * 2 : 0;
        ctx.fillStyle = c.body;
        ctx.fillRect(0*s, (6 + tailOffset)*s, 4*s, 4*s);

        // Legs (animated based on frame)
        const legOffset = state === 'walking' ? Math.sin(frame * 0.2) * 2 : 0;
        ctx.fillStyle = c.dark;
        ctx.fillRect((6 + legOffset)*s, 18*s, 3*s, 6*s);
        ctx.fillRect((14 - legOffset)*s, 18*s, 3*s, 6*s);

        // Sitting pose adjustment
        if (state === 'sitting') {
            ctx.fillStyle = c.body;
            ctx.fillRect(8*s, 14*s, 12*s, 8*s);
        }

        ctx.restore();
    },

    // Draw Morgan (blonde woman)
    drawMorgan(ctx, x, y, direction = 'right', frame = 0, state = 'idle') {
        const s = CONFIG.canvas.pixelScale;
        const c = CONFIG.colors.morgan;

        ctx.save();
        ctx.translate(x, y);

        if (direction === 'left') {
            ctx.scale(-1, 1);
            ctx.translate(-24, 0);
        }

        // Hair (blonde, longer)
        ctx.fillStyle = c.hair;
        ctx.fillRect(4*s, 0*s, 16*s, 8*s);
        ctx.fillRect(2*s, 8*s, 6*s, 12*s); // Side hair
        ctx.fillRect(16*s, 8*s, 6*s, 12*s);

        // Head/face
        ctx.fillStyle = c.skin;
        ctx.fillRect(6*s, 4*s, 12*s, 12*s);

        // Eyes
        ctx.fillStyle = '#3b82f6'; // Blue eyes
        ctx.fillRect(8*s, 8*s, 2*s, 2*s);
        ctx.fillRect(14*s, 8*s, 2*s, 2*s);

        // Smile
        ctx.fillStyle = '#ec4899';
        ctx.fillRect(10*s, 12*s, 4*s, 2*s);

        // Body/shirt
        ctx.fillStyle = c.clothes;
        ctx.fillRect(4*s, 16*s, 16*s, 16*s);

        // Arms
        const armOffset = state === 'walking' ? Math.sin(frame * 0.15) * 2 : 0;
        ctx.fillStyle = c.skin;
        ctx.fillRect(0*s, (18 + armOffset)*s, 4*s, 10*s);
        ctx.fillRect(20*s, (18 - armOffset)*s, 4*s, 10*s);

        // Legs/pants
        ctx.fillStyle = '#1e40af';
        const legOffset = state === 'walking' ? Math.sin(frame * 0.15) * 3 : 0;
        ctx.fillRect((6 + legOffset)*s, 32*s, 5*s, 12*s);
        ctx.fillRect((13 - legOffset)*s, 32*s, 5*s, 12*s);

        ctx.restore();
    },

    // Draw David (Chinese man)
    drawDavid(ctx, x, y, direction = 'right', frame = 0, state = 'idle') {
        const s = CONFIG.canvas.pixelScale;
        const c = CONFIG.colors.david;

        ctx.save();
        ctx.translate(x, y);

        if (direction === 'left') {
            ctx.scale(-1, 1);
            ctx.translate(-24, 0);
        }

        // Hair (black, shorter)
        ctx.fillStyle = c.hair;
        ctx.fillRect(6*s, 0*s, 12*s, 6*s);

        // Head/face
        ctx.fillStyle = c.skin;
        ctx.fillRect(6*s, 4*s, 12*s, 12*s);

        // Eyes
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(8*s, 8*s, 3*s, 2*s);
        ctx.fillRect(13*s, 8*s, 3*s, 2*s);

        // Glasses (optional nerdy touch)
        ctx.fillStyle = '#374151';
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = s;
        ctx.strokeRect(7*s, 7*s, 5*s, 4*s);
        ctx.strokeRect(12*s, 7*s, 5*s, 4*s);

        // Body/shirt
        ctx.fillStyle = c.clothes;
        ctx.fillRect(4*s, 16*s, 16*s, 16*s);

        // Arms
        const armOffset = state === 'walking' ? Math.sin(frame * 0.15) * 2 : 0;
        ctx.fillStyle = c.skin;
        ctx.fillRect(0*s, (18 + armOffset)*s, 4*s, 10*s);
        ctx.fillRect(20*s, (18 - armOffset)*s, 4*s, 10*s);

        // Legs/pants
        ctx.fillStyle = '#374151';
        const legOffset = state === 'walking' ? Math.sin(frame * 0.15) * 3 : 0;
        ctx.fillRect((6 + legOffset)*s, 32*s, 5*s, 12*s);
        ctx.fillRect((13 - legOffset)*s, 32*s, 5*s, 12*s);

        ctx.restore();
    },

    // Draw frisbee
    drawFrisbee(ctx, x, y, rotation = 0) {
        const s = CONFIG.canvas.pixelScale;
        ctx.save();
        ctx.translate(x + 8*s, y + 8*s);
        ctx.rotate(rotation);
        ctx.translate(-8*s, -8*s);

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(2*s, 2*s, 12*s, 12*s);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(4*s, 4*s, 8*s, 8*s);

        ctx.restore();
    },

    // Draw door
    drawDoor(ctx, x, y) {
        const s = CONFIG.canvas.pixelScale;
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x, y, 20*s, 40*s);
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x + 2*s, y + 2*s, 16*s, 36*s);
        // Door knob
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(x + 14*s, y + 20*s, 3*s, 3*s);
    }
};
