import React from "react";
import { useTheme } from 'next-themes';
import { RecentExercisesGrid } from "../features/dashboard/RecentExercisesGrid";
import { getServerAuthSession } from "~/server/auth";
import { Landing } from "./_components/Landing";
import { Dashboard } from "./_components/Dashboard";
import { api } from "~/trpc/server";
import 'good-nice-ui/dist/index.css';

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    const exercises = await api.exercise.getAll.query();
    return <Dashboard exercises={exercises} />;
  }
  // const { theme } = useTheme();
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.body.setAttribute('data-mode', 'dark')
  //   } else {
  //     document.body.setAttribute('data-mode', 'light')
  //   }
  // }, [theme])
  return <Landing />;
};
