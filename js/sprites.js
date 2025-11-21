// Pixel art sprite drawing utilities
const Sprites = {
    // Draw Zyra's face close-up for title screen
    drawZyraFace(ctx, x, y, scale = 8) {
        const s = scale;
        ctx.save();
        ctx.translate(x, y);

        // Face shape - black sides, white center blaze
        // Left side black
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 4*s, 8*s, 20*s);
        // Right side black
        ctx.fillRect(16*s, 4*s, 8*s, 20*s);
        // Top black
        ctx.fillRect(4*s, 0, 16*s, 6*s);

        // White blaze down center
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8*s, 4*s, 8*s, 20*s);

        // Forehead black patches
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(6*s, 4*s, 3*s, 4*s);
        ctx.fillRect(15*s, 4*s, 3*s, 4*s);

        // Eyes - heterochromia: left brown, right blue
        ctx.fillStyle = '#8B4513'; // Brown left eye
        ctx.fillRect(4*s, 8*s, 4*s, 3*s);
        ctx.fillStyle = '#3b82f6'; // Blue right eye
        ctx.fillRect(16*s, 8*s, 4*s, 3*s);
        // Eye highlights
        ctx.fillStyle = '#D2691E';
        ctx.fillRect(5*s, 9*s, 2*s, 1*s);
        ctx.fillStyle = '#60a5fa';
        ctx.fillRect(17*s, 9*s, 2*s, 1*s);
        // Pupils
        ctx.fillStyle = '#000000';
        ctx.fillRect(6*s, 9*s, 2*s, 2*s);
        ctx.fillRect(18*s, 9*s, 2*s, 2*s);

        // Snout - white/cream
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(6*s, 14*s, 12*s, 8*s);

        // Pink on snout
        ctx.fillStyle = '#ffcccc';
        ctx.fillRect(8*s, 16*s, 8*s, 4*s);

        // Nose - black with pink
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(9*s, 18*s, 6*s, 4*s);
        ctx.fillStyle = '#4a4a4a';
        ctx.fillRect(10*s, 19*s, 4*s, 2*s);

        // Whisker dots
        ctx.fillStyle = '#333';
        ctx.fillRect(4*s, 17*s, 1*s, 1*s);
        ctx.fillRect(5*s, 18*s, 1*s, 1*s);
        ctx.fillRect(18*s, 17*s, 1*s, 1*s);
        ctx.fillRect(19*s, 18*s, 1*s, 1*s);

        // Ears - floppy black
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(-2*s, 2*s, 6*s, 8*s);
        ctx.fillRect(20*s, 2*s, 6*s, 8*s);

        ctx.restore();
    },

    // Draw a pixel (scaled)
    pixel(ctx, x, y, color, scale = CONFIG.canvas.pixelScale) {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
    },

    // Draw Zyra (border collie) - black and white with distinctive markings
    drawZyra(ctx, x, y, direction = 'right', frame = 0, state = 'idle') {
        const s = CONFIG.canvas.pixelScale;
        const c = CONFIG.colors.zyra;

        ctx.save();
        ctx.translate(x, y);

        if (direction === 'left') {
            ctx.scale(-1, 1);
            ctx.translate(-32, 0);
        }

        // Body - black base
        ctx.fillStyle = c.body;
        ctx.fillRect(4*s, 8*s, 16*s, 10*s);

        // White chest/belly
        ctx.fillStyle = c.light;
        ctx.fillRect(14*s, 10*s, 6*s, 8*s);

        // Head - black with white blaze
        ctx.fillStyle = c.body;
        ctx.fillRect(18*s, 4*s, 10*s, 10*s);

        // White blaze down face (like in photo)
        ctx.fillStyle = c.light;
        ctx.fillRect(22*s, 4*s, 4*s, 10*s);

        // Snout - white/pink
        ctx.fillStyle = c.light;
        ctx.fillRect(26*s, 8*s, 4*s, 4*s);
        ctx.fillStyle = '#ffcccc'; // Pink nose area
        ctx.fillRect(27*s, 10*s, 2*s, 2*s);

        // Nose - black
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(28*s, 9*s, 2*s, 2*s);

        // Eyes - heterochromia: left brown, right blue
        ctx.fillStyle = '#8B4513'; // Brown
        ctx.fillRect(20*s, 6*s, 2*s, 2*s);
        ctx.fillStyle = '#3b82f6'; // Blue
        ctx.fillRect(25*s, 6*s, 2*s, 2*s);

        // Ears - black, floppy border collie ears
        ctx.fillStyle = c.body;
        ctx.fillRect(17*s, 2*s, 4*s, 5*s);
        ctx.fillRect(25*s, 2*s, 4*s, 5*s);

        // Fluffy tail (wagging based on frame) - black with white tip
        const tailOffset = state === 'happy' ? Math.sin(frame * 0.3) * 2 : 0;
        ctx.fillStyle = c.body;
        ctx.fillRect(0*s, (6 + tailOffset)*s, 5*s, 4*s);
        ctx.fillStyle = c.light;
        ctx.fillRect(0*s, (7 + tailOffset)*s, 2*s, 2*s);

        // Legs - white "socks"
        const legOffset = state === 'walking' ? Math.sin(frame * 0.2) * 2 : 0;
        ctx.fillStyle = c.body;
        ctx.fillRect((6 + legOffset)*s, 18*s, 3*s, 4*s);
        ctx.fillRect((14 - legOffset)*s, 18*s, 3*s, 4*s);
        ctx.fillStyle = c.light;
        ctx.fillRect((6 + legOffset)*s, 22*s, 3*s, 2*s);
        ctx.fillRect((14 - legOffset)*s, 22*s, 3*s, 2*s);

        // Sitting pose adjustment
        if (state === 'sitting') {
            ctx.fillStyle = c.body;
            ctx.fillRect(8*s, 14*s, 12*s, 8*s);
            ctx.fillStyle = c.light;
            ctx.fillRect(12*s, 16*s, 6*s, 6*s);
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
