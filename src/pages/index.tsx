import React, { type FC, useEffect } from "react";
import { useTheme } from 'next-themes';
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { Button } from 'lift-companion-ui';
import { CreateExerciseModal } from "../components/Modals/CreateExerciseModal";
import Link from "next/link";
import { buttonVariants } from "lift-companion-ui/dist/components/Button/Button";

const Home: NextPage = () => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-mode', 'dark')
    } else {
      document.body.setAttribute('data-mode', '')
    }
  }, [theme])

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main className="flex flex-col min-h-screen min-w-screen p-10 grow">Loading...</main>;
  }

  return (
    <>
      {session ? <Dashboard /> : <Landing />}
    </>
  );
};

const Dashboard: FC = () => {
  return (
    <div className="flex justify-center gap-2">
      <CreateExerciseModal />
      <Link href="/exercises" className={buttonVariants({ variant: "outline" })}>
        View Exercises
      </Link>
    </div>
  );
};

const Landing: FC = () => {
  return (
    <>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md w-72 text-center">An app to track lifting sessions and provide insight on the saved data.</p>
        <Button
          onClick={() => {
            signIn("discord").catch(console.log);
          }}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default Home;
