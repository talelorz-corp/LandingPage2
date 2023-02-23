declare type PostId = number
declare type UserId = string
declare type LikesCount = number
declare type Post = {
    postId: PostId,
    content: string,
    createdAt: string,
    authorId: string,
    likesCount: LikesCount
}