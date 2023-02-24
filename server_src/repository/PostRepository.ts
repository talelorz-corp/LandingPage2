import { PostPaginateDto, Post, PostVisibility } from '../models/models';
import { db } from '../../prisma/datasource'
import { followRepository } from './FollowRepository';
import { Prisma } from 'prisma/prisma-client'

export class PostRepository{
    async createPost (p: {userId: string, content:string, visibility?: PostVisibility, shelf?: string, hashtags: string[]}) : Promise<Post>{
        try{
            const shelfOptions =  p.shelf ? {
                connectOrCreate: {
                    where: {
                        name_userId: {
                            userId: p.userId, name: p.shelf
                        }
                    },
                    create: {
                        name: p.shelf,
                        user: {
                            connect: {
                                userId: p.userId
                            }
                        }
                    }
                }
            } : undefined
            const createdPost : Post | null = await db.post.create({data: {
                content: p.content!,
                visibility: p.visibility,
                shelf: shelfOptions,
                user: {
                    connect: {
                        userId: p.userId!, 
                    }
                },
            }})
            return createdPost
        }catch (e){
            throw e
        }
    }

    async getPosts(filter :{id?: number, authorId?: string, shelf?: string | null}, includePrivate:boolean=false, userId:string|null)
    :Promise<(Post & {liked:boolean})[]> {
        try{
            if(filter.shelf && !filter.authorId){
                throw Error("authorId must also be provided when shelf is specified")
            }
            if(userId){
                //logged in: get likes as well!
                const foundPosts = await db.post.findMany({
                    where: {
                        id : filter.id,
                        authorId: filter.authorId,
                        shelf: filter.shelf === null ? null : {
                            name: filter.shelf,
                            userId: filter.authorId
                        },
                        visibility: includePrivate ? {} : "PUBLIC"
                    },
                    include:{
                        likes: {
                            where: {
                                by: userId
                            }
                        }
                    }
                })
                const foundPostsWithLikes = foundPosts.map((p)=>{ 
                    const post_data = p as Post //pick the 'post' part, omitting the extra likes data
                    return {...post_data, liked: p.likes?.length > 0 ? true : false}
                })
                return foundPostsWithLikes
            } else {
                //anonymous mode: exclude likes
                const foundPosts = await db.post.findMany({
                    where: {
                        id : filter.id,
                        authorId: filter.authorId,
                        shelf: filter.shelf === null ? null : {
                            name: filter.shelf
                        },
                        visibility: includePrivate ? {} : "PUBLIC"
                    }
                })
                const foundPostsWithLikes = foundPosts.map((p)=>{ 
                    const post_data = p as Post //pick the 'post' part, omitting the extra likes data
                    return {...post_data, liked: false}
                })
                return foundPostsWithLikes
            }

        }catch(e){
            throw(e)
        }
        return []
    }

    async deletePostCheckAuthor(postId: number, userId: string){
        try{
            const found = await db.post.findUniqueOrThrow({
                where:{
                    id: postId
                },
                select:{
                    authorId: true
                }
            })
            if(found.authorId !== userId) throw Error("deleting someone else's post")
            await db.post.delete({
                where: {
                    id: postId
                }
            })

        }catch(e){
            throw e
        }
    }

    async getPostsFromRecentAnonymous(cursor: number, limit: number): Promise<(Post & {liked:boolean})[]> {
        try {
            let whClause: Prisma.postWhereInput
            whClause = cursor > 0 ? {
                id: {
                    lt: cursor
                },
                visibility: "PUBLIC"
            } : {
                visibility: "PUBLIC"
            }
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
            let whClause: Prisma.postWhereInput = {
                visibility: "PUBLIC",
                id: {
                    lt: cursor || undefined
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
            const foundPostsWithLikes = foundPosts.map((p)=>{ 
                const post_data = p as Post //pick the 'post' part, omitting the extra likes data
                return {...post_data, liked: p.likes.length > 0 ? true : false}
            })
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
                    },
                    visibility: 'PUBLIC'
                }
            } else {
                whClause = {
                    authorId:{
                        in: followingsId
                    },
                    id: {
                        lt: cursor
                    },
                    visibility: 'PUBLIC'
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
            const foundPostsWithLikes = foundPosts.map((p)=>{ 
                const post_data = p as Post //pick the 'post' part, omitting the extra likes data
                return {...post_data, liked: p.likes.length > 0 ? true : false}
            })
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
                        authorId: q.userId,
                        id: {
                            gte: q.pageCursor
                        },
                        visibility: "PUBLIC"  
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
