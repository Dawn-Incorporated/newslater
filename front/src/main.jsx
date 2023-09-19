import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root from './routes/Root.jsx'
import ErrorPage from "../error-page.jsx";
import Email from "./routes/Email.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        /*children: [
            {
                path: "child",
                element: <Child/>,
            },
        ],*/
    },
    {
        path: "/email",
        element: <Email />,
        errorElement: <ErrorPage/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
