const request = require('supertest');
const express = require('express');
const path = require('path');

// Create the same app setup as in server.js for testing
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'secret.html'));
});

describe('Speakeasy App', () => {
    test('GET / should return the main page', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        
        expect(response.text).toContain('The Whispered Word');
        expect(response.text).toContain('Speakeasy');
    });

    test('GET /secret should return the secret page', async () => {
        const response = await request(app)
            .get('/secret')
            .expect(200);
        
        expect(response.text).toContain('Welcome to the Inner Sanctum');
        expect(response.text).toContain('The Real McCoy');
    });

    test('GET /health should return health status', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200);
        
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body.status).toBe('healthy');
        expect(response.body.timestamp).toBeDefined();
    });

    test('Static files should be served', async () => {
        const response = await request(app)
            .get('/styles.css')
            .expect(200);
        
        expect(response.headers['content-type']).toContain('text/css');
    });

    test('JavaScript files should be served', async () => {
        const response = await request(app)
            .get('/script.js')
            .expect(200);
        
        expect(response.headers['content-type']).toContain('javascript');
        expect(response.text).toContain('checkPassword');
    });
});