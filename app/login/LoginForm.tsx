"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    console.log("here use effect");
    if (currentUser) {
      console.log("eta chiryo ?");
      router.push("/cart");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log("login values", data);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();

        toast.success("login successful");
      } else if (callback?.error) {
        toast.error(`error while logging in : ${callback.error}`);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }
  return (
    <>
      <Heading title="Login" center />
      <hr
        className="
      bg-slate-300
      w-full
      h-px
      "
      />
      <Button
        label="Continue with Google"
        onClick={() => {
          signIn("google");
        }}
        icon={FaGoogle}
        outline
      />
      <Input
        id="email"
        label="Email"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Input
        id="password"
        label="Password"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />
      <Button
        label={isLoading ? "Loading" : "LOGIN"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Donot have an account?{" "}
        <Link href={"/register"} className="underline">
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
