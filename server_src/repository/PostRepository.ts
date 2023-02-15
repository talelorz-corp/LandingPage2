import { User, PostCreateDto, Post } from '../models/models';
import {db} from '../../prisma/datasource'

export class PostRepository{
    createPost = async function (p: PostCreateDto) {
        try{
            const createdPost : Post | null = await db.post.create({data: {
                content: p.content,
                author: {
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
    getPostsByAuthor = async function(userId: string, pageCursor: number, limit: number): Promise<Post[]> {
        try{
            const foundPosts : Post[] | null = await db.post.findMany({
                where: {
                    AND: [
                        {authorId: userId},
                        {id: {
                            gte: pageCursor
                        }}
                    ]
                },
                orderBy: {
                    id: "asc"
                },
                take: limit
            })
            if(!foundPosts) return []
            return foundPosts
        }catch(e){
            console.log(e)
        }
        return []
    }
}

export const postRepository = new PostRepository()
