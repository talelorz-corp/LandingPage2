import {getMapper} from '../sql/mapper'
import { mysqlDatasource } from './datasource'

const mapper = getMapper('postMapper')
const datasource = mysqlDatasource()

export const postRepository = {
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
    getPostsWithLikes : async (userId: UserId, idcursor: PostId, limit: number) => {
        let posts: {post: Post, likes: number, hashtags?: string[]}[] = []

        try{
            if(idcursor < 0){
                const query = mapper.makeQuery('findPostsFromFirst', {
                    limit:limit,
                    userId: userId,
                })
                const [rows, fields] = await datasource.query(query)
                if(rows) posts = rows.map((row:any) =>{
                    return {
                        "post": {
                            postId: row.idposts,
                            content: row.content,
                            created_at: row.created_at,
                            userId: row.userId,
                        }, 
                        "likes": row.likes,
                        "hashtags": [],
                    }
                })
            } else {
                const query = mapper.makeQuery('findPostsInRange', {
                    idcursor: idcursor, 
                    limit:limit,
                    userId: userId,
                })
                const [rows, fields] = await datasource.query(query)
                if(rows) posts = rows.map((row:any) =>{
                    return {
                        "post": {
                            postId: row.idposts,
                            content: row.content,
                            created_at: row.created_at,
                            userId: row.userId,
                        }, 
                        "likes": row.likes,
                        "hashtags": [],
                    }
                })
            }
        }
        catch(error){
            console.error(error)
            throw(new Error('findpost query failed'))
        }
        return posts
    }
}

