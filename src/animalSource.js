//import { BASE_URL } from './apiConfig.js';

export function searchAnimal(searchParams){

    const URL = `${BASE_URL}/pokemon/${searchParams}`;

    return fetch(URL).then(gotResponseACB).then(someACB);

    //aynchronous callback to handle response
    function gotResponseACB(response) {
        if (!response.ok) {
            throw new Error('not ok');
        }
        console.log("json", response.json())
        return response.json();
    } 

    function someACB(objectResponse){
        //console.log("results", objectResponse)
        return objectResponse; 
    }
}
