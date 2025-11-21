// Game configuration - easy to expand
const CONFIG = {
    canvas: {
        width: 800,
        height: 600,
        pixelScale: 4 // For that chunky pixel look
    },
    colors: {
        // Zyra - border collie (black and white)
        zyra: {
            body: '#1a1a1a',      // Black
            dark: '#0f0f0f',      // Darker black
            light: '#ffffff',     // White
            tan: '#d4a574'        // Tan/brown accents
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
            title: 'The Staring Contest',
            description: '???',
            unlocked: true
        },
        {
            id: 2,
            title: 'Disc-o Fever',
            description: '???',
            unlocked: false
        }
    ]
};
