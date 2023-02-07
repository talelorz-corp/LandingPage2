import {postRepository} from '../repository/PostRepositoryImpl'

export async function UploadPost(userId: string, content: string)
    : Promise<{postId: PostId}> {
    try{
        let postId = await postRepository.createPost(userId, content)
        return {"postId": postId}
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
    limit:number
) : Promise<{post : Post, likes: number, hashtags?: string[]}[]> {
    try{
        let posts = postRepository.getPostsWithLikes(userId, pageCursor, limit)
        return posts
    }catch(error){
        throw Error("post upload error")
    }
}