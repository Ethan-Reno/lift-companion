import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { type FC } from "react";
import { useTheme } from 'next-themes'
import Image from 'next/image';
import { Button } from "../components";
import logo from '../../public/barbell.png';

const Landing: FC = () => {
  return (
    <React.Fragment>
      <div id="Header" className="flex items-center py-6 mx-6 gap-3 align-middle">
        <Image 
          src={logo}
          alt="logo"
          width={36}
          height={36}
          priority
        />
        <h1 className="text-xl font-medium">
          Title
        </h1>
      </div>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md w-72">An app to track lifting sessions. Use it for any activity you want to improve over time.</p>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              signIn("discord").catch(console.log);
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

const Dashboard: FC = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div id="DashboardContainer" className="flex flex-col items-center grow">
      <h1 className="text-lg">Hello user</h1>
      <Button
        onClick={() => {
          signOut().catch(console.log);
        }}
      >
        Sign Out
      </Button>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        toggle
      </Button>
    </div>
  );
}

const Home: NextPage = () => {
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

export default Home;
