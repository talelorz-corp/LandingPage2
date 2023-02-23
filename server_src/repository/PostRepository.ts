import { Ticket, PostPaginateDto, Post } from '../models/models';
import {db} from '../../prisma/datasource'
import { followRepository } from './FollowRepository';
import { Prisma} from 'prisma/prisma-client'

export class PostRepository{
    async createPost (p: Partial<Post>) : Promise<Post>{
        try{
            console.log(p.authorId, p.createdAt)
            const createdPost : Post | null = await db.post.create({data: {
                content: p.content!,
                user: {
                    connect: {
                        userId: p.authorId!, 
                    }
                },
                createdAt: p.createdAt || undefined
            }})
            return createdPost
        }catch (e){
            throw e
        }
    }
    async getPostsFromRecentAnonymous(cursor: number, limit: number): Promise<(Post & {liked:boolean})[]> {
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
                take: limit
            })
            return foundPosts.map((p)=>{ return {...p, liked:false}})
        }catch(e){
            console.log(e)
        }
        return []
    }

    async getPostsFromRecent(userId: string, cursor: number | null, limit: number): Promise<(Post & {liked:boolean})[]> {
        try {
            const whClause = cursor ? {
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


    async getPostsByFollowedUsers(userId: string, cursor: number | null, limit: number): Promise<(Post & {liked:boolean})[]> {
        try {

            let followings = await followRepository.getFollowingList(userId)
            if(followings.length > 400) {
                //to prevent full table scan when 'in'query gets SUPER long.
                //the threshold(default 400) should be set near the maximum query optimzation memory for each specific db engine in use.
                followings = followings.slice(0, 400)
            }
            let followingsId = followings.map((f)=>f.targetId!) || []

            let whClause: Prisma.postWhereInput
            if(!cursor){
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
            const foundPostsWithLikes = foundPosts.map((p)=>{ return {id: p.id, authorId: p.authorId, likesCount: p.likesCount, content: p.content, createdAt:p.createdAt, liked: p.likes.length > 0 ? true : false}})
            return foundPostsWithLikes
        }catch(e){
            console.log(e)
        }
        return []
    }

    async getPostsByAuthor(q: PostPaginateDto): Promise<Post[]> {
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

    async getIfUserLikedPosts({userId, postIds}: {userId: string, postIds: number[]}):
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
