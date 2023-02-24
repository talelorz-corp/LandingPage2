import { User, FollowerInfoDto, FollowGetResultDto} from '../models/models';
import {db} from '../../prisma/datasource'

export class FollowRepository{
    async tryDeleteFollowing(userId: string, targetId: string | null, options: {deleteAll: boolean} | undefined = undefined){
        try{
            if(options?.deleteAll){
                await db.follow.deleteMany({
                    where: {
                        originId: userId //delete everyone from my following list, so I don't follow anyone.
                    }
                })
            } else if(targetId) {
                await db.follow.delete({
                    where: {
                        originId_targetId: {
                            originId: userId!,
                            targetId: targetId!,
                        }
                    }
                })
            }
        } catch(e: any){
            if(e.code == 'P2025') return
            throw(e)
        }
    }

    //this function is for internal use only
    //i.e. user blocks another user -> follow in both directions are deleted
    async tryDeleteFollower(userId: string, targetId: string | null, options: {deleteAll: boolean} | undefined = undefined){
        try{
            if(options?.deleteAll){
                await db.follow.deleteMany({
                    where: {
                        targetId: userId
                    }
                })
            } else if(targetId){
                await db.follow.delete({
                    where: {
                        originId_targetId: {
                            originId: targetId,
                            targetId: userId,
                        }
                    }
                })
            }
        } catch(e: any){
            if(e.code == 'P2025') return
            throw e
        }
    }

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
