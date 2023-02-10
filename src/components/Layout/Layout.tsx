import { type ReactNode } from 'react';
import localFont from '@next/font/local';
import { NavMenu } from '..';
import Head from 'next/head';
// import Footer from './footer'

const roboto = localFont({
  src: [
    {
      path: '../../../public/fonts/roboto-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/roboto-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
})

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Lift Companion</title>
      </Head>
      <main className={`${roboto.variable} font-sans`}>
        <NavMenu />
        {children}
        {/* <Footer /> */}
      </main>
    </>
  )
}

export default Layout;
