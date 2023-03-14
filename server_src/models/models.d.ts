import {Prisma, user, follow, userSelect, post, ticket, PostVisibility} from '@prisma/client'

declare type UserCreateInput = Prisma.UserCreateInput
declare type PostCreateInput = Prisma.PostCreateInput

declare type PostVisibility = PostVisibility

declare type PostPaginateDto = {
    authorId?: string, 
    userId?: string,
    pageCursor: number, 
    limit: number
}

//should we do request type checks?
declare type GenerateTaleRequestData = {
    input: string,
}

declare type CreatePostRequestData = {
    content: string,
    shelf?: string,
    visibility?: PostVisibility,
    hashtags?: string[],
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
declare type Post = post
declare type Ticket = ticket
declare type BooleanOperationResult = {
    success: boolean,
    reason? :string,
}
declare type UserProfile = user