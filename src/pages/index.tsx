import React, { type FC } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { Button, Dialog } from 'lift-companion-ui';

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
},

Dashboard: FC = () => {
  const triggerButton = (
    <Button>
      New Exercise
    </Button>
  );

  return (
    <>
      <div id="DashboardContainer" className="flex flex-col items-center grow">
        <Dialog trigger={triggerButton} accessibleTitle='Create new exercise' content={<>Placeholder</>} />
      </div>
    </>
  );
},

Landing: FC = () => {
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
  )
};

export default Home;
