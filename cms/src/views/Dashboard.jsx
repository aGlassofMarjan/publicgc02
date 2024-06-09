import { useEffect, useState } from "react"
import axios from 'axios'
import Toastify from "toastify-js"
import loadRoll from '../assets/circleRoll.svg'
import { useNavigate } from "react-router-dom"

export default function Dashboard({ url }){
    const [cuisines, setCuisines] = useState([])
    const [loading, setLoading] = useState(false)
    let [length, setLength] = useState(0)
    const navigate = useNavigate()
    // console.log(cuisine)
    // const [search, setSearch] = useState('')

    async function fetchCuisines(){
        try {
            setLoading(true)
            const {data} = await axios.get(`${url}/cuisine`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setLength(data.cuisine.length)

            // console.log(data.cuisine[0].Category.name) //

            // console.log(data.cuisine.length())
            setCuisines(data.cuisine)
        } catch (error) {
            // console.log(error.response.data.message)
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
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id){
        try {
            await axios.delete(`${url}/cuisine/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            Toastify({
                text: "Success delete",
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

            fetchCuisines()
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



    function handleEdit(id){
        navigate(`/editcuisine/${id}`)
    }

    useEffect(() => {
        fetchCuisines()
    }, [])

    return(
        <>
            {loading ? (
                <div className="flex justify-center items-center w-screen h-screen">
                    <img src={loadRoll} alt="" />
                </div>
            ) : (
                <section className="container my-12 px-4 mx-auto">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Cuisines</h2>
                        <span className="px-3 py-1 text-xs text-violet-600 bg-violet-100 rounded-full">{length} Data Recorded</span>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-y border border-gray-200 md:rounded-lg" style={{height: "75vh"}}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <div className="flex items-center gap-x-3">
                                        <span>Name</span>
                                    </div>
                                    </th>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <div className="flex items-center gap-x-3">
                                        <span>Author</span>
                                    </div>
                                    </th>
                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <button className="flex items-center gap-x-2">
                                        <span>Images</span>
                                    </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <button className="flex items-center gap-x-2">
                                        <span>Description</span>
                                    </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    Price
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    Category
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 h-64">
                                        {cuisines.map((food) => (
                                            <tr key={food.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                    <div className="inline-flex items-center w-32">
                                                        <div className="flex items-center">
                                                            <h2 className="font-medium text-gray-800">{food.name}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                    <div className="inline-flex items-center">
                                                        <div className="flex items-center">
                                                            <h2 className="font-medium text-gray-800">{food.User.username}</h2>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-1">
                                                        <img className="object-cover w-24 h-24 rounded-full" src={food.imgUrl} alt="" />
                                                    </div>
                                                </td>
                                                <td className="w-56 px-4 py-4 text-sm text-gray-500">
                                                    <p className="block">{food.description}</p>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{food.price}</td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap text-gray-500">{food.Category.name}</td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    {/* buttons */}
                                                    <button
                                                        className="text-gray-500 transition-colors duration-200 hover:text-emerald-500 focus:outline-none">
                                                            <div className="hover:text-emerald-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hover:text-emerald-500 w-6 h-6 text-gray-500 dark:text-gray-400">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                                </svg>
                                                            </div>
                                                    </button>
                                                    <button onClick={() => handleDelete(food.id)}
                                                        className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>

                                                    <button onClick={() => handleEdit(food.id)}
                                                        className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}