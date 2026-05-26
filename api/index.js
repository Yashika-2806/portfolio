import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    console.log("API called");

    const data = await redis.get("portfolio");

    console.log("Redis response:", data);
    console.log("Type:", typeof data);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("ACTUAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
}
