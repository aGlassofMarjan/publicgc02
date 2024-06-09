import { createBrowserRouter, redirect} from "react-router-dom"
import Login from '../views/Login'
import Dashboard from "../views/Dashboard"
import BaseLayout from "../views/BaseLayout"
import Toastify from "toastify-js"
import Category from "../views/Category"
import AddCuisine from "../views/AddCuisine"
import AddUser from "../views/AddUser"
import EditCuisine from "../views/EditCuisine"

const url = 'https://server.alahasleboy.online'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login url={url}></Login>,
        loader: () => {
            if (localStorage.access_token) {
                Toastify({
                    text: "You already logged in",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/')
            }

            return null
        },
    },
    {
        element: <BaseLayout/>,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please login first",
                    duration: 2000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "left",
                    stopOnFocus: true,
                    style: {
                        background: "#EF4C54",
                        color: "#17202A",
                        boxShadow: "0 5px 10px black",
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/",
                element: <Dashboard url={url}></Dashboard>
            },
            {
                path: "/category",
                element: <Category url={url}></Category>
            },
            {
                path: "/addcuisine",
                element: <AddCuisine url={url}></AddCuisine>
            },
            {
                path: "/editcuisine/:id",
                element: <EditCuisine url={url}></EditCuisine>
            },
            {
                path: "/adduser",
                element: <AddUser url={url}></AddUser>
            },
        ]
    }
])

export default router