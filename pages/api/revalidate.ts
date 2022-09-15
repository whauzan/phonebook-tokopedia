import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_HASURA_SECRET) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  try {
    await res.revalidate('/');
    return res.status(200).json({ revalidated: true });
  } catch (e) {
    return res.status(500).json('Error revalidating');
  }
}