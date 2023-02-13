import React from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '../components';
import Dialog, { DIALOG_TYPES } from '../components/shared/Dialog/Dialog';
import { type NextPage } from 'next';
import Head from 'next/head';

const Dashboard: NextPage = () => {
  const triggerButton = (
    <Button>
      <PlusIcon className="h-6 w-6 pr-2" />
      <span>New Workout</span>
    </Button>
  );

  return (
    <Head>
      <title>Dashboard</title>
      <div id="DashboardContainer" className="flex flex-col items-center grow">
        <Dialog triggerButton={triggerButton} type={DIALOG_TYPES.NEW_WORKOUT} />
      </div>
    </Head>
  );
}

export default Dashboard;
