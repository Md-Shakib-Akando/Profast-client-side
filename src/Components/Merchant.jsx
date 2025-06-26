import React from 'react';
import locationImg from '../assets/location-merchant.png'
const Merchant = () => {
    return (
        <div className=" bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat rounded-lg max-w-7xl mx-auto">
            <div className="hero-content flex-col p-20 lg:flex-row-reverse">
                <img
                    src={locationImg}
                    className=" rounded-lg "
                />
                <div className=''>
                    <h1 className="text-3xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn bg-[#CAEB66] rounded-full">Become a Merchant</button>
                    <button className="btn ml-7 text-[#CAEB66]  bg-[#03373D] border-2 border-[#CAEB66] rounded-full">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default Merchant;