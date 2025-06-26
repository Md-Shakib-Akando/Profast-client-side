import React from 'react';
import amazon from '../../src/assets/brands/amazon.png'
import google from '../../src/assets/brands/amazon_vector.png';
import casio from '../../src/assets/brands/casio.png';
import moonstar from '../../src/assets/brands/moonstar.png';
import start from '../../src/assets/brands/start.png';
import randstad from '../../src/assets/brands/randstad.png';
import people from '../../src/assets/brands/start-people 1.png';
import Marquee from 'react-fast-marquee';
const logos = [amazon, google, casio, moonstar, start, randstad, people];
const ClientLogo = () => {
    return (
        <section className="py-10  rounded-lg my-5">
            <div className=" ">
                <h2 className="text-2xl text-primary font-bold text-center mt-5 mb-14">Trusted by Leading Brands</h2>

                <Marquee pauseOnHover speed={50} gradient={false}>
                    {logos.map((logo,index)=>(
                        <div key={index} className="mx-24 flex items-center">
                             <img src={logo} alt={`Client logo ${index}`} className="h-8 object-contain" />
                        </div>
                    ))

                    
                    
                    }
                </Marquee>

            </div>
        </section>
    );
};

export default ClientLogo;