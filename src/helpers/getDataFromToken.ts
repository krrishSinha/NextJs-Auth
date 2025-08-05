import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'


export const getDataFromToken = async (request: NextRequest)=>{

    try {

        const token = request.cookies.get('token')?.value || '';

        const decoded:any = jwt.verify(token, process.env.JWT_SECRET!)

        return decoded._id

        
    } catch (error) {
        console.log( 'error in getDataFromUser file', error);
    }
}