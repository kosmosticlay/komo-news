import type { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "PUT" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ ok: false, error: "Internal Server Error" });
    }
  };
}
