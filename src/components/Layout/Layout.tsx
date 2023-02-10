import { type ReactNode } from 'react';
import { NavMenu } from '..';

// import Footer from './footer'

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <NavMenu />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout;
