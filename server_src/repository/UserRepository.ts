import {db} from '../../prisma/datasource'
import {AgeRange, Prisma, user} from '@prisma/client'

export class UserRepository{

    async createUser(user: Partial<user>): Promise<user> {
        try{
            const createdUser = await db.user.create({data: {
                firstName: user.firstName!,
                lastName: user.lastName!,
                gender: user.gender,
                ageRange: user.ageRange,
                job: user.job,
                userId: user.userId!,
                snsId: user.snsId,
                provider: user.provider,
                tickets: {
                    create: {}
                }
            }})
            return createdUser!
        } catch (e){
            throw e
        }
    }

    async updateProfile(userId: string, data: {gender?: number, lastName?: string, firstName?: string,
        ageRange?: AgeRange, job?: string}){
            try{
                await db.user.update({
                    where: {
                        userId: userId,
                    }, 
                    data: {
                        gender: data.gender,
                        lastName: data.lastName,
                        firstName: data.firstName,
                        ageRange: data.ageRange,
                        job: data.job,
                    }
                })
            } catch(e){
                throw e
            }
    }

    async getUserSNS({snsId, provider}:{snsId: string, provider: string}) {
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

    async deleteUser(userId: string) {
        try{
            await db.user.delete({
                where:{
                    userId: userId
                }
            })
        }catch(e){
            throw e
        }
    }

    async getUserProfile(userId: string) {
        try {
            const foundUser : user | null = await db.user.findUnique({where: {
                userId: userId
            }
            })
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