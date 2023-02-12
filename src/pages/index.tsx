import React from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Landing, Dashboard } from "../components";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main className="flex flex-col min-h-screen min-w-screen p-10 grow">Loading...</main>;
  }

  return (
    <>
      {session ? <Dashboard user={ session.user } /> : <Landing />}
    </>
  );
};

export default Home;
