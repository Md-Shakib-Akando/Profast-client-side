import React from 'react';

const ServicesCard = ({ service }) => {
    const { icon: Icon, title, description } = service
    return (
        <div className=" flex flex-col justify-center items-center bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg hover:bg-[#CAEB66] transition-all duration-300">
            <div className="text-4xl p-5 rounded-full bg-base-300  text-primary mb-4">
                <Icon />
            </div>
            <h3 className="text-xl text-center font-semibold mb-2 text-primary">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
        </div>
    );
};

export default ServicesCard;