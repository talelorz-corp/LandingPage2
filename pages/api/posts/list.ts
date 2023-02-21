import { checkLoggedin } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { GetPosts, UploadPost } from 'server_src/controllers/posts';

type ListPostRequestData = {
    pageCursor: number,
    limit: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    let reqData : ListPostRequestData = req.body
    let posts = await GetPosts(userId!, reqData.pageCursor, reqData.limit)
    res.status(200).json(posts)
}