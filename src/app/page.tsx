import React from "react";
import { useTheme } from 'next-themes';
import { Button } from 'good-nice-ui';
import { RecentExercisesGrid } from "../features/dashboard/RecentExercisesGrid";
import { getServerAuthSession } from "~/server/auth";
import { Landing } from "./_components/Landing";
import { Dashboard } from "./_components/Dashboard";

export default async function Home() {
  const session = await getServerAuthSession();
  // const { theme } = useTheme();
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.body.setAttribute('data-mode', 'dark')
  //   } else {
  //     document.body.setAttribute('data-mode', 'light')
  //   }
  // }, [theme])
  return (
    <>
      {session ? <Dashboard /> : <Landing />}
    </>
  );
};
