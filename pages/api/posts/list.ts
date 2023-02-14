import { NextApiRequest, NextApiResponse } from "next";
import { GetPosts, UploadPost } from 'server_src/controllers/posts';

type ListPostRequestData = {
    userId: UserId,
    pageCursor: number,
    limit: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    let reqData : ListPostRequestData = req.body
    let posts = await GetPosts(reqData.userId, reqData.pageCursor, reqData.limit)
    res.status(200).json(posts)
}