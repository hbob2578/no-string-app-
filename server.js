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

app.listen(PORT, () => {
    console.log(`Speakeasy server running on port ${PORT}`);
});