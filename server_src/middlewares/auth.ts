import { NextApiRequest, NextApiResponse } from "next"
import * as jwt from "jsonwebtoken"
import { isStringLiteral } from "typescript"

export function getUserId(
    req: NextApiRequest,
    res: NextApiResponse
): string | null{
    const body = req.body
    const cookies = req.cookies
    
    function InstanceOfJwt(obj: any): obj is jwt.JwtPayload {
        return !isStringLiteral(obj)
    }
    if(req.headers["authorization"]){
        const accesstok = jwt.verify(req.headers["authorization"].split("Bearer ")[1], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            if(accesstok["isLoggedIn"]){
                return accesstok["userId"]
            }
        }
    }
    if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            return accesstok["userId"]
        }
    }
    return null
}

export function checkLoggedin(
    req: NextApiRequest,
    res: NextApiResponse
):{isLoggedIn: boolean, userId?: string}{
    const body = req.body
    const cookies = req.cookies
    
    function InstanceOfJwt(obj: any): obj is jwt.JwtPayload {
        return !isStringLiteral(obj)
    }
    if(req.headers["authorization"]){
        const accesstok = jwt.verify(req.headers["authorization"].split("Bearer ")[1], "SERVERSIDE_SECRET_TALES")
        const jwtTok = accesstok as jwt.JwtPayload
        if(jwtTok && jwtTok["isLoggedIn"] && jwtTok["userId"]){
            return {"isLoggedIn": true, "userId": jwtTok["userId"]}
        }
    }
    if(cookies["token"]){
        const accesstok = jwt.verify(cookies["token"], "SERVERSIDE_SECRET_TALES")
        if(InstanceOfJwt(accesstok)){
            console.log(accesstok)
            if(accesstok["isLoggedIn"] && accesstok["userId"]){
                return {"isLoggedIn": true, "userId": accesstok["userId"]}
            }
        }
    }
    res.status(403).end()
    return ({"isLoggedIn": false, "userId": ""})
}