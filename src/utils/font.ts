import localFont from 'next/font/local';

export const roboto = localFont({
  src: [
    {
      path: '../../public/fonts/roboto-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/roboto-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
})
