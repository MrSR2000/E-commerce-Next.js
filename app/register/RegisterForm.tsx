"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { FaGoogle } from "react-icons/fa";
import Input from "../components/inputs/Input";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    console.log("login values", data);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();

            toast.success("login successful");
          }
        });
      })
      .catch((e) => {
        toast.error(`Something Went Wrong : $e`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return (
      <p className="text-center">User Already Registered. Redirecting...</p>
    );
  }

  return (
    <>
      <Heading title="SignUp" center />
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
        id="name"
        label="Name"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
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
        type="password"
        required
      />
      <Button
        label={isLoading ? "Loading" : "SIGN UP"}
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

export default RegisterForm;
