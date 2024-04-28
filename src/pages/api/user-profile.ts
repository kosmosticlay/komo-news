import type { NextApiRequest, NextApiResponse } from "next";
import client from "./server/client";
import withHandler from "./server/withHandler";
import { withApiSession } from "./server/withSession";

type Data = {
  ok: boolean;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user.id },
  });

  res.status(200).json({ ok: true, profile });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
