import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ]
})

//db.$on('query', (e) => {
//    console.log('Query: ' + e.query)
//    console.log('Params: ' + e.params)
//    console.log('Duration: ' + e.duration + 'ms')
//  })