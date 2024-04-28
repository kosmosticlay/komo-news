import FormInput from "@/components/enter/FormInput";
import SubmitBtn from "@/components/enter/SubmitBtn";
import Title from "@/components/enter/EnterTitle";
import Head from "next/head";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import useMutation from "../api/client/useMutation";

interface ISignUpForm {
  username: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export default function SignUp() {
  const [createAccount, { loading, data, error }] = useMutation(
    "/api/create-account"
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpForm>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const submitSignup: SubmitHandler<ISignUpForm> = (data) => {
    if (data.password !== data.confirmedPassword) {
      setError(
        "confirmedPassword",
        { message: "Passwords do not match" },
        { shouldFocus: true }
      );
      return;
    }

    createAccount(data);

    /* 이거 세션할떄 써야돼!!! */
    setIsLoggedIn((prev) => !prev);
    // router.replace("/login");
  };

  return (
    <>
      <Head>
        <title>Sign Up | Nomad Report</title>
      </Head>
      <div className="w-full min-w-[400px] h-screen home_bgImage flex flex-col justify-center items-center">
        <div className="w-1/5 min-w-[340px] flex flex-col items-center justify-start">
          <Title>Sign Up</Title>
          <form onSubmit={handleSubmit(submitSignup)} className="w-full">
            <FormInput
              {...register("username", {
                required: "Please write your username",
              })}
              placeholder="username"
              type="text"
              errors={errors}
            />
            <FormInput
              {...register("email", {
                required: "Please write your email",
              })}
              placeholder="email"
              type="email"
              errors={errors}
            />
            <FormInput
              {...register("password", {
                required: "Please write your password",
              })}
              placeholder="password"
              type="password"
              errors={errors}
            />
            <FormInput
              {...register("confirmedPassword", {
                required: "Please confirm your password",
              })}
              placeholder="confirmed password"
              type="password"
              errors={errors}
            />
            <SubmitBtn>Sign Up</SubmitBtn>
          </form>
          <div className="text-white bg-black text-center w-full py-2 mt-2 rounded-md opacity-80">
            <span className="mr-2">Already reporting?</span>
            <Link className="hover:underline text-accent-main" href="/login">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
