const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const port = 3001;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/api/user', async (req, res) => {
    try {
        const data = await fs.readJson(dbPath);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error reading data', error });
    }
});

app.post('/api/user', async (req, res) => {
    try {
        await fs.writeJson(dbPath, req.body, { spaces: 2 });
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error writing data', error });
    }
});

app.listen(port, () => {
    console.log(`Admin server listening at http://localhost:${port}`);
});
