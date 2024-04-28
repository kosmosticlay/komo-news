import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../server/client";
import withHandler from "../../server/withHandler";
import { withApiSession } from "../../server/withSession";

type Data = {
  ok: boolean;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const id = req.query.id as string;
  const user = req.session.user;
  // Article Detail
  const article = await client.article.findUnique({
    where: {
      id: +id?.toString(),
    },
    include: {
      user: true,
    },
  });

  // Reporter's other articles
  const otherArticles = await client.article.findMany({
    where: {
      userId: article?.userId,
      AND: {
        NOT: {
          id: +id?.toString(),
        },
      },
    },
    include: {
      user: true,
    },
  });

  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        articleId: article?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({ ok: true, article, otherArticles, isLiked });
}
export default withApiSession(withHandler({ methods: ["GET"], handler }));
