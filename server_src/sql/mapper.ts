let registeredMappers: string[] = []
import {createMapper, getStatement} from "mybatis-mapper"
import * as path from 'path'

const sqlMapperPath = path.join(__dirname, '../../resources/mappers')
export function getMapper(name: string) 
: {makeQuery: (queryId: string, paarams: any)=>string} {
    if(!registeredMappers.includes(name)){
        createMapper(['./server_src/sql/' + name + '.xml'])
        registeredMappers.push(name)
    }
    //like currying, in a sense.. on the value 'name'
    return {
        makeQuery: (queryId: string, params: any) => {
            return getStatement(name, queryId, params, {
                language: "sql",
                indent: "  ",
              })
        }
    }
}
