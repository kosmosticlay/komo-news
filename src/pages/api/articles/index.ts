import type { NextApiRequest, NextApiResponse } from "next";
import client from "../server/client";
import withHandler from "../server/withHandler";
import { withApiSession } from "../server/withSession";

type Data = {
  ok: boolean;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const articles = await client.article.findMany({
      include: {
        user: true,
        _count: {
          select: { favorites: true },
        },
      },
    });
    res.status(200).json({
      ok: true,
      articles,
    });
  }
  if (req.method === "POST") {
    const { title, description, hashtags, imageUrl } = req.body;
    const { user } = req.session;

    const article = await client.article.create({
      data: {
        title,
        description,
        hashtags,
        imageUrl,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      article,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
