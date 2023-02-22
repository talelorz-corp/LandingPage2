import { Ticket, PostPaginateDto, Post } from '../models/models';
import {db} from '../../prisma/datasource'
import { followRepository } from './FollowRepository';
import { Prisma} from 'prisma/prisma-client'

export class PostRepository{
    async createPost (p: Partial<Post>) : Promise<Post>{
        try{
            const createdPost : Post | null = await db.post.create({data: {
                content: p.content!,
                user: {
                    connect: {
                        userId: p.authorId!, 
                    }
                },
            }})
            return createdPost
        }catch (e){
            throw e
        }
    }

    shuffleArray(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async getPostsFromRecent(userId: string, cursor: number, limit: number): Promise<(Post & {liked:boolean})[]> {
        try {
            const whClause = cursor > 0 ? {
                id: {
                    lt: cursor
                }
            } : undefined
            const foundPosts = await db.post.findMany({
                where: whClause,
                orderBy: {
                    id: "desc"
                },
                take: limit,
                include: {
                    likes: {
                        where: {
                            by: userId
                        }
                    }
                }
            })
            const foundPostsWithLikes = foundPosts.map((p)=>{ return {id: p.id, authorId: p.authorId, likesCount: p.likesCount, content: p.content, createdAt:p.createdAt, liked: p.likes.length > 0 ? true : false}})
            return foundPostsWithLikes
        }catch(e){
            console.log(e)
        }
        return []
    }
    async getPostsByFollowedUsers(userId: string, cursor: number, limit: number): Promise<(Post & {liked:boolean})[]> {
        try {
            const followings = await followRepository.getFollowingList(userId)
            let followingsId = followings.map((f)=>f.targetId!) || []
            this.shuffleArray(followingsId)
            let whClause: Prisma.postWhereInput
            if(cursor < 0){
                whClause = {
                    authorId:{
                        in: followingsId
                    }
                }
            } else {
                whClause = {
                    AND: [
                        {
                            authorId:{
                                in: followingsId
                            }
                        },
                        {
                            id: {
                            lt: cursor
                            }
                        }
                    ]
                }
            }
            const foundPosts = await db.post.findMany({
                where: whClause,
                orderBy: {
                    id: "desc"
                },
                take: limit,
                include: {
                    likes: {
                        where: {
                            by: userId
                        }
                    }
                }
            })
            console.log("with raw likes after query: ", foundPosts)
            const foundPostsWithLikes = foundPosts.map((p)=>{ return {id: p.id, authorId: p.authorId, likesCount: p.likesCount, content: p.content, createdAt:p.createdAt, liked: p.likes.length > 0 ? true : false}})
            return foundPostsWithLikes
        }catch(e){
            console.log(e)
        }
        return []
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
