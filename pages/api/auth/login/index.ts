import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import {DoSNSLogin, E_LOGIN_PROVIDERS} from "server_src/controllers/auth"
import { isStringLiteral } from "typescript"
import { access } from "fs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const cookies = req.cookies
    
    function InstanceOfJwt(obj: any): obj is jwt.JwtPayload {
        return !isStringLiteral(obj)
    }

    
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
    
    const loginResult = await DoSNSLogin(req.body.id, E_LOGIN_PROVIDERS.KAKAO)
    if(!loginResult.success){
        const sns_token = jwt.sign({ loginValue: req.body.id, isLoggedIn: false, provider: E_LOGIN_PROVIDERS.KAKAO }, "SERVERSIDE_SECRET_TALES", {
            expiresIn: '10m', 
        })
        res.setHeader('Set-Cookie', `sns_token=${sns_token}; path=/; maxAge=100; httpOnly:true`)
        res.json({"success": false, "redirect_url": "/auth/signup"})
        return
    }
    else
    {
        const token = jwt.sign({ userId: loginResult.user?.userId, isLoggedIn: true }, "SERVERSIDE_SECRET_TALES")
        res.setHeader('Set-Cookie', `token=${token}; path=/; maxAge=200; httpOnly:true`)
        res.json({"success": true, "redirect_url": "/"})
    }

}