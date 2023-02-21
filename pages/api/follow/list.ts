import { getUserId } from "@/server_src/middlewares/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { followRepository } from "@/server_src/repository/FollowRepository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const userId = getUserId(req, res)
    if(userId){
        try{
            let result : { followers?: any, following?: any, followerCount? : number, followingCount?: number} = {}
            if(req.body.followers){
                const followers = await followRepository.getFollowerList(userId)
                result.followers = followers
                result.followerCount = followers.length
            }
            if(req.body.following){
                const following = await followRepository.getFollowingList(userId)
                result.following = following
                result.followingCount = following.length
            }
            res.status(200).json(result)
        }catch(e){
            res.status(500).end()
        }

    }
    else {
        res.status(304).end()
    }

}