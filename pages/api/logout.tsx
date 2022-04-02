import { NextApiRequest, NextApiResponse } from "next";
import { cacheToken, getToken, logout } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await logout();
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error, msg: "server is down" });
  }
}
