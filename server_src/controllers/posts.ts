import {postRepository} from '../repository/PostRepository'
import { PostCreateInput, Post } from '../models/models'

export async function UploadPost(userId: string, content: string)
    : Promise<{postId: PostId}> {
    try{
        const post = await postRepository.createPost({userId: userId, content: content})
        return {"postId": post.id}
    }catch(error){
        throw Error("post upload error")
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


export async function GetPosts(
    userId: UserId, 
    pageCursor: PostId, 
    limit:number) :
    Promise<{posts: Post[], likes:number[]}>{
    try{
        const posts = await postRepository.getPostsByAuthor({authorId: userId, userId: userId, pageCursor: pageCursor, limit: limit})
        const postIds = posts.map((post)=>post.id)
        const postLikes = await postRepository.getIfUserLikedPosts({userId: userId, postIds: postIds})
        return {posts: posts, likes: postLikes}
    }catch(error){
        throw Error("post find error")
    }
}