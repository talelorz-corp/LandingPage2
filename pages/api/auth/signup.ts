import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import { DoSNSSignUp } from "@/server_src/controllers/auth"
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
                res.json({"success": false})
                return
            }
            else{
                const snsId = accesstok["loginValue"]
                const provider = accesstok["provider"]
                const signupResult = await DoSNSSignUp(body.firstName, body.lastName, body.userId, snsId, provider)
                res.json(signupResult)
                return
            }
        }
    }
    else{
        res.json({"success": false})
        return
    }
    res.json({"success": false})
}