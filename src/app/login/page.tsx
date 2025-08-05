"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const loginPage = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [disabled, setDisabled] = useState(true);


    const router = useRouter();

    const onLogin = async () => {

        try {

            const response = await axios.post('/api/user/login', user)

            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                router.push('/profile');
            } else {
                toast.error(response.data.message);
                console.log(response.data.message);
            }


        } catch (error: any) {
            console.log(error.message);
            toast.error('Error in Signup');
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user])

    return (
        <div className="text-center h-screen flex flex-col justify-center gap-5">
            <h1>Login</h1>
            <p>Please fill in the form to Login</p>

            <div className='flex flex-col items-center' >

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
                    onClick={onLogin}>
                    Login
                </button>


                <button
                    className=' text-white p-2 cursor-pointer rounded mt-4 underline'
                >
                    <Link href="/signup">
                        Not a member?
                        Signup
                    </Link>
                </button>
            </div>


        </div>
    );
}

export default loginPage;