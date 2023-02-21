import { NextApiRequest, NextApiResponse } from "next";
import { GetPosts, UploadPost } from 'server_src/controllers/posts';
import { checkLoggedin } from "@/server_src/middlewares/auth";

type UploadPostRequestData = {
    content: string,
    hashtags?: string[],
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    let reqData :UploadPostRequestData = req.body
    let post = await UploadPost(userId!, reqData.content)
    if(post.ok){
        res.status(200).json(post)
    }
    else {
        res.status(429).json(post)
    }
}