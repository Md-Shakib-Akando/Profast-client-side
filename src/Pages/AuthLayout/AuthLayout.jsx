import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../../assets/authImage.png';
import ProfastLogo from '../../Components/ProfastLogo';

const AuthLayout = () => {
    return (
        <div className="bg-base-200 min-h-screen">
            <div className="flex flex-col md:flex-row-reverse min-h-screen">
                
               
                <div className="w-full md:w-1/2  md:h-screen bg-[#FAFDF0] flex justify-center items-center">
                    <img
                        src={authImg}
                        alt="Auth Visual"
                        className="w-[90%] md:w-[80%] rounded-lg object-contain"
                    />
                </div>

                
                <div className="w-full md:w-1/2 h-full px-6 md:px-14 pt-6 md:pt-10">
                    <ProfastLogo />
                    <div className="pt-6 md:pt-10 w-full md:w-[70%] mx-auto">
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;
