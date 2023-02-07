import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { type FC } from "react";
import { Button } from '../components/common';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/barbell.png';

const Landing: FC = () => {
  return (
    <React.Fragment>
      <div id="Header" className="flex items-center gap-3 align-middle bg-zinc-900 text-zinc-100">
        <Image 
          src={logo}
          alt="logo"
          width={36}
          height={36}
        />
        <h1 className="text-xl font-medium">
          Title
        </h1>
      </div>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow bg-zinc-900 text-zinc-100">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md text-zinc-400 w-72">An app to track lifting sessions. Use it for any activity you want to improve over time.</p>
        <div className="flex gap-4">
          <Button
            buttonStyle="secondary"
            type="button"
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
  return (
    <div id="DashboardContainer" className="flex flex-col items-center grow bg-zinc-900">
      <h1 className="text-lg text-zinc-200">Hello user</h1>
      <Button
        buttonStyle="secondary"
        type="button"
        onClick={() => {
          signOut().catch(console.log);
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col min-h-screen min-w-screen p-10 bg-zinc-900 grow">Loading...</main>;
  }

  return (
    <>
      <Head>
        <title>Lift Companion</title>
        <meta name="App description" content="Lift companion app" />
        <link rel="icon" href="/barbell.png" />
      </Head>
      {session ? <Dashboard /> : <Landing />}
    </>
  );
};

export default Home;
