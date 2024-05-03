// (1) ------------ application state (model) -----------
import { model } from '/src/pokemonModel.js';
// uncomment to make the app update when the model changes:

import { reaction, observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model);

//reactiveModel.setSearchName("cheetah")
reactiveModel.setSearchText("ditto");
reactiveModel.doSearch(reactiveModel.searchParams.name);

import { createElement } from "react";
window.React= {createElement:createElement}; // needed in the lab because it works with both React and Vue

import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
<script src="https://kit.fontawesome.com/6af1e368ac.js" crossorigin="anonymous"></script>

createRoot(document.getElementById('root'))
    .render(<ReactRoot model={reactiveModel}/>);

    /*const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    } */
    // import {Helmet} from "react-helmet";

    // class Application extends React.Component {
    //   render () {
    //     return (
    //         <div className="application">
    //             <Helmet>
    //                 <meta charSet="utf-8" />
    //                 <title>My Title</title>
    //                 <link rel="canonical" href="http://example.com/example" />
    //             </Helmet>
    //             ...
    //         </div>
    //     );
    //   }
    // };

window.myModel= reactiveModel;
export {reactiveModel}

import {connectToFirebaseUser} from '/src/firebaseModel.js'
connectToFirebaseUser(reactiveModel, reaction)


// import {createRoot} from "react-dom/client";
// createRoot(document.getElementById('root'))
//     .render(<div>hello world!</div>);  

