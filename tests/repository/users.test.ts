import { db } from "../../prisma/datasource"
import { userRepository } from "../../server_src/repository/UserRepository"
import { UploadPost} from "../../server_src/controllers/posts"
describe("dbtest", ()=>{
    const users = [
        {"userId": "쯔를생각해", "firstName": "쯔위", "lastName": "조"}
    ]

    //test('createPost', async()=>{
    //    try{
    //        const id = await UploadPost("샤샤", "샤샤가 쓴 다른컨텐츠입니다.")
    //    }catch(e){
    //        console.log(e)
    //    }
    //    expect(1).toBe(1)
    //})

    //test('getMyPosts', async()=>{
    //    const {posts, likes} = await GetPosts(
    //        '쯔를생각해', 2, 4
    //    ) 
    //    console.log(posts)
    //    console.log(likes)
    //    expect(likes).toStrictEqual([2, 4])
    //})

    test('createUser', async()=>{
        try{
            for(let i = 1; i < 30; i++){
                await userRepository.createUser({
                    userId: "sample_user_" + i,
                    firstName: "fname"+i,
                    lastName: "lname"+i,
                    snsId: "sample_id"+i,
                    provider: "KAKAO",
                })
            }
        } catch(e){
            console.log(e)
        }

        expect(1).toBe(1)
    })

    test('snsUser', async()=>{
        try{
            const findResult = await userRepository.getUserSNS({
                snsId: "TEST_SNSID_2",
                provider: "KAKAO",
            })
            console.log("found:", findResult)
        }
        catch (e) {
            console.log(e)
        }
        expect(1).toBe(1)

    })

    afterAll(async ()=>{
        await db.$disconnect()
    })
} )
