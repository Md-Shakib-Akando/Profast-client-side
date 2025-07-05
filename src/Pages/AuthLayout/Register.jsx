import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../UseAuth';

const Register = () => {
    const { createUser, signInGoogle } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                console.log(result)
                alert("Register is successful")
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
            <h1 className='text-4xl font-bold '>Create an Account</h1>
            <p className='text-lg font-medium my-3'>Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input w-full" placeholder="Email" />
                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input w-full" placeholder="Email" />
                    <label className="label mt-2">Password</label>
                    <input type="password" {...register('password', { required: true, minLangth: 6 })} className="input w-full " placeholder="Password" />

                    <button type='submit' className="btn bg-[#CAEB66] mt-4">Register</button>
                    <p className='text-sm mt-2'>Already have an account?<Link to='/login' className='text-[#8FA748] font-medium'> Login</Link></p>
                    <p className='text-lg text-center my-2'>Or</p>
                    <button onClick={handleGoogleLogin} className="btn border-1 border-[#8FA748] mt-4">Register with Google</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;