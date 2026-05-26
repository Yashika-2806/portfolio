import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    const data = await redis.get("portfolio");

    if (!data) {
      return res.status(404).json({
        error: "No portfolio data found",
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
