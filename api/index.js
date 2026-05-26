import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await redis.get('user_data');
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'No data found in Redis.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error reading data from Upstash Redis', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      // The request body is already parsed as a JSON object by Vercel
      await redis.set('user_data', req.body);
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error writing data to Upstash Redis', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
