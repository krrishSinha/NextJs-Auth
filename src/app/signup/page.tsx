"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const signupPage = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [disabled, setDisabled] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user])

    const onSignup = async () => {

        try {

            const response = await axios.post('/api/user/signup', user)
            console.log(response.data);

            if (response.data.success) {
                toast.success('User created successfully');
                router.push('/login');
            } else {
                toast.error(response.data.message);
            }


        } catch (error: any) {
            console.log(error.message);
            toast.error('Error in Signup');
        }
    }

    return (
        <div className="text-center h-screen flex flex-col justify-center gap-5">
            <h1>Signup</h1>
            <p>Please fill in the form to create a new account.</p>

            <div className='flex flex-col items-center' >

                <div className='flex flex-col w-fitjustify-center gap-2' >
                    <label className='text-left' htmlFor="username">Username</label>
                    <input
                        className='p-1'
                        type="text"
                        id='username'
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder='Enter your username'
                    />
                </div>

                <div className='flex flex-col w-fitjustify-center gap-2' >
                    <label className='text-left' htmlFor="email">Email</label>
                    <input
                        className='p-1'
                        type="email"
                        id='email'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder='Enter your Email'
                    />
                </div>

                <div className='flex flex-col w-fitjustify-center gap-2' >
                    <label className='text-left' htmlFor="password">Password</label>
                    <input
                        className='p-1'
                        type="text"
                        id='password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder='Enter your Password'
                    />
                </div>

                <button
                    disabled={disabled}
                    className='bg-blue-500 text-white p-2 cursor-pointer rounded mt-4'
                    onClick={onSignup}>
                    SignUp
                </button>


                <button
                    className=' text-white p-2 cursor-pointer rounded mt-4 underline'
                >
                    <Link href="/login">
                        Already have an account?
                        Login
                    </Link>
                </button>
            </div>


        </div>
    );
}

export default signupPage;