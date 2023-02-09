import { type ReactNode } from 'react';
import { DropdownMenu } from '.';
import { useSession } from 'next-auth/react';
// import Footer from './footer'

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  return (
    <>
      {session && <DropdownMenu />}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
