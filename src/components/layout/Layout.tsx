import React, { type FC, type ReactNode } from 'react'; 
import { useSession } from 'next-auth/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()
  return (
    <main className="flex flex-col min-h-screen min-w-screen">
      { session && 'Hello world' }
      <div id="ContentContainer" className="flex flex-col p-10 bg-zinc-900 grow">
        {children}
      </div>
    </main>
  );
}

export default Layout;