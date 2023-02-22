import { checkLoggedin } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { GetPostsVisitor, UploadPost } from 'server_src/controllers/posts';

type ListPostRequestData = {
    pageCursor: number,
    limit: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    let reqData : ListPostRequestData = req.body
    let posts = await GetPostsVisitor(reqData.pageCursor, 20)
    res.status(200).json(posts)
}