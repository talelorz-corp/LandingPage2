import {db} from '../../prisma/datasource'
import {Prisma, User} from '@prisma/client'
import { create } from 'domain'

declare type UserCreateInput = Prisma.UserCreateInput
export class UserRepository{
    createUser = async function (user: UserCreateInput) {
        try{
            const createdUser : User | null = await db.user.create({data: user})
            return createdUser
        }catch (e){
            throw e
        }
    }
    getUserSNS = async function ({snsId, provider}:{snsId: string, provider: string}) {
        console.log(snsId, provider)
        try {
            const foundUser : User | null = await db.user.findUnique({where: {
                snsId_provider_UQ: {
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
}

export const userRepository = new UserRepository()