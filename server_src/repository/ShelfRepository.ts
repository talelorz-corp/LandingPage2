import { db } from '../../prisma/datasource'

class ShelfRepository{
    async CreateShelf(userId: string, name: string){

    }

    async DeleteShelf(userId: string, name: string){

    }

    async MoveToShelf(postId: string, userId: string, to: string | null){

    }

    async ModifyShelf(userId: string, {name}: {name: string}){

    }
}

export const shelfRepository = new ShelfRepository()
