import { NextApiRequest, NextApiResponse } from "next";
import { GetPosts, UploadPost } from 'server_src/controllers/posts';

type UploadPostRequestData = {
    userId: UserId,
    content: string,
    hashtags?: string[],
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    let reqData :UploadPostRequestData = req.body
    let post = UploadPost(reqData.userId, reqData.content)
    res.status(200).json(post)
}