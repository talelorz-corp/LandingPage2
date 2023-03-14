import { NextApiRequest, NextApiResponse } from "next";
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { blockRepository } from "@/server_src/repository/BlockOrReportRepository";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    blockRepository.AddReport(userId, req.body.postId)
    return res.status(200).end()
}