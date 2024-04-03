
export function getPokemonDetials(){
    const url = 'https://pokeapi.co/api/v2/pokemon/7';
    //const url = 'https://pokeapi.co/api/v2/pokemon/35';
    
    function responseACB(response){
        const result = response.json();
        console.log("result:",result);
        return result
    }

    function someObjectACB(objectResponse){
        console.log(objectResponse.name);
        return objectResponse
    }

    function errorACB(error){
        console.error(error);
        return error
    }

    return fetch(url).then(responseACB).then(someObjectACB).catch(errorACB);

}