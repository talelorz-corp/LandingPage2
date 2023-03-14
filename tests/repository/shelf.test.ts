import { db } from "../../prisma/datasource"
import { shelfRepository } from "../../server_src/repository/ShelfRepository"
import { postRepository } from "../../server_src/repository/PostRepository"
describe("shelf", ()=>{
    test('shelf_basic1', async()=>{
        const userId = "sample_user_3"
        await shelfRepository.Create(userId, "여행가볼곳")
        let found = await shelfRepository.ListAll(userId)
        expect(found[0].name).toStrictEqual("여행가볼곳")
        await shelfRepository.Delete(userId, "여행가볼곳")
        found = await shelfRepository.ListAll(userId)
        expect(found.length).toEqual(0)
    })

    test('shelf_with_post', async()=>{
        const userId = "sample_user_3"
        await shelfRepository.Create(userId, "여행가볼곳")
        let found = await shelfRepository.ListAll(userId)
        
        const post = await postRepository.createPost({userId: userId, content: `testtest`, shelf:"여행가볼곳"}) 
        console.log(post)

        await shelfRepository.Delete(userId, "여행가볼곳")
        found = await shelfRepository.ListAll(userId)
        expect(found.length).toEqual(0)

        const postAfter = await postRepository.getPosts({id: post.id}, false, null)
        console.log(postAfter)
    })
    
    afterAll(async ()=>{
        await db.$disconnect()
    })
})