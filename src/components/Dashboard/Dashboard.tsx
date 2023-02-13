import { type User } from 'next-auth';
import React, { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import Dialog, { DIALOG_TYPES } from '../shared/Dialog/Dialog';
import Button from '../shared/Button/Button';
import { api } from "../../utils/api";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const utils = api.useContext();
  const [ name, setName ] = useState('');
  const [ primaryUnit, setPrimaryUnit ] = useState('');
  const [ secondaryUnit, setSecondaryUnit ] = useState('');

  const postExericse = api.exercise.postExercise.useMutation();

  const triggerButton = (
    <Button>
      <PlusIcon className="h-6 w-6 pr-2" />
      <span>New Workout</span>
    </Button>
  );

  return (
    <div id="DashboardContainer" className="flex flex-col items-center grow">
      <h1 className="text-lg">{
        user.name ? `Hello ${user.name}` : 'Hello user'}
      </h1>
      <Dialog triggerButton={triggerButton} type={DIALOG_TYPES.NEW_WORKOUT} />
    </div>
  );
}

export default Dashboard;
