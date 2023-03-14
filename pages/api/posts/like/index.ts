import { checkLoggedin } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { LikesOp } from "@/server_src/controllers/posts";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) {
        return res.status(304).end();
    }
    try{
        await LikesOp(userId, req.body.postId, req.body.unlike ? true : false)
    } catch(e:any){
        return res.status(500).json({success: false, message: e.message})
    }
    return res.status(200).json({ success: true })


}