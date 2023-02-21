import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import { DoSNSLogin, DoSNSSignUp, E_LOGIN_PROVIDERS } from "@/server_src/controllers/auth"
import { isStringLiteral } from "typescript"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const body = req.body
    const cookies = req.cookies
    
    function InstanceOfJwt(obj: any): obj is jwt.JwtPayload {
        return !isStringLiteral(obj)
    }
    if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            if(accesstok["isLoggedIn"]){
                console.log("attempting sign up but already logged in")
                res.json({"success": false, "redirect_url": "/"})
                return
            }
        }
    }
    if(cookies["sns_token"]){
        const accesstok = jwt.verify(cookies["sns_token"], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            if(accesstok["isLoggedIn"]){
                console.log("attempting sign up but already logged in")
                res.json({"success": false, "redirect_url": "/"})
                return
            }
            else{
                const snsId = accesstok["loginValue"]
                const provider = accesstok["provider"]
                const signupResult = await DoSNSSignUp(body.firstName, body.lastName, body.accountName, snsId, provider)
                
                if(signupResult.success){
                    const autoLoginResult = await DoSNSLogin(snsId, provider)
                    if(autoLoginResult.success){
                        const token = jwt.sign({ userId: autoLoginResult.user?.userId, isLoggedIn: true }, "SERVERSIDE_SECRET_TALES")
                        res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
                        res.json({success: true, redirect_url:'/'})
                        return
                    }
                    else{
                        res.json({...signupResult, redirect_url:'/auth/login'})
                        return
                    }
                }
                res.json(signupResult)
                return
            }
        }
    }
    else if(cookies["test_signup_token"]){
        const accesstok = JSON.parse(cookies["test_signup_token"])
        const snsId: string= accesstok.loginValue
        const provider: E_LOGIN_PROVIDERS= accesstok.provider
        const signupResult = await DoSNSSignUp(body.firstName, body.lastName, body.userId, snsId, provider)
            if(signupResult.success){
                const autoLoginResult = await DoSNSLogin(snsId, provider)
                if(autoLoginResult.success){
                    const token = jwt.sign({ userId: autoLoginResult.user?.userId, isLoggedIn: true }, "SERVERSIDE_SECRET_TALES")
                    res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
                    res.json({success: true, redirect_url:'/'})
                    return
                }
                else{
                    res.json({...signupResult, redirect_url:'/auth/login'})
                    return
                }
            }
            res.json(signupResult)
            return
    }
    else{
        res.json({"success": false, redirect_url:"/auth/login"})
        return
    }
    res.json({"success": false})
}