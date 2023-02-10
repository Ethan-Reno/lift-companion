import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import React, { type FC } from "react";
import { Button } from "../components";

const Landing: FC = () => {
  return (
    <React.Fragment>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md w-72">An app to track lifting sessions. Use it for any lift you want to improve over time.</p>
        <div className="flex gap-4">
          <Button
            onKeyDown={() => {
              signIn("discord").catch(console.log);
            }}
            onPointerDown={() => {
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
    <div id="DashboardContainer" className="flex flex-col items-center grow">
      <h1 className="text-lg">Hello user</h1>
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
