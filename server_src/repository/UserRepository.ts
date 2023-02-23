import {db} from '../../prisma/datasource'
import {Prisma, user} from '@prisma/client'
import { create } from 'domain'
import * as crypto  from 'crypto-js' 
import { randomBytes } from 'crypto'

export class UserRepository{
    async createUser(user: Partial<user>): Promise<user> {
        try{
            const createdUser = await db.user.create({data: {
                firstName: user.firstName!,
                lastName: user.lastName!,
                userId: user.userId!,
                snsId: user.snsId,
                provider: user.provider,
                tickets: {
                    create: {}
                }
            }})
            return createdUser!
        } catch (e){
            console.log(e)
            throw e
        }
    }
    getUserSNS = async function ({snsId, provider}:{snsId: string, provider: string}) {
        console.log(snsId, provider)
        try {
            const foundUser : user | null = await db.user.findUnique({where: {
                snsId_provider: {
                    snsId: snsId.toString(),
                    provider: provider,
                }
            }})
            return foundUser
        } catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                console.log(e.code)
            }
            throw e
        }
    }
    async getUserProfile(userId: string) {
        try {
            const foundUser : user | null = await db.user.findUnique({where: {
                userId: userId
            }})
            return foundUser
        } catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                console.log(e.code)
            }
            throw e
        }
    }
}

export const userRepository = new UserRepository()