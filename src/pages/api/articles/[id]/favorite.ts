import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../server/client";
import withHandler from "../../server/withHandler";
import { withApiSession } from "../../server/withSession";
import { connect } from "http2";

type Data = {
  ok: boolean;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const id = req.query.id as string;
  const user = req.session.user;

  const isExist = await client.fav.findFirst({
    where: {
      articleId: +id.toString(),
      userId: user.id,
    },
  });

  if (isExist) {
    await client.fav.delete({
      where: {
        id: isExist.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        article: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({ ok: true });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
