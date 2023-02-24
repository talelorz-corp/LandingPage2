import { followRepository } from "../repository/FollowRepository"
import { blockRepository } from "../repository/BlockRepository"
import { BooleanOperationResult, FollowerInfoDto } from "../models/models"

export async function BlockUser(userId: string, targetId: string){
    try{
        await blockRepository.AddBlock(userId, targetId)
        await followRepository.deleteFollowing(userId, targetId)
        await followRepository.deleteFollower(userId, targetId)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export async function UnBlockUser(userId: string, targetId: string){
    
}

export async function GetUsersIBlocked(userId: string){

}

