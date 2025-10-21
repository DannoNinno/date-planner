'use client';
import RegisterComponent from "@/components/register";
const Home: React.FC = () => {
    
    return (
        <div className="border-4 border-primaryBlue-900">
        <div className="w-50 h-screen flex justify-center items-center self-center mx-auto">
            <div className="p-2 bg-primaryBlue-300 border-3 border-primaryBlue-700 flex items-stretch flex-col rounded-xl">
            <img src="/images/Logo.png" alt="Logo" className="self-center w-32 h-32 m-3" />
            <h1 className="text-3xl text-center font-sora-extra-bold font-bold text-primaryBlue-900 p-2">
                Date Planner
            </h1>
            <RegisterComponent />
            </div>
        </div>
        </div>
    );
};
export default Home;