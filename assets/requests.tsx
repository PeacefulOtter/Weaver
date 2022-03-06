
import axios from 'axios'

export const get = (query: string, params: any, callback: (data: any) => void) => {
    console.log('[GET] ', query);
    axios.get(query, { params } )
        .then( res => callback(res.data) )
}