declare type PostId = number
declare type UserId = string
declare type Likes = number
declare type Post = {
    postId: PostId,
    content: string,
    created_at: string,
    userId: UserId,
    likes: Likes
}