const fs = require('fs-extra');
const path = require('path');

module.exports = async (req, res) => {
    const dbPath = path.resolve(process.cwd(), 'api', 'db.json');

    if (req.method === 'GET') {
        try {
            const data = await fs.readJson(dbPath);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error reading data', error });
        }
    } else if (req.method === 'POST') {
        try {
            await fs.writeJson(dbPath, req.body, { spaces: 2 });
            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error writing data', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
