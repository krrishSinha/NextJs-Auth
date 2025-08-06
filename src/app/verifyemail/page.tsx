"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";




const verifyEmail = function () {

    const [token, setToken] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const searchParams = useSearchParams();


    const verifyEmail = async () => {
        try {

            const response = await axios.post('/api/user/verifyemail', {token});

            console.log(response.data);

            if (response.data.success) {
                setIsVerified(true);
            } else {
                setIsVerified(false);
            }

        } catch (error:any) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {

        const token = searchParams.get('token');
        setToken(token || "");

    }, [])

    useEffect(() => {

        if (token.length > 0) {
            verifyEmail();
        }

    }, [token])




    return <div>
        <h1> {isVerified ? 'Email Verified' : 'Inavlid or Token Expired'} </h1>
        <Link href="/login" className="text-blue-500">Go to Login</Link>
    </div>


}


export default verifyEmail;