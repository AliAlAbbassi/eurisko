import { NextApiRequest, NextApiResponse } from "next";
import { cacheToken, getToken } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await cacheToken(req.body.accessToken);
      res.status(200);
    } else {
      const token = await getToken();
      res.status(200).json(token);
    }
  } catch (error) {
    res.status(500).json({ error: error, msg: "Server is down bad" });
  }
}
