import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import connectDB from "@/db/dbConfig";



connectDB()

export async function POST(request: NextRequest) {

    try {

        const body = await request.json()
        const { email, password } = body;
        console.log(body);

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "All feild are required",
            })
        }

        // check if user exists or not
        const user = await User.findOne({ email })
        
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exists! please signup first",
            })
        }

        // match the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Invalid password",
            })
        }

        // generate jwt token
        const tokenData = {
            _id: user._id,
            email: user.email,
            username: user.username
        }


        const token =  jwt.sign(tokenData, process.env.JWT_SECRET!)

        const response = NextResponse.json({
            success: true,
            message: "Login successfully...",
        })

        response.cookies.set('token', token)

        return response


    } catch (error) {
        console.log(`Error in Login Route: ${error}`);
        return NextResponse.json({
            success: false,
            message: "Error in Signup",
        })
    }

}