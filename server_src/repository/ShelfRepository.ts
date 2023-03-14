import { connect } from 'http2'
import { db } from '../../prisma/datasource'

class ShelfRepository{
    async Create(userId: string, name: string){
        try{
            await db.shelf.create({
                data: {
                    userId: userId,
                    name: name
                }
            })
        } catch(e: any){
            throw e
        }
    }

    async Delete(userId: string, name: string){
        try{
            //unclassify all posts previously classified to that shelf.
            await db.post.updateMany({
                where:{
                    shelf: {
                        userId: userId,
                        name: name
                    }
                },
                data:{
                    shelfId: null
                }
            })
            await db.shelf.delete({
                where:{
                    name_userId: {
                        userId: userId,
                        name:  name
                    }
                }
            })
        }catch(e: any) {
            throw(e)
        }
    }

    async Move(postIds: number[], userId: string, to: string | null){
        try{
            //first get the id of the shelf.
            let toShelfId = null
            if(to) {
                const toShelf = await db.shelf.findUniqueOrThrow({
                    where: {
                        name_userId: {
                            userId: userId,
                            name: to
                        }
                    }
                })
                toShelfId = toShelf.id
            }

            //then update all the posts
            await db.post.updateMany({
                where:{
                    AND: [
                        {id: {
                            in : postIds
                        }},
                        {authorId: userId},
                    ]
                },
                data:{
                    shelfId: toShelfId //may be null, which is fine.
                }
            })

        } catch(e: any) {
            throw(e)
        }

    }

    async ListAll(userId: string){
        try{
            const shelves = await db.shelf.findMany({
                where: {
                    userId : userId
                }
            })
            return shelves
        } catch(e: any){
            throw e
        }
    }

    async Modify(userId: string, {name}: {name: string}){

    }
}

export const shelfRepository = new ShelfRepository()
