import { followRepository } from "../repository/FollowRepository"
import { blockRepository } from "../repository/BlockOrReportRepository"

export async function BlockUser(userId: string, targetId: string){
    try{
        await blockRepository.AddBlock(userId, targetId)
        await followRepository.tryDeleteFollowing(userId, targetId)
        await followRepository.tryDeleteFollower(userId, targetId)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export async function GetUsersIBlocked(userId: string){

}

