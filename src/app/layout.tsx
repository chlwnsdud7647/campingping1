'use client';
// import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import DesktopUi from './DesktopUi';
import Script from 'next/script';
import { useGlobalStore } from '@/stores/globalState';

// export const metadata: Metadata = {
//   title: 'Campingping',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setMapScriptLoaded } = useGlobalStore();

  return (
    <html lang="en">
      <body>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
          onLoad={() => {
            setMapScriptLoaded(true);
          }}
        />
        <ToastContainer position="top-center" draggable />
        <div className="flex h-screen justify-center items-center">
          <DesktopUi />
          <div className="w-full md:max-w-[450px] h-full flex justify-center overflow-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
