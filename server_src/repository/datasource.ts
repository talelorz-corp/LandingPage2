const mysql = require('mysql2/promise')
let pool: any = null

//types must be fixed here...
export function mysqlDatasource (){
    if(pool === null) {
        pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: "apiuser",
            password: "Eenyminey#20",
            database: 'talelorz',
        })
        console.log('mysql db init!')
    }
    return {
        query: (query: any): any =>{
            if(query === null) return null
            return pool.query(query)
        },
        close: ()=>{
            pool.end()
        },
        getPool : ()=>{
            return pool
        },
        getConnection: ()=>{
            return pool.getConnection()
        }
    }
}
