"use client";
import "@/app/globals.css";
import { FormInputText } from "@/components/form-components/input-text/FormInputText";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IRegisterFormInput {
  email: string;
  password: string;
}

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const { handleSubmit, control } = useForm<IRegisterFormInput>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: IRegisterFormInput) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/signin");
      }
    } catch (error) {
      setError("Error, try again");
    }
  };
  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="p-8 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
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
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </div>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/signin"
          >
            Login with an existing account
          </Link>
        </div>
      </div>
    )
  );
};

export default Register;
