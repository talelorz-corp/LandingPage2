import { NextApiRequest, NextApiResponse } from "next";
import { UploadPost } from 'server_src/controllers/posts';
import { checkLoggedin } from "@/server_src/middlewares/auth";
import { CreatePostRequestData, GenerateTaleRequestData} from "@/server_src/models/models";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const {isLoggedIn, userId} = checkLoggedin(req, res)
    if(!isLoggedIn || !userId) return

    let reqData : GenerateTaleRequestData = req.body

    const mutations = {
        mutations: [
            {
                create: {
                    _type: 'tale',
                    text: reqData.input,
                }
            }
        ]
    }
    console.log('generate.ts!!!')
    const apiEndpoint = "http://127.0.0.1:5000/test"
    try{
        const result = await fetch(apiEndpoint, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reqData),
            method: 'POST'
        })
        
        const json = await result.json();
        console.log(json)
        res.status(200).json(json)
    } catch (e: any){
        console.error(e.message)
    }


}