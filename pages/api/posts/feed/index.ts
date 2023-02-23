import { checkLoggedin } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { GetPostsGenerateFeed } from 'server_src/controllers/posts';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    let posts = await GetPostsGenerateFeed(userId!, req.body.followingCursor, req.body.globalCursor)
    res.status(200).json(posts)
}