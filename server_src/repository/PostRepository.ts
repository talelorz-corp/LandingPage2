export class PostRepository{
    createPost : (userId: UserId, content: string) => Promise<PostId> = (userId, content) => {
        throw new Error("not defined")
    }
    getPosts : (pageCursor: PostId, limit: number) => Promise<Post[]> = (pageCursor, limit) => {
        throw new Error("not defined")
    }
}