import { db } from '../../prisma/datasource'

export class BlockRepository{
    async AddBlock(userId: string, targetId: string){
        try{
            await db.blockedUser.create({
                data:{
                    originId: userId,
                    targetId: targetId,
                }
            })
        } catch(e){
            return
        }
    }
    
    async TryDeleteBlock(userId: string, targetId: string) {
        try{
            await db.blockedUser.delete({
                where:{
                    originId_targetId: {
                        originId: userId,
                        targetId: targetId,
                    }
                }
            })
        }catch(e:any){
            if(e.code == 'P2025') return
            throw e
        }
    }

    async GetBlockedUsers(userId: string){
        try{
            return await db.blockedUser.findMany({
                where:{
                    originId: userId
                }
            })
        }catch(e){
            return []
        }
    }
    
    async AddReport(userId: string, postId: number){
        try{
            await db.reportedPosts.create({
                data:{
                    userId: userId,
                    postId: postId
                }
            })
        } catch(e){
            return
        }
    }

    async GetMyReports(userId: string){
        try{
            return await db.reportedPosts.findMany({
                where: {
                    userId: userId
                },
                select: {
                    postId: true
                }
            })
        }catch(e){
            return []
        }
    }
}

export const blockRepository = new BlockRepository()