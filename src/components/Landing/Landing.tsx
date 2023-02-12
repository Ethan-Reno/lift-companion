import React from 'react';
import { signIn } from 'next-auth/react';
import Button from '../shared/Button/Button';

const Landing = () => {
  return (
    <React.Fragment>
      <div id="LandingContainer" className="flex flex-col items-center gap-8 py-28 grow">
        <div className="relative">
          <h1 className="flex text-3xl font-bold">Lift Companion</h1>
          <span className="absolute text-6xl text-orange-500 -top-6 -right-4">.</span>
        </div>
        <p className="text-md w-72 text-center">An app to track lifting sessions and provide insight on the saved data.</p>
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

export default Landing;
