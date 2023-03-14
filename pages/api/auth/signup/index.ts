import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import { DoSNSLogin, DoSNSSignUp, E_LOGIN_PROVIDERS } from "@/server_src/controllers/auth"
import { isStringLiteral } from "typescript"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){

    const cookies = req.cookies

    if(req.headers["authorization"]){
        const accesstok: jwt.JwtPayload | string = jwt.verify(req.headers["authorization"].split("Bearer ")[1], "SERVERSIDE_SECRET_TALES")
        const accessJwt = accesstok as jwt.JwtPayload
        if(accessJwt && accessJwt["isLoggedIn"]){
            console.log("attempting sign in but already logged in")
            res.json({"success": false, "redirect_url": "/"})
            return
        }
    }
    else if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        const accessJwt = accesstok as jwt.JwtPayload
        if(accessJwt && accessJwt["isLoggedIn"]){
            console.log("attempting sign in but already logged in")
            res.json({"success": false, "redirect_url": "/"})
            return
        }
    }   


    //perform sign up
    const providers: {[key: string]: E_LOGIN_PROVIDERS} = {
        'KAKAO': E_LOGIN_PROVIDERS.KAKAO, 
        'GOOGLE': E_LOGIN_PROVIDERS.GOOGLE,
        'NAVER': E_LOGIN_PROVIDERS.NAVER
    }
    const form : {snsId: string, provider: string, firstName: string, lastName: string, userId: string} = req.body
    const signupResult = await DoSNSSignUp(form.firstName, form.lastName, form.userId, form.snsId, providers[form.provider])
    

    //perform auto login
    if(signupResult.success){
        const loginResult = await DoSNSLogin(form.snsId, providers[form.provider])
        if(loginResult.success){
            const token = jwt.sign({ userId: loginResult.user?.userId, isLoggedIn: true, timestamp: Date.now() }, "SERVERSIDE_SECRET_TALES")
            res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
            return res.json({"success": true, "user": loginResult.user , "redirect_url": "/"})
        }
        else{
            //sign up has succeeded but login has not.
            return res.json({...signupResult, redirect_url:'/auth/login'})
        }
    }

    return res.json(signupResult)
        
}