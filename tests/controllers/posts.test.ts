import { GetPosts, UploadPost, WriteNovel } from "../../server_src/controllers/posts";
import {mysqlDatasource} from '../../server_src/repository/datasource'
import { postRepository } from "../../server_src/repository/PostRepositoryImpl";
let datasource:any = null
describe("dbtest", ()=>{

    beforeAll(()=>{
        datasource = mysqlDatasource()
    })

    /*
    test('create', async()=>{
        const postId = await UploadPost("2616915419", "세상은 요지경~~")
        console.log("postId returned:", postId)
        expect(1).toBe(1)
    })
*/
    test('retrive', async ()=>{
        const posts = await GetPosts("쯔를생각해", 11, 3)
        console.log(posts)

        expect(1).toBe(1)
    })
    afterAll(()=>{
        datasource.close() //closes all connections in pool
    })
} )


jest.setTimeout(30000)

/*
describe("hyperclova test", ()=>{
    test('generate', async()=>{
        const name = "주은"
        const input = "오늘은 캘리포니아의 한 도시인 Irvine지역에 방문했다. 미국 여행을 하면서 한 번쯤 가보고 싶었던 식당에서 밥을 먹고 넓은 실외 쇼핑몰 구경을 했다. 그 뒤로는 라구나 해변에 가서 노을을 구경했다. 미국에 와서 처음 보는 바다였다. 끝이 어느 정도 보이는 한국의 해변과는 또 다른 느낌이었다. 자연의 광활함을 피부로 느꼈달까. 날씨가 좋아서 바다 구경하기 딱 좋은 날이었다."
        const response = await WriteNovel(name, input)
        console.log(response.novel)
        expect(1).toBe(1)
    })
})
*/