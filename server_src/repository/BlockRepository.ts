import { User } from '../models/models';
import { db } from '../../prisma/datasource'
import { followRepository } from './FollowRepository';
import { Prisma } from 'prisma/prisma-client'

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
            throw(e)
        }
    }
}

export const blockRepository = new BlockRepository()