import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const data = await redis.get('user_data');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Error reading data from Upstash Redis', error });
        }
    } else if (req.method === 'POST') {
        try {
            await redis.set('user_data', req.body);
            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error writing data to Upstash Redis', error });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
