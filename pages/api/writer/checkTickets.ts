import { ticketRepository } from "server_src/repository/TicketRepository"
import { NextApiRequest, NextApiResponse } from "next";
import { getUserId } from "server_src/middlewares/auth";
import { TicketOperationResultDto } from "@/server_src/models/models";


type TicketOperationRequestData = {
    consume?: number,
    fill?: number
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try{
        let ticketCountAfterOp: TicketOperationResultDto
        const data : TicketOperationRequestData = req.body
        const userId = getUserId(req, res)
        console.log("identified user : " , userId)
        if(userId){
            if(data.consume && data.consume > 0){
                console.log("consume " + data.consume + " tickets")
                ticketCountAfterOp = await ticketRepository.useSingleTicket(userId)
            }
            else if(data.fill && data.fill > 0){
                console.log("add " + data.consume + " tickets")
               ticketCountAfterOp = await ticketRepository.addTicketCount(userId, data.fill)
            }
            else{
                ticketCountAfterOp = await ticketRepository.getTicketCount(userId)
            }
            return res.status(200).json(ticketCountAfterOp)
        }
        return res.status(403).end()
    }catch(e){
        console.log(e)
        return res.status(500).end()
    }
}
