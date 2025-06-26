import React from 'react';
import logoPng from '../../src/assets/logo.png'
const ProfastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-3' src={logoPng} alt="logo" />
            <p className='text-3xl -ml-3'>Profast</p>
        </div>
    );
};

export default ProfastLogo;