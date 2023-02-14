import { db } from "../../prisma/datasource"
import { userRepository } from "../../server_src/repository/UserRepository"
describe("dbtest", ()=>{

    beforeAll(()=>{
    })

    const users = [
        {"userId": "쯔를생각해", "firstName": "쯔위", "lastName": "조"}
    ]
    test('createUser', async()=>{
        try{
            const res = await userRepository.createUser({
                userId: "zyozyo",
                firstName: "지효",
                lastName: "박",
                snsId: "TEST_SNSID_1",
                provider: "KAKAO",
            })
            console.log(res)
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
