import React from 'react';
import logoPng from '../../src/assets/logo.png'
import { Link } from 'react-router';
const ProfastLogo = () => {
    return (
        <Link to='/'>
        <div className='flex items-end'>
            <img className='mb-3' src={logoPng} alt="logo" />
            <p className='text-3xl -ml-3 font-bold'>Profast</p>
        </div>
        </Link>
    );
};

export default ProfastLogo;