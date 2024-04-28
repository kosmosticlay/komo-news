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
  const { username, password } = req.body;

  // 이미 존재하는 username인지 확인
  const existingUsername = await client.user.findUnique({
    where: { username },
  });
  if (!existingUsername) {
    return res.status(409).json({
      ok: false,
      message: "Username does not exist. Are you sure you are an reporter?",
      location: "/login",
    });
  }

  // 로그인 시 password 확인
  const user = await client.user.findFirst({
    where: { username, password },
  });

  if (!user) {
    return res.status(401).json({
      ok: false,
      message: "Invalid password. Please try again.",
      location: "/login",
    });
  }
  // 유저 확인
  // console.log(user);

  // 세션 생성하기
  req.session.user = {
    id: user.id,
  };
  await req.session.save();

  res.status(200).json({
    ok: true,
    message: "Successfully logged in! You can write an article now.",
    location: "/",
  });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
