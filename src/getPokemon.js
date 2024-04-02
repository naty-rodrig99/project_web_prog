
export function getPokemonDetials(){
    const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    //const url = 'https://pokeapi.co/api/v2/pokemon/35';
    
    function responseACB(response){
        const result = response.json();
        console.log(result);
    }

    function errorACB(error){
        console.error(error);
    }

    const response = fetch(url).then(responseACB).catch(errorACB);

}