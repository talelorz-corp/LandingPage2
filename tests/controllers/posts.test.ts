import { postRepository } from "../../server_src/repository/PostRepository"
import { db } from "../../prisma/datasource"
import { GetPostsGenerateFeed, GetPostsVisitor, UploadPost } from "../../server_src/controllers/posts"

describe("post", ()=>{
    const users = [
        {"userId": "thinkAboutTzu", "firstName": "쯔위", "lastName": "조"}
    ]

    //beforeAll(async()=>{
    //    //batch insert
    //    for(let i = 0; i < 30; i++){
    //        for(let j = 0; j < i % 7; j++){
    //            let date = new  Date()
    //            date.setMinutes(j % 59)
    //            date.setSeconds(i)
    //            await postRepository.createPost({authorId: `sample_user_${i}`, content: `content_${i}_${j}`, createdAt: date})    
    //        }
    //    }
    //})

    test("generate feed", async()=>{
        const {top, posts, nextFollowingCursor, nextGlobalCursor} = await GetPostsGenerateFeed("sample_user_0", null, null)
        top.forEach((p)=> console.log(p.id, p.authorId, p.createdAt, p.liked))
        console.log("=================")
        posts.forEach((p)=> console.log(p.id, p.authorId, p.createdAt, p.liked))
        console.log(`next following:${nextFollowingCursor}, global:${nextGlobalCursor}`)
        expect(1).toBe(1)
    })


    test("anonymous feed", async()=>{
        const posts = await GetPostsVisitor(null)
        posts.forEach((p)=> console.log(p.id, p.authorId, p.createdAt, p.liked))
        expect(posts[0].id).toBeTruthy()
    })

    afterAll(async ()=>{
        await db.$disconnect()
    })
})