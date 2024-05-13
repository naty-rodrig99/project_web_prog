import React, { useState, useEffect } from "react";


import {Details} from "./Presenter/detailsPresenter.jsx";
import { Main } from "./Presenter/mainPresenter.jsx";
import {Navigator} from "./Presenter/navPresenter.jsx";
import {UserPage} from "./Presenter/userPresenter.jsx";
import {TeamPage} from "./Presenter/teamPresenter.jsx"
import {CreateTeam} from "./Presenter/teamCreatePresenter.jsx";
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
            element:<Main model={model} />,
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
        },
        { 
            path: "/team", 
            element:<TeamPage model={model} />,
        },
        { 
            path: "/createTeam", 
            element:<CreateTeam model={model} />,
        }
    
    ])
    }
const ReactRoot = observer((props)=>{
    return (<div className="MainPage">
                <title>Pokemon</title>
                <div className="NavPage">
                    <Navigator model={props.model}/>
                </div>
                <RouterProvider router={makeRouter(props.model)}/>
            </div>
           );
})



// export { ReactRoot };
export { makeRouter, ReactRoot }
