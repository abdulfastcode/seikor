import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

export const middleware = ((req: NextRequest)=>{

   

    const user = "true"

    if(!user){
        return NextResponse.redirect(
            new URL("/auth/login",req.url)
        )
    }

})

export const config = {
    matcher: ['/user-info']
}