import {postRepository} from '../repository/PostRepository'
import {ticketRepository} from '../repository/TicketRepository'
import { Post, PostVisibility } from '../models/models'
import { reauthenticateWithCredential } from 'firebase/auth'

//export async function UploadPost(userId: string, content: string)
//    : Promise<PostCreateResponseDto> {
//    try{
//        const post = await postRepository.createPost({authorId: userId, content: content})
//        return {ok: true, post: post}
//    }catch(error){
//        throw Error("post upload error")
//    }
//}

export async function UploadPost({userId, content, visibility, shelf, hashtags}
    : {userId: string, content:string, visibility?: PostVisibility, shelf?: string, hashtags?: string[]})
    : Promise<Post>{
        try{
            return await postRepository.createPost({
                userId:userId, 
                content:content, 
                visibility: visibility,
                shelf: shelf,
                hashtags: hashtags || []
             })
        }
        catch(e){
            throw e
        }
    }

export async function DeletePost({userId, postId}: {userId: string, postId: number})
{
    try{    
        return postRepository.deletePostCheckAuthor(postId, userId)
    } catch(e){
        throw e
    }
}


//type guards
export type WriteNovelDto = {novel: string;}
export const isWriteNovelDto = (returnedObj: any): returnedObj is WriteNovelDto =>
    returnedObj.novel && typeof returnedObj.novel === "string"

export async function WriteNovel(name: string, input: string)
    : Promise<{novel : string}> {
        try{
            const res = await fetch('http://127.0.0.1:5000/generateNovel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"name": name, "input": input})
            })
            const json = await res.json()
            console.log(json)
            if (isWriteNovelDto(json)) {
                return {"novel": json.novel}
            } else {
                throw new TypeError("could not parse hyperclova response")
            }
        }
        catch(error){
            console.log(error)
            throw error
        }
}




export async function GetPostsVisitor(
    globalCursor: number | null
) : Promise<(Post & {liked:boolean})[]>
{
    return postRepository.getPostsFromRecentAnonymous(globalCursor || -1, 10)
}

export async function GetPostsGenerateFeed(
    userId: string,
    followingCursor: number | null,
    globalCursor: number | null,
) : Promise<{top: (Post & {liked:boolean})[], posts: (Post & {liked:boolean})[], nextFollowingCursor: number | null, nextGlobalCursor: number | null}> {

    let batch0:  (Post & {liked:boolean})[]= []
    let batch:  (Post & {liked:boolean})[]= []

    let idFilter: number[] = []
    if(!followingCursor){
        batch0 = await postRepository.getPostsByFollowedUsers(userId, null, 5)
        if(batch0.length > 0){
            followingCursor = batch0[batch0.length - 1].id
        }
        idFilter = idFilter.concat(batch0.map((p)=>p.id))
    }
    batch = await postRepository.getPostsByFollowedUsers(userId, followingCursor, 5)
    const nextFollowingCursor = batch.length > 0 ? batch[batch.length -1].id : followingCursor
    idFilter = idFilter.concat(batch.map((p)=>p.id))
    
    const recentPosts = await postRepository.getPostsFromRecent(userId, globalCursor, 10-batch.length)
    const nextGlobalCursor = recentPosts.length > 0 ? recentPosts[recentPosts.length -1].id : globalCursor
    recentPosts.forEach((p)=>{
        if(!idFilter.includes(p.id)){
            batch.push(p)
            idFilter.push(p.id)
        }
    })
    
    return {top: batch0, posts: batch, nextFollowingCursor: nextFollowingCursor, nextGlobalCursor: nextGlobalCursor}
}