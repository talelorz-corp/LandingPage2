import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { followRepository } from "@/server_src/repository/FollowRepository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    //delete all following - follower relationship
    try{
        await followRepository.deleteFollower(userId, {deleteAll: true})
        await followRepository.deleteFollowing(userId, {deleteAll: true})
        //update user info row.
        res.status(200).json({"success": true})
    } catch(e:any){
        res.status(500).json({"success": false, "message": e.message})
    }
}