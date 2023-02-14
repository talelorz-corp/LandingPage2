import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import {DoSNSLogin, E_LOGIN_PROVIDERS} from "server_src/controllers/auth"
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
                console.log("attempting log in but already logged in")
                res.json({"success": false, "redirect_url": "/"})
                return
            }
        }
    }
    const loginResult = await DoSNSLogin(body.id, E_LOGIN_PROVIDERS.KAKAO)
    if(!loginResult.success){
        const token = jwt.sign({ loginValue: body.id, isLoggedIn: false, provider: E_LOGIN_PROVIDERS.KAKAO }, "SERVERSIDE_SECRET_TALES", {
            expiresIn: '1h', 
        })
        res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
        res.json({"success": false, "redirect_url": "/auth/signup"})
        return
    }
    else
    {
        const token = jwt.sign({ loginValue: body.id, isLoggedIn: true, provider: E_LOGIN_PROVIDERS.KAKAO }, "SERVERSIDE_SECRET_TALES", {
            expiresIn: '1h', 
        })
        res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
        res.json({"success": true, "redirect_url": "/"})
    }

}