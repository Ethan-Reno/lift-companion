import React, { type FC, useEffect } from "react";
import { useTheme } from 'next-themes';
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { Button, Skeleton, buttonVariants } from 'good-nice-ui';
import Link from "next/link";

const Home: NextPage = () => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-mode', 'dark')
    } else {
      document.body.setAttribute('data-mode', '')
    }
  }, [theme])
  const { data: session } = useSession();
  return (
    <>
      {session ? <Dashboard /> : <Landing />}
    </>
  );
};

const Dashboard: FC = () => {
  const { status } = useSession();
  return (
    <div className="flex justify-center gap-2">
      {status === 'loading' ? (
        <Skeleton className="h-[48px] w-[127px]" />
      ) : (
        <Link href="/exercises" className={buttonVariants({ variant: "outline" })}>
          View Exercises
        </Link>
      )}
    </div>
  );
};

const Landing: FC = () => {
  return (
    <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
      <div className="relative">
        <h1 className="flex text-3xl font-bold">Lift Companion</h1>
        <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
      </div>
      <p className="text-md w-72 text-center">An app to track lifting sessions and provide insight on the saved data.</p>
      <Button
        onClick={() => {
          signIn("discord");
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Home;
