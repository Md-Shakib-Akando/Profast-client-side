import React from "react";
import BookingIcon from '../assets/bookingIcon.png'
const howItWorksData = [
  {
    id: 1,
    
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#03373D] mb-8">How it Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm  space-y-4">
              <div className="">
                <img src={BookingIcon} alt={item.title} className="h-10 w-10" />
              </div>
              <h3 className="font-semibold text-[#03373D]">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
