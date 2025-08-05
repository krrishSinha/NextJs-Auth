import { NextRequest, NextResponse } from "next/server";


export async function GET(){

    try {

        const response = NextResponse.json({
            success: true,
            message: "Logout successfully",
        })

        response.cookies.set('token', '')

        return response

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in Logout",
        })
    }
}