"use client"

import { getDataFromToken } from "@/helpers/getDataFromToken";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const profile = function () {

    const router = useRouter();

    const [user, setUser] = useState<any>({});

    const logout = async () => {
        try {
            const response = await axios.get('/api/user/logout')
            console.log(response.data);

            router.push('/login')

        } catch (error) {
            console.log(error);
        }
    }


    const getUserData = async () => {

        try {

            const response = await axios.get('/api/user/details')

            console.log(response.data.user);
            setUser(response.data.user)


        } catch (error) {
            console.log('error');
        }

    }



    return (
        <div className="flex flex-col h-screen justify-center items-center" >
            <h1>Profile Page</h1>

            <button
                className='bg-blue-500 text-white p-2 cursor-pointer rounded mt-4'
                onClick={logout}
            >
                Logout
            </button>


            <h2 className="mt-4" >
                User ID:
                <Link
                className={`ml-4 bg-orange-400 ${user?._id && 'p-2 rounded'} `} 
                    href={`/profile/${user?._id}`}
                >
                    {user?._id || ''}
                </Link>
            </h2>


            <button
                className='bg-green-800 text-white p-2 cursor-pointer rounded mt-4'
                onClick={getUserData}
            >
                get User Details
            </button>

        </div>
    )
}

export default profile;