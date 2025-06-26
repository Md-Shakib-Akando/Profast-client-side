import React from 'react';
import img1 from '../assets/live-tracking.png'
import img2 from '../assets/safe-delivery.png'
import img3 from '../assets/safe-delivery.png'
const features = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
        image: img1,
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: img2,
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: img3,
    },
];
const Benefits = () => {
    return (
        <section className=" py-12 my-5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className=" flex justify-center md:justify-start">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className=" object-contain"
                            />
                        </div>
                          <div className="hidden mx-5 md:block w-px h-24 border-l-2 border-dashed border-gray-300"></div>
                        <div className="w-full md:w-2/3 text-center md:text-left">
                            <h3 className="text-xl font-semibold text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;