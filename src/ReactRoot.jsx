// import {Summary} from "./summaryPresenter.jsx";
// import {Sidebar} from "./sidebarPresenter.jsx";
// import {Details} from "./detailsPresenter.jsx";
import {Search} from "./searchPresenter.jsx";
//import "../style.css"
import { observer } from "mobx-react-lite"
import {  createHashRouter,  RouterProvider} from "react-router-dom";

function makeRouter(model){
    return createHashRouter([
        { 
            path: "/", 
            element:<Search model={model} />,
        }
        // { 
        //     path: "/search", 
        //     element:<Search model={model} />,
        // },
        // {
        //     path: "/summary",
        //     element: <Summary model={model} /> ,
        // },
        // { 
        //     path: "/details", 
        //     element:<Details model={model} />,
        // }
    
    ])
    }
const ReactRoot = observer((props)=>{
    return (<div className="MainPage">
                    <RouterProvider router={makeRouter(props.model)}/>
            </div>
           );
})

export { makeRouter, ReactRoot }
