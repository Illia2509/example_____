
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const SECRET_KEY = 'your-very-secret-key';

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to verify JWT
app.post('/verify', (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).send(decoded);
    } catch (err) {
        res.status(401).send('Invalid or expired token');
    }
});

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, this is the NestJS API running on Vercel!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
