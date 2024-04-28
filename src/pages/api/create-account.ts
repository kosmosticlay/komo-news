import type { NextApiRequest, NextApiResponse } from "next";
import client from "./server/client";
import withHandler from "./server/withHandler";
import { withApiSession } from "./server/withSession";

type Data = {
  ok: boolean;
  message: string;
  location?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { username, email, password } = req.body;

  // Check for existing username
  const existingUsername = await client.user.findUnique({
    where: { username },
  });

  if (existingUsername) {
    return res.status(409).json({
      ok: false,
      message: "Username already exists. Please choose another username.",
      location: "/sign-up",
    });
  }

  // Check for existing email
  const existingEmail = await client.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    return res.status(409).json({
      ok: false,
      message: "Email already exists. Please use a different email.",
      location: "/sign-up",
    });
  }

  // Create new user if no conflicts
  await client.user.create({
    data: { username, email, password },
  });

  res.status(200).json({
    ok: true,
    message: "User created successfully",
    location: "/login",
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
