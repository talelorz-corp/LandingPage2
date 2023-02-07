import {getMapper} from '../sql/mapper'
import { mysqlDatasource } from './datasource'

const mapper = getMapper('postMapper')
const datasource = mysqlDatasource()

export const postRepository: PostRepository = {
    createPost: async (userId: UserId, content:string) => {
        //query
        const query = mapper.makeQuery('createPost', 
        {
            content: content,
            userId: userId,
        })

        try{
            await datasource.query(query)
            const [rows, fields] = await datasource.query('SELECT last_insert_id();')
            if(!rows) return null
            return rows[0]['last_insert_id()']
        } catch(error){
            console.error(error)
            throw new Error('createPost-query-failed')
        }
    },
    getPosts : async (pageCursor: PostId, limit: number) => {
        return []
    }
}

