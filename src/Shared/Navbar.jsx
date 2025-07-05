import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import UseAuth from '../UseAuth';

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const navigate = useNavigate();


    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logged out');
                // Optionally redirect
                navigate('/login');
            })
            .catch(err => {
                console.error('Logout failed', err);
            });
    };

    const nanItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        {
            user && <>
                <li><NavLink to='/dashboard'>Dash Board</NavLink></li>
            </>
        }

    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {nanItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {nanItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <>

                            <button onClick={handleLogOut} className='btn'><NavLink >logOut</NavLink></button>

                        </>
                    ) : (
                        <>
                            <div className='space-x-2'>
                                <button className='btn'><NavLink to='/login'>Login</NavLink></button>
                                <button className='btn'><NavLink to='/register'>Register</NavLink></button>
                            </div>

                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;