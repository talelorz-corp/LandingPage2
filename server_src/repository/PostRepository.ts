import { Ticket, PostCreateDto, PostPaginateDto, Post } from '../models/models';
import {db} from '../../prisma/datasource'

export class PostRepository{
    createPost = async function (p: PostCreateDto) : Post{
        try{
            const createdPost : Post | null = await db.post.create({data: {
                content: p.content,
                user: {
                    connect: {
                        userId: p.userId, 
                    }
                },
            }})
            return createdPost
        }catch (e){
            throw e
        }
    }

    getPostsByAuthor = async function(q: PostPaginateDto): Promise<Post[]> {
        try{
            const foundPosts : Post[] | null = await db.post.findMany({
                where: {
                    AND: [
                        {authorId: q.userId},
                        {id: {
                            gte: q.pageCursor
                        }}
                    ]
                },
                orderBy: {
                    id: "asc"
                },
                take: q.limit
            })
            if(!foundPosts) return []
            return foundPosts
        }catch(e){
            console.log(e)
        }
        return []
    }
    getIfUserLikedPosts = async function({userId, postIds}: {userId: string, postIds: number[]}):
    Promise<number[]>
    {
        try{
            const foundLikes = await db.likes.findMany({
                //where likes.postId==postId AND likes.userId==userId
                where: {
                    AND: [
                        {postId: {
                            in : postIds
                        }},
                        {by: userId},
                    ]
                },
                select: {
                    postId: true
                }
            })
            return foundLikes.map((like) => like.postId)
        }catch(e){
            console.log(e)
        }
        return []
    }
}

export const postRepository = new PostRepository()
