
import connectDB from "@/db/dbConfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connectDB();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, email, password } = body;

        console.log(body);

        // check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({
                success: false,
                message: "User already exists",
            })
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // save the user to the database
        await newUser.save();

        console.log(newUser);

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            user: newUser,
        })


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in Signup",
        })
    }
}