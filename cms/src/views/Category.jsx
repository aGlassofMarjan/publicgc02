import { useEffect, useState } from "react"
import axios from 'axios'
import Toastify from "toastify-js"
import loadRoll from '../assets/circleRoll.svg'

export default function Category({url}){
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    let [length, setLength] = useState(0)

    async function fetchCategory(){
        try {
            setLoading(true)
            const {data} = await axios.get(`${url}/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            // console.log(data)

            setLength(data.category.length)

            // console.log(data.cuisine[0].Category.name) //

            // console.log(data.cuisine.length())
            setCategory(data.category)
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

    useEffect(() => {
        fetchCategory()
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
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Categories</h2>
                        <span className="px-3 py-1 text-xs text-emerald-600 bg-emerald-100 rounded-full">{length} Data Recorded</span>
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
                                        <span>ID</span>
                                    </div>
                                    </th>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <div className="flex items-center gap-x-3">
                                        <span>Name</span>
                                    </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 h-64">
                                    {category.map((cat) => (
                                        <tr key={cat.id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                <div className="inline-flex items-center w-32">
                                                    <div className="flex items-center">
                                                        <h2 className="font-medium text-gray-800">{cat.id}</h2>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                                <div className="inline-flex items-center">
                                                    <div className="flex items-center">
                                                        <h2 className="font-medium text-gray-800">{cat.name}</h2>
                                                    </div>
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