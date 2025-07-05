import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../UseAuth';

const Login = () => {
    const {
        register,
        handleSubmit,

    } = useForm();
    const { signInUser, signInGoogle } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        console.log(data)
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                alert("login successful")
                navigate(from);
            }).catch(error => {
                console.log(error.message)
            })
    }
    const handleGoogleLogin = () => {
        signInGoogle()
            .then((result) => {
                const user = result.user
                console.log(user)
                navigate(from);
            }).catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div>
            <h1 className='text-4xl font-bold '>Welcome Back</h1>
            <p className='text-lg font-medium my-3'>Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input w-full" placeholder="Email" />
                    <label className="label mt-2">Password</label>
                    <input type="password" {...register('password')} className="input w-full " placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button type='submit' className="btn bg-[#CAEB66] mt-4">Login</button>
                    <p className='text-sm mt-2'>Don’t have any account?<Link to='/register' className='text-[#8FA748] font-medium'> Register</Link></p>
                    <p className='text-lg text-center my-2'>Or</p>
                    <button onClick={handleGoogleLogin} className="btn border-1 border-[#8FA748] mt-4">Login with Google</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;