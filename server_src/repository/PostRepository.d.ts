interface PostRepository{
    createPost : (userId: UserId, content: string) => Promise<PostId>
    getPosts : (pageCursor: PostId, limit: number) => Promise<Post[]>
}