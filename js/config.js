// Game configuration - easy to expand
const CONFIG = {
    canvas: {
        width: 800,
        height: 600,
        pixelScale: 4 // For that chunky pixel look
    },
    colors: {
        // Zyra (assuming she's a golden/tan dog)
        zyra: {
            body: '#d4a574',
            dark: '#a67c52',
            light: '#e8c49a'
        },
        // Morgan - blonde, white
        morgan: {
            skin: '#fcd5b8',
            hair: '#f4d03f',
            clothes: '#ec4899'
        },
        // David - Chinese
        david: {
            skin: '#e8c49a',
            hair: '#1a1a1a',
            clothes: '#3b82f6'
        },
        // Environment
        floor: '#8b7355',
        wall: '#d4c4a8',
        grass: '#4ade80',
        sky: '#87ceeb'
    },
    missions: [
        {
            id: 1,
            title: 'Mission 1: Eye Contact',
            description: 'Catch Mom\'s eye for 10 seconds!',
            unlocked: true
        },
        {
            id: 2,
            title: 'Mission 2: Frisbee Time',
            description: 'Catch frisbees until exhausted!',
            unlocked: false
        }
    ]
};
