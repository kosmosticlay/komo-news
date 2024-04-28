import type { NextApiRequest, NextApiResponse } from "next";

import { withApiSession } from "./server/withSession";

type Data = {
  ok: boolean;
  message: string;
  location?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  req.session.destroy();
  res.json({ ok: true, message: "Logged out successfully" });
}

export default withApiSession(handler);
