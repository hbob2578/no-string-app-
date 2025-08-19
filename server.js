const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Secret entrance route (speakeasy theme)
app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'secret.html'));
});

// Status report endpoint
app.get('/status', (req, res) => {
    const packageJson = require('./package.json');
    const uptime = process.uptime();
    
    const statusReport = {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        status: 'running',
        uptime: `${Math.floor(uptime)} seconds`,
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        routes: [
            { path: '/', method: 'GET', description: 'Main entrance to speakeasy' },
            { path: '/secret', method: 'GET', description: 'Secret speakeasy room' },
            { path: '/status', method: 'GET', description: 'Status report endpoint' }
        ]
    };
    
    res.json(statusReport);
});

app.listen(PORT, () => {
    console.log(`Speakeasy server running on port ${PORT}`);
});