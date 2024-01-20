import React, { type FC, useEffect } from "react";
import { useTheme } from 'next-themes';
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { Button } from 'good-nice-ui';
import { RecentExercisesGrid } from "../../features/dashboard/RecentExercisesGrid";

const Home: NextPage = () => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-mode', 'dark')
    } else {
      document.body.setAttribute('data-mode', 'light')
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
  return (
    <div className="flex flex-col">
      <RecentExercisesGrid />
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
