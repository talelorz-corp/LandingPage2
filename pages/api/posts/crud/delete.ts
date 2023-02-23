import { NextApiRequest, NextApiResponse } from "next";
import { DeletePost } from 'server_src/controllers/posts';
import { checkLoggedin } from "@/server_src/middlewares/auth";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    try{
        await DeletePost({userId: userId, postId: req.body.postId})
    } catch(e:any){
        return res.status(400).json({success: false, message: e.message})
    }
    res.status(200).json({success: true})
}