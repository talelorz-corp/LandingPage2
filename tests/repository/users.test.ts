import { AgeRange } from "@prisma/client"
import { db } from "../../prisma/datasource"
import { userRepository } from "../../server_src/repository/UserRepository"
import { Obscure, Unobscure } from "../../server_src/utils/userEncoding"
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
            await userRepository.createUser({
                userId: "sample_user_",
                firstName: "fname",
                lastName: "lname",
                snsId: "sample_id",
                provider: "KAKAO",
                gender: 0,
                ageRange: AgeRange.Age10_15,
                job: "학생"
            })
        } catch(e){
            console.log(e)
        }

        expect(1).toBe(1)
    })

    test('updateProfile', async()=>{
        try{
            const userId = "sample_user_"
            await userRepository.updateProfile(userId, {
                job: "교수",
            })
            const profile = await userRepository.getUserProfile(userId)
            expect(profile?.job).toStrictEqual("교수")
        } catch(e){
            console.log(e)
        }
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

    test('encodeId', async()=>{
        const id1="sample_id_1"
        const encoded1 = Obscure(id1)
        console.log(encoded1)
        const decoded1 = Unobscure(encoded1)
        console.log(decoded1)
        expect(decoded1).toStrictEqual(id1)

        const id2="_123__kim_"
        const encoded2 = Obscure(id2)
        console.log(encoded2)
        const decoded2 = Unobscure(encoded2)
        console.log(decoded2)
        expect(decoded2).toStrictEqual(id2)
    })

    afterAll(async ()=>{
        await db.$disconnect()
    })
})