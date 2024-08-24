"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../Components/ui/button";
import { UserAuthForm } from "../Components/user-auth-form";
import PageTitle from "../Components/PageTitle";

export default function AuthenticationPage() {
  return (
    <>
      <PageTitle title="Upload Files DS | Login" />
      <div className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-full lg:grid-cols-2 lg:px-0 rounded-xl border-4 border-gray-500">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex rounded-xl  ">
          <div
            className="absolute inset-0 rounded-xl"
            style={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
          />
          <div className="relative z-20 flex items-center text-lg ont-medium rounded-lg">
            <img src="/protection.png" alt="Logo" className="size-14 mr-3" />
            Upload Files DS
          </div>
          <div className="relative z-20 mt-auto rounded-xl">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;We created this project with a special focus on the
                security and privacy of data and files. By choosing Upload Files
                DS for the storage or transfer of your files, you will benefit
                from a robustly fortified cloud platform.&rdquo;
              </p>
              <footer className="text-sm">Jonathan Zdebski</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p></p>
              <p className="text-sm text-muted-foreground">
                Login below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking , you agree to our{" "}
              <Link
                href=""
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href=""
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
