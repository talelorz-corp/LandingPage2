import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import {DoSNSLogin, E_LOGIN_PROVIDERS} from "server_src/controllers/auth"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){

    //check if already logged in
    const cookies = req.cookies

    if(req.headers["authorization"]){
        const accesstok: jwt.JwtPayload | string = jwt.verify(req.headers["authorization"].split("Bearer ")[1], "SERVERSIDE_SECRET_TALES")
        const accessJwt = accesstok as jwt.JwtPayload
        if(accessJwt && accessJwt["isLoggedIn"]){
            console.log("attempting log in but already logged in")
            res.json({"success": false, "redirect_url": "/"})
            return
        }
    }
    else if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        const accessJwt = accesstok as jwt.JwtPayload
        if(accessJwt && accessJwt["isLoggedIn"]){
            console.log("attempting log in but already logged in")
            res.json({"success": false, "redirect_url": "/"})
            return
        }
    }     
    
    // try login
    const providers: {[key: string]: E_LOGIN_PROVIDERS} = {'KAKAO': E_LOGIN_PROVIDERS.KAKAO, 'GOOGLE': E_LOGIN_PROVIDERS.GOOGLE}
    const {snsId, provider}: {snsId: string, provider: string} = req.body
    const loginResult = await DoSNSLogin(snsId, providers[provider])

    if(!loginResult.success){
        return res.json({"success": false, "redirect_url": "/auth/signup"})
    }
    else
    {
        const token = jwt.sign({ userId: loginResult.user?.userId, isLoggedIn: true, timestamp: Date.now() }, "SERVERSIDE_SECRET_TALES")
        res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
        res.json({"success": true, "user": loginResult.user , "redirect_url": "/"})
    }

}