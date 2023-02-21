import { getUserId } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { followRepository } from "@/server_src/repository/FollowRepository";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const userId = getUserId(req, res)
    if(userId){
        let result = await followRepository.addFollower(userId, req.body.targetId)
        res.status(200).json(result)
    }
    res.status(304).end()
}