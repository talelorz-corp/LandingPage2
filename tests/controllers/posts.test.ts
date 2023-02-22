import { db } from "../../prisma/datasource"
import { GetPostsGenerateFeed, UploadPost } from "../../server_src/controllers/posts"
describe("dbtest", ()=>{
    const users = [
        {"userId": "thinkAboutTzu", "firstName": "쯔위", "lastName": "조"}
    ]

    beforeAll(async()=>{
        //batch insert
        for(let i = 0; i < 10; ++i){
            UploadPost("zyozyo", `content_${i}`)
        }
    })

    test("generate feed", async()=>{
        const {top, posts} = await GetPostsGenerateFeed("jypiece", 40, 40)
        top.forEach((p)=> console.log(p.id, p.authorId, p.createdAt, p.liked))
        console.log("=================")
        posts.forEach((p)=> console.log(p.id, p.authorId, p.createdAt, p.liked))
        expect(1).toBe(1)
    })

    afterAll(async ()=>{
        await db.$disconnect()
    })
})