import { Ticket, TicketOperationResultDto } from '../models/models';
import {db} from '../../prisma/datasource'

export class TicketRepository{

    /*
    *  if it's a new day, automatically regenerate tickets up to maximum
    */
    async getTicketCount(userId: string): Promise<TicketOperationResultDto> {
        return await this.updateTicketCount(userId)
    }

    async updateTicketCount(userId: string): Promise<TicketOperationResultDto>{
        const MAX_TICKETS = 3
        try{
            let ticket = await db.ticket.findUniqueOrThrow({
                where:{
                    userId: userId
                }
            })
            const lastTicketUpdatedDate = new Date(ticket.lastUpdated.getUTCFullYear(), ticket.lastUpdated.getUTCMonth(), ticket.lastUpdated.getUTCDate())
            const currDate = new Date()
            currDate.setHours(0, 0, 0, 0)
            if(currDate > lastTicketUpdatedDate && ticket.numTickets < MAX_TICKETS){
                ticket = await db.ticket.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        numTickets: MAX_TICKETS,
                        lastUpdated: new Date()
                    },
                })
            }
            return {success: true, countAfter: ticket.numTickets}
        }
        catch (e){
            throw e
        }
    }

    /*
    *   consumes a single ticket. but before that, internally calls getTicketCount to do refill if possible.
    */
    async useSingleTicket(userId: string): Promise<TicketOperationResultDto> {
        try{
            let ticketCount = (await this.updateTicketCount(userId)).countAfter
            if(ticketCount > 0){
                console.log("has enough tickets")
                const updatedTicket = await db.ticket.update({
                    where: {
                        userId: userId
                    }, data: {
                        numTickets: {
                            decrement: 1
                        },
                        lastUpdated: new Date()
                    }
                })
                ticketCount = updatedTicket.numTickets
                return {success: true, countAfter: ticketCount}
            } else if(ticketCount <= 0){
                console.log("uh_oh.. no tickets")

                return {success: false, reason: "NO_TICKETS", countAfter: ticketCount}
            }
            return {success: false, countAfter: ticketCount}
        } catch(e){
            throw(e)
        }
    }
    /*
    *   for adding ticket counts on purchase
    */
   addTicketCount = async function(userId: string, addAmount: number): Promise<TicketOperationResultDto> {
        try{
            const ticket = await db.ticket.update({
                where:{
                    userId: userId,
                },
                data:{
                    numTickets: {
                        increment: addAmount
                    },
                    lastUpdated: new Date()
                }
            })

            return {success: true, countAfter: ticket.numTickets}
        }catch(e){
            throw e
        }
   }

}

export const ticketRepository = new TicketRepository()
