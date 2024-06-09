import Home from "../views/Home";
// import Login from '../views/Login'
import BaseLayout from "../views/BaseLayout";
import {createBrowserRouter} from "react-router-dom";
import Detail from "../views/Detail";

const url = 'https://server.alahasleboy.online'

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <Home url={url}/>
            },
            {
                path: "/detail/:id",
                element: <Detail url={url}/>
            }
        ]
    }
]);

export default router