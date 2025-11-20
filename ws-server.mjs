import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

console.log('Mock WebSocket server started on port 3001');

const TOKENS = [
    "new-1", "new-2", "new-3", "new-4", "new-5",
    "final-1", "final-2", "final-3", "final-4", "final-5",
    "migrated-1", "migrated-2", "migrated-3", "migrated-4", "migrated-5"
];

// Broadcast updates every 100ms
setInterval(() => {
    const update = {
        type: "price_update",
        tokenId: TOKENS[Math.floor(Math.random() * TOKENS.length)],
        price: Math.random() * 100,
        change24h: (Math.random() * 20) - 10, // -10% to +10%
        volume24h: Math.random() * 1000000,
        liquidity: Math.random() * 500000,
        timestamp: Date.now(),
    };

    const message = JSON.stringify(update);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}, 1000);

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
