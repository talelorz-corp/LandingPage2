import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin} from "@/server_src/middlewares/auth";
import { BlockUser } from "@/server_src/controllers/blockOrReport";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return
    try{
        await BlockUser(userId, req.body.targetId)
        res.status(200).json({"success": true})
    } catch(e:any){
        res.status(500).json({"success": false, "message": e.message})
    }
}