import { NextApiRequest, NextApiResponse } from "next";
import { UploadPost } from 'server_src/controllers/posts';
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { CreatePostRequestData} from "@/server_src/models/models";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    let reqData : CreatePostRequestData = req.body
    let post = await UploadPost({userId, ...reqData})
    res.json(post)
}