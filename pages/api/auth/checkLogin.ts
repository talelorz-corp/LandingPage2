import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
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
    if(req.headers["authorization"]){
        const accesstok = jwt.verify(req.headers["authorization"].split("Bearer ")[1], "SERVERSIDE_SECRET_TALES")
        const jwtTok = accesstok as jwt.JwtPayload
        if(jwtTok && jwtTok["isLoggedIn"] && jwtTok["userId"]){
            return res.json({"isLoggedIn": true, "userId": jwtTok["userId"]})
        }
    }
    if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            console.log(accesstok)
            if(accesstok["isLoggedIn"] && accesstok["userId"]){
                return res.json({"isLoggedIn": true, "userId": accesstok["userId"]})
            }
        }
    }
    res.json({"isLoggedIn": false})
}