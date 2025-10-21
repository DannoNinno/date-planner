'use client';
export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div className="bg-white max-sm:p-2 flex max-sm:flex-col max-sm:items-stretch w-full justify-around p-3 border-b-2 border-slate-300"> 
          Header
        </div>
      </header>
      {children}
      <footer className="bg-white max-sm:p-2 flex max-sm:flex-col max-sm:items-stretch w-full justify-around p-3 border-b-2 border-slate-300">
          Footer
      </footer>
    </>
  );
}
