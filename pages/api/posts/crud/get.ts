import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin, getUserId } from "@/server_src/middlewares/auth";
import { postRepository } from "@/server_src/repository/PostRepository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try{
        const userId = getUserId(req, res)
        const posts = await postRepository.getPosts({id: req.body.id, authorId: req.body.authorId, shelf: req.body.shelf}, req.body.authorId === userId, userId)
        return res.status(200).json(posts)
    } catch(e:any){
        return res.status(400).json({success: false, message: e.message})
    }
}