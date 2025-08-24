const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Bind to all interfaces for Cloud Run

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Secret entrance route (speakeasy theme)
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'secret.html'));
});

const server = app.listen(PORT, HOST, () => {
    console.log(`Speakeasy server running on ${HOST}:${PORT}`);
});

// Graceful shutdown handling for Cloud Run
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});