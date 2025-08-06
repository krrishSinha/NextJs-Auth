
import connectDB from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB


export async function POST(request: NextRequest) {
    try {

        const {token} = await request.json();

        console.log(token);

        // find user by token
        const user = await User.findOne(
            {
                verifyEmailToken: token,
                verifyEmailTokenExpiry: {
                    $gt: Date.now() // Check if the token is still valid
                }
            }
        )

        if (!user) {
            return new Response("Invalid or token expired ", { status: 400 });
        }


        // update user veriy email status
        user.isVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        });



    } catch (error) {
        console.error("Error in POST /api/user/verifyemail:", error);
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while verifying email',
        });
    }
}