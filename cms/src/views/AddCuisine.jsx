import { useNavigate } from "react-router-dom"
import Toastify from "toastify-js"
import FormCuisine from "../components/FormCuisine"
import axios from "axios"

export default function AddCuisine({url}) {
    const navigate = useNavigate()
    async function handleSubmit(e, name, description, price, imgUrl, categoryId){
            e.preventDefault()
        try {
            const add = {name, description, price: +price, imgUrl, categoryId: +categoryId}
            
            const {data} = await axios.post(`${url}/cuisine`, add, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            console.log(data)

            Toastify({
                text: "Success add new data",
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
            <FormCuisine url={url} handleSubmit={handleSubmit} nameProp="Add Cuisine"></FormCuisine>
        </>
    )
    
}