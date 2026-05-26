import { Redis } from '@upstash/redis';

// Use "export default" for ES Modules
export default async function handler(req, res) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return res.status(500).json({ message: 'FATAL: Environment variables for Redis are not configured.' });
  }

  // Initialize Redis client inside the handler
  const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  if (req.method === 'GET') {
    try {
      const dataString = await redis.get('user_data');
      if (dataString) {
        // Data is stored as a string, so we need to parse it
        res.status(200).json(JSON.parse(dataString));
      } else {
        res.status(404).json({ message: 'No data found in Redis.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error reading or parsing data from Upstash Redis', error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      // Explicitly stringify the data before setting it
      const dataString = JSON.stringify(req.body);
      await redis.set('user_data', dataString);
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error stringifying or writing data to Upstash Redis', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
