'use client';

const Home: React.FC = () => {
  return (
    <div className="h-auto md:min-h-screen md:bg-no-repeat md:bg-cover md:bg-top  w-full max-sm:bg-inst-light md:bg-fondo-ensayo flex flex-col md:flex-row-reverse md:pr-20 items-stretch">
      <div className="w-full sm:w-3/5 md:w-7/12 lg:w-2/5 xl:w-4/12 2xl:w-3/12 bg-inst h-fit rounded-xl self-center border-t-2 border-green-950 border-b-2 sm:border-none sm:p-4">
        <div className="p-2 bg-slate-100 flex items-stretch flex-col">
          <h1 className="text-3xl text-center font-roboto-condensed font-bold text-black p-2">
            Date Planner
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Home;
