import { followRepository } from "../repository/FollowRepository"
import { BooleanOperationResult, FollowerInfoDto } from "../models/models"

export async function AddFollower(userId: string, targetId: string)
    : Promise<BooleanOperationResult> {
    try{
        await followRepository.addFollower(userId, targetId)
        return {
            success: true
        }
    }catch(e:any){
        console.log(e)
        return {
            success: false,
            reason: e.toString()
        }
    }
}

export async function ListFollowers(userId: string): Promise<BooleanOperationResult & {followers: FollowerInfoDto[]}>{
    try{
        const followers = await followRepository.getFollowerList(userId)
        return {
            success: true,
            followers: followers
        }
    }catch(e:any){
        console.log(e)
        return {
            success: false,
            reason: e.toString(),
            followers: []
        }
    }
}

export async function ListFollowing(userId: string): Promise<BooleanOperationResult & {following: FollowerInfoDto[]}>{
    try{
        const following = await followRepository.getFollowingList(userId)
        return {
            success: true,
            following: following
        }
    }catch(e:any){
        console.log(e)
        return {
            success: false,
            reason: e.toString(),
            following: []
        }
    }
}