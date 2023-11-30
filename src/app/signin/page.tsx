"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import utils from "@/utils/utils";
import { useForm } from "react-hook-form";
import { FormInputText } from "@/components/form-components/input-text/FormInputText";

interface ILoginFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/admin/post");
    }
  }, [sessionStatus, router]);
  const { handleSubmit, control } = useForm<ILoginFormInput>();

  const onSubmit = async (data: ILoginFormInput) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setError("Invalid email or password");
        if (res?.url) router.replace("/admin/post");
      } else {
        setError("");
      }
    } catch (error) {
      setError("Error, try again");
    }
  };
  const handleSubmitss = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!utils.string.isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/admin/post");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
          <div>
            <FormInputText
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              name="email"
              control={control}
              label="Email"
              type="email"
              required={true}
              pattern={{
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              }}
            />
            <FormInputText
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              name="password"
              control={control}
              label="Password"
              type="password"
              required={true}
            />
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => {
              signIn("github");
            }}
          >
            Sign In with Github
          </button>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/signup"
          >
            Register Here
          </Link>
        </div>
      </div>
    )
  );
}

export default LoginPage;
