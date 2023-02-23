import { db } from "../../prisma/datasource"
import { followRepository} from "../../server_src/repository/FollowRepository"
import { ListFollowing } from "../../server_src/controllers/followers"
describe("post", ()=>{
    const users = [
        {"userId": "thinkAboutTzu", "firstName": "쯔위", "lastName": "조"}
    ]

    test("follow", async()=>{
        //for(let i = 1; i < 20; i++){
        //    await followRepository.addFollower("sample_user_0", "sample_user_" + i)
        //}
        
        const followResult = await followRepository.getFollowingList("sample_user_0")
        expect(followResult.length).toEqual(19)
        
        const random4Following = await followRepository.getFollowingList("sample_user_0")
        expect(random4Following.length).toEqual(4)
    })
    afterAll(async ()=>{
        await db.$disconnect()
    })

})