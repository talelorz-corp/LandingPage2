import { NextApiRequest, NextApiResponse } from "next";
import { GetPostsVisitor } from 'server_src/controllers/posts';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try{
        switch(req.body.op!){
            case 'LIST':
                
            case 'SET':

            case 'DELETE':

            case 'CREATE':
        }
    }catch(e: any) {
        console.log(e.message)
    }

    res.status(500).end()
}