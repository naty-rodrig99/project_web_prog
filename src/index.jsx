import {createRoot} from "react-dom/client";
createRoot(document.getElementById('root'))
    .render(<div>hello world!</div>);  

    const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }