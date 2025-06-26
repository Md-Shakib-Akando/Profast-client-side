import React from 'react';
import Banner from '../Components/Banner';
import Services from '../Components/Services';
import ClientLogo from '../Components/ClientLogo';
import Benefits from '../Components/Benefits';
import Merchant from '../Components/Merchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogo></ClientLogo>
            <Benefits></Benefits>
            <Merchant></Merchant>
        </div>
    );
};

export default Home;