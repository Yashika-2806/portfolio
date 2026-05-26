import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    const portfolioData = await redis.get("portfolio");

    console.log("Redis data:", portfolioData);

    if (!portfolioData) {
      return res.status(404).json({
        success: false,
        message: "No portfolio data found",
      });
    }

    return res.status(200).json({
      success: true,
      data: portfolioData,
    });

  } catch (error) {
    console.error("FULL API ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
