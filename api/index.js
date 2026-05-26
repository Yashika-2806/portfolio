import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

module.exports = async (req, res) => {
    if (req.method === 'GET') {
            const data = await redis.get('user_data');
            if (data) {
                res.status(200).json(data);
            } else {
                // If no data in Redis, read from the local file as a fallback
                const fallbackData = await fs.readJson(path.resolve(process.cwd(), 'src', 'data', 'db.json'));
                res.status(200).json(fallbackData);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error reading data', error: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            // Upstash Redis stores JSON, so we can pass the object directly.
            await redis.set('user_data', req.body);
            res.status(200).json({ message: 'Data updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error writing data to Upstash Redis', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
