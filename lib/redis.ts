import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  password: process.env.REDIS_PASS,
});

export const cacheToken = async (accessToken: string) => {
  await redis.set("token", accessToken);
};

export const getToken = async () => {
  return await redis.get("token");
};

export const logout = async () => {
  return await redis.del("token");
};
