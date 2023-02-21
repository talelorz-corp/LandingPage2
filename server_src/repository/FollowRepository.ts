import { User, FollowerInfoDto, FollowGetResultDto} from '../models/models';
import {db} from '../../prisma/datasource'

export class FollowRepository{
    async addFollower(userId: string, targetId: string): Promise<boolean> {
        try{
            await db.follow.create({
                data:{
                    origin_user: {
                        connect: {
                            userId: userId
                        }
                    },
                    target_user: {
                        connect: {
                            userId: targetId
                        }
                    }
                }
            })
            return true
        }catch(e){
            throw e
        }
    }
    
    async getFollowingSummary(userId: string): Promise<FollowGetResultDto>{

        return {followersCount: 0, followingCount: 0}
    }

    async getFollowerList(userId: string): Promise<FollowerInfoDto[]> {
        try{
            const followers = await db.follow.findMany({
                where:{
                    targetId: userId,
                },
                include:{
                    origin_user:{
                        select:{
                            userId: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                },
            })
            return followers
        }catch(e){
            throw (e)
        }
    }

    async getFollowingList(userId: string):Promise<FollowerInfoDto[]> {
        try{
            const following = await db.follow.findMany({
                where:{
                    originId: userId,
                },
                include:{
                    target_user:{
                        select:{
                            userId: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                },
            })
            return following
        }catch(e){
            throw (e)
        }
    }
}

export const followRepository = new FollowRepository()
