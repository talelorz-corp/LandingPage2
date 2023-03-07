import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { updateProfile } from "@/server_src/controllers/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) {
        //no authorization
        return res.status(304).end()
    }

    try{
        await updateProfile(userId, req.body.data)
        res.status(200).json({"success": true})
    } catch(e:any){
        res.status(500).json({"success": false, "message": e.message})
    }
}