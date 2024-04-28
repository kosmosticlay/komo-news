import FormInput from "@/components/enter/FormInput";
import SubmitBtn from "@/components/enter/SubmitBtn";
import Title from "@/components/enter/EnterTitle";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import useMutation from "../api/client/useMutation";

const inter = Inter({ subsets: ["latin"] });

interface ILoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [login, { loading, data, error }] = useMutation("/api/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const submitLogin: SubmitHandler<ILoginForm> = (data) => {
    login(data);
    setIsLoggedIn((prev) => !prev);
  };

  // session이 있는 상태면 바로 home으로 이동하는 로직 추가해야해

  return (
    <>
      <Head>
        <title>Login | Nomad Today News</title>
      </Head>
      <div className="w-full min-w-[400px] h-screen home_bgImage flex justify-center items-center">
        <div className="w-1/5 min-w-[340px] flex flex-col items-center justify-start">
          <Title>Login</Title>
          <form
            onSubmit={handleSubmit(submitLogin)}
            className="min-w-[340px] flex flex-col justify-between h-40"
          >
            <FormInput
              {...register("username")}
              placeholder="username"
              type="text"
            />
            <FormInput
              {...register("password")}
              placeholder="password"
              type="password"
            />
            <SubmitBtn>Login</SubmitBtn>
          </form>
          <div className="text-white bg-black text-center w-full py-2 mt-2 rounded-md opacity-80">
            <span className="mr-2">New reporter?</span>
            <Link className="hover:underline text-accent-main" href="/sign-up">
              Start Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
