import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const body = req.body
    console.log(body)
    res.status(200)
}