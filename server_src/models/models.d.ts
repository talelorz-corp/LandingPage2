import {Prisma, user, follow, userSelect, Post, ticket} from '@prisma/client'

declare type UserCreateInput = Prisma.UserCreateInput
declare type PostCreateInput = Prisma.PostCreateInput
declare type PostCreateDto = {
    userId: string,
    content: string,
}

declare type PostPaginateDto = {
    authorId?: string, 
    userId?: string,
    pageCursor: number, 
    limit: number
}

declare type PostCreateResponseDto = {
    ok: boolean,
    post: Post
}

declare type TicketOperationResultDto = {
    success: boolean,
    reason?: string,
    countAfter: number,
}

declare type FollowGetResultDto = {
    followersCount: number,
    followingCount: number,
    followers?: User[],
    followings?: User[],
}

declare type FollowerInfoDto = Partial<follow & user>
declare type Follow = follow
declare type User = user
declare type Post = Post
declare type Ticket = ticket
declare type BooleanOperationResult = {
    success: boolean,
    reason? :string,
}
declare type UserProfile = user