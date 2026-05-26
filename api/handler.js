import { Redis } from '@upstash/redis';

// Use "export default" for ES Modules
export default async function handler(req, res) {
  console.log(`Request Method: ${req.method}`);

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    console.error('FATAL: Redis environment variables are not configured.');
    return res.status(500).json({ message: 'FATAL: Environment variables for Redis are not configured.' });
  }

  let redis;
  try {
    console.log('Initializing Redis client...');
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('Redis client initialized successfully.');
  } catch (error) {
    console.error('Error initializing Redis client:', error);
    return res.status(500).json({ message: 'Error initializing Redis client', error: error.message, stack: error.stack });
  }

  if (req.method === 'GET') {
    try {
      console.log("Attempting to get 'user_data' from Redis...");
      const dataString = await redis.get('user_data');
      console.log(dataString ? "Data found in Redis." : "No data found in Redis for key 'user_data'.");

      if (dataString) {
        res.status(200).json(JSON.parse(dataString));
      } else {
        res.status(404).json({ message: 'No data found in Redis.' });
      }
    } catch (error) {
      console.error('Error during GET from Redis:', error);
      res.status(500).json({ message: 'Error reading data from Upstash Redis', error: error.message, stack: error.stack });
    }
  } else if (req.method === 'POST') {
    try {
      console.log("Attempting to set 'user_data' in Redis...");
      const dataString = JSON.stringify(req.body);
      await redis.set('user_data', dataString);
      console.log("Data set in Redis successfully.");
      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error during POST to Redis:', error);
      res.status(500).json({ message: 'Error writing data to Upstash Redis', error: error.message, stack: error.stack });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
