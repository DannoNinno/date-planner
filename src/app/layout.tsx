import {Metadata} from 'next';
import '../styles/globals.sass';
import ClientLayout from './ClientLayout';
import {Suspense} from 'react';

export const metadata: Metadata = {
  title: 'Date Planner',
  description: 'Aplicacion para organizar citas.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="index-section horizon bg-gradient-greenligth bg-no-repeat bg-cover bg-top w-full bg-fondo-ensayo">
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
