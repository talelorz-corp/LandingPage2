import { NextApiRequest, NextApiResponse } from "next";
import { GetPostsVisitor } from 'server_src/controllers/posts';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    let posts = await GetPostsVisitor(req.body.globalCursor)
    res.status(200).json(posts)
}