import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { followRepository } from "@/server_src/repository/FollowRepository";
import { userRepository } from "@/server_src/repository/UserRepository";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    try{
        //deleting a user will delete ALL posts, follow relationships, blocks, likes, tickets, and everything.
        await userRepository.deleteUser(userId)
        res.status(200).json({"success": true})
    } catch(e:any){
        res.status(500).json({"success": false, "message": e.message})
    }
}