import React from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Button } from "../components";
import { signIn } from 'next-auth/react';
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main className="flex flex-col min-h-screen min-w-screen p-10 grow">Loading...</main>;
  }

  return (
    <>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md w-72 text-center">An app to track lifting sessions and provide insight on the saved data.</p>
        <div className="flex gap-4">
          {
            status === 'authenticated' ? (
              <Link
                href="/dashboard"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Button
                onClick={() => {
                  signIn("discord").catch(console.log);
                }}
              >
                Login
              </Button>
            )
          }

        </div>
      </div>
    </>
  );
};

export default Home;
