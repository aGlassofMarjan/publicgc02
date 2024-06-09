import FormCuisine from "../components/FormCuisine"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js"


export default function EditCuisine({url}){
    const [cuisine, setCuisine] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()

    async function fetchCuisines(){
        try {
            const {data} = await axios.get(`${url}/cuisines`)

            setCuisine(data.cuisine)
        } catch (error) {
            console.log(error)
            Toastify({
                text: error.response.data.message,
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
        }
    }

    useEffect(() => {
        fetchCuisines()
    }, [])

    async function handleSubmit(e, name, description, price, imgUrl, categoryId){
        e.preventDefault()
        try {
            const edit = {name, description, price: +price, imgUrl, categoryId: +categoryId}

            await axios.put(`${url}/cuisine/${id}`, edit, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: "Success edit product",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();

            navigate('/')
        } catch (error) {
            console.log(error)
            Toastify({
                text: error.response.data.message,
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
        }
    }

    return (
        <>
            <FormCuisine url={url} handleSubmit={handleSubmit} cuisine={cuisine} nameProp="Edit Cuisine"></FormCuisine>
        </>
    )
}