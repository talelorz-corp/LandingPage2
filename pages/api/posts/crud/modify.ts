import { NextApiRequest, NextApiResponse } from "next";
import { postRepository } from "@/server_src/repository/PostRepository";
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { PostVisibility } from "@prisma/client";

type PostModifyRequestdata = {
    postId: number,
    data: {
        shelf?: string | null,
        visibility?: PostVisibility,
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    
    let modifyData: PostModifyRequestdata = {
        postId: req.body.postId!,
        data: {}
    }

    try{
        if(req.body.data.shelf === null || typeof req.body.data.shelf === "string") modifyData.data.shelf = req.body.data.shelf
        if(req.body.data.visibility === "PUBLIC" || req.body.data.visibility ==="PRIVATE") modifyData.data.visibility = req.body.data.visibility
        if(Object.keys(modifyData.data).length == 0) return res.status(401).json({
            success: false, 
            message: "invalid request format"
        })
        await postRepository.modifyPostCheckAuthor(userId, modifyData.postId, modifyData.data)
    }catch(e:any){
        return res.status(500).json({success: false, message: e.message})
    }
    res.status(200).json({success: true})
}