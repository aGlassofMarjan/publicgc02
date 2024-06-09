import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Toastify from 'toastify-js'

export default function AddUser({url}){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setphoneNumber] = useState(0)
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e, username, email, address, phoneNumber, password){
        e.preventDefault()
        try {
            const user = {username, email, address, phoneNumber, password}

            const {data} = await axios.post(`${url}/adduser`, user, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            console.log(data)

            Toastify({
                text: "Success add new user",
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

    return(
        <>
            <div className="flex justify-center items-center w-screen">
                <section className="p-6 m-auto w-1/3 bg-white rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize">Add an Account</h2>

                    <form onSubmit={(e) => handleSubmit(e, username, email, address, phoneNumber, password)}>
                        <div className="grid grid-cols-1 gap-6 mt-4">
                            <div>
                                <label className="text-gray-700" htmlFor="username">Username</label>
                                <input onChange={(e) => setUsername(e.target.value)} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="emailAddress">Email Address</label>
                                <input onChange={(e) => setEmail(e.target.value)} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                            
                            <div>
                                <label className="text-gray-700" htmlFor="phonenumber">Phone Number</label>
                                <input onChange={(e) => setphoneNumber(e.target.value)} id="phonenumber" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="password">Address</label>
                                <input onChange={(e) => setAddress(e.target.value)} id="password" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label className="text-gray-700" htmlFor="passwordConfirmation">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Save User</button>
                        </div>
                    </form>
                </section>
            </div>
            

            {/* <div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" name="" id="" />
                </div>
            </div> */}
        </>
    )
}