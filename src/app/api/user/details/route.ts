import connectDB from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function GET(request: NextRequest) {

    try {

        const userId = await getDataFromToken(request)

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'token not found'
            })
        }

        // get user details from DB
        const user = await User.findById(userId).select('-password -isAdmin')

        return NextResponse.json({
            user
        })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in getting User Details",
        })
    }


}