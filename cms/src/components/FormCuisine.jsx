import { useEffect, useState } from "react"
import axios from "axios"
import Toastify from 'toastify-js'

export default function FormCuisine({url, cuisine, nameProp, handleSubmit}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState([])
    // const [userId, setUserId] = useState(0)
    
    useEffect(() => {
        if (cuisine) {
            setName(cuisine.name)
            setDescription(cuisine.description)
            setPrice(cuisine.price)
            setImgUrl(cuisine.imgUrl)
            setCategoryId(cuisine.categoryId)
        }
    }, [cuisine])

    async function fetchCategories(){
        try {
            const {data} = await axios.get(`${url}/category`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            // console.log(data.category)

            setCategories(data.category)
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
        fetchCategories()
    }, [])

    return (
        <div className="flex justify-center items-center w-screen">
            
                <section className="p-6 m-auto w-1/3 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize">{nameProp}</h2>

                    <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, categoryId)}>
                        <div className="grid grid-cols-1 gap-6 mt-4">
                            <div>
                                <label className="text-gray-700" htmlFor="username">Name</label>
                                <input onChange={(e) => setName(e.target.value)} value={name} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="emailAddress">Description</label>
                                <input onChange={(e) => setDescription(e.target.value)} value={description} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="password">Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} value={price} id="password" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="passwordConfirmation">Image</label>
                                <input onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} id="passwordConfirmation" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="block mb-2">
                                    <span className="text-base font-medium text-gray-700">Category</span>
                                </label>
                                <select
                                    className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    name="category"
                                    id=""
                                >
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id} className="text-gray-700">
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-violet-700 rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600">{nameProp}</button>
                        </div>
                    </form>
                </section>
            
            {/* <form onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, categoryId)}>
                <div>
                    <label htmlFor="">Name</label>
                    <input onChange={(e) => setName(e.target.value)} 
                        type="text" name="" id="" value={name}/>
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <input onChange={(e) => setDescription(e.target.value)} 
                        type="text" name="" id="" value={description}/>
                </div>
                <div>
                    <label htmlFor="">Price</label>
                    <input onChange={(e) => setPrice(e.target.value)} 
                        type="number" name="" id="" value={price}/>
                </div>
                <div>
                    <label htmlFor="">Image</label>
                    <input onChange={(e) => setImgUrl(e.target.value)}
                        type="text" name="" id="" value={imgUrl}/>
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Category</span>
                    </label>
                    <select
                        className="w-full input input-bordered input-primary"
                        onChange={(e) => setCategoryId(e.target.value)}
                        name="category"
                        id=""
                    >
                        {categories.map(c => {
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button type="submit" className="w-full btn btn-accent mt-10">{nameProp}</button>
                </div>
            </form> */}
        </div>
    )
}