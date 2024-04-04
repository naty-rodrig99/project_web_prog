import {Details} from "./detailsPresenter.jsx";
import { Main } from "./mainPresenter.jsx";
import {Navigator} from "./navPresenter.jsx";
import {UserPage} from "./userPresenter.jsx"
//import "../style.css"
import { observer } from "mobx-react-lite"
import {  createHashRouter,  RouterProvider} from "react-router-dom";

function makeRouter(model){

    function DetailsWrapper() {
        return (
          <>
            <Details model={model} />
            <DetailsDetails model={model} />
          </>
        );

    }
    
    return createHashRouter([
        { 
            path: "/", 
            element:<Details model={model} />,
        },

        {
            path: "/main",
            element: <Main model = {model}/>,
        },

        // { 
        //     path: "/search", 
        //     element:<Search model={model} />,
        // },
        // {
        //     path: "/summary",
        //     element: <Summary model={model} /> ,
        // },
         { 
             path: "/details", 
             element:<Details model={model} />,
         },
         { 
            path: "/user", 
            element:<UserPage model={model} />,
        }
    
    ])
    }
const ReactRoot = observer((props)=>{
    return (<div className="MainPage">
                <div className="NavPage">
                    <Navigator></Navigator>
                </div>
                <RouterProvider router={makeRouter(props.model)}/>
            </div>
           );
})



export { makeRouter, ReactRoot }
