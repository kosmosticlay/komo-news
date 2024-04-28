import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "nomad-reporter-session",
  password: process.env.SECRET_COOKIE_PASSWORD!,
};
// 페이지를 렌더링할 때 session을 받아오기

// API route에서 session을 받아오기
export function withApiSession(handler: any) {
  return withIronSessionApiRoute(handler, cookieOptions);
}
