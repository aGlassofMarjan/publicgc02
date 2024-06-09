import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Toastify from "toastify-js"

export default function Login({ url }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault()
        try {
            let { data } = await axios.post(`${url}/login`, {email, password})
            console.log(data)
            // console.log(data.access_token)
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem('user', JSON.stringify(data))
            console.log(localStorage)
            Toastify({
                text: "Success Login",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#fff",
                    fontWeight: "normal"
                }
            }).showToast();

            navigate('/')
        } catch (error) {
            console.log(error)
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#fff",
                    fontWeight: "normal"
                }
            }).showToast();
        }
    }

    return(
        <>
            <div className="h-screen flex justify-center items-center" style={{ backgroundColor: '#FEF9EC' }}>
                <div>
                    <img
                        style={{ height: '38vh' }}
                        src="https://www.mcdonalds.co.id/assets/img/menu/menu-pages_.png"
                        alt=""
                    />
                </div>
                <div className="block justify-center items-center gap-12">
                    <div className="mb-5">
                        <h1 className="text-4xl font-bold" style={{ color: '#333333' }}>McDonalds</h1>
                        <label className="text-lg text-gray-500">
                            Sistem Manajemen Konten
                        </label>
                        {/* <p className="text-sm text-center text-gray-500 mt-8">Masuk untuk memulai</p> */}
                    </div>
                    <div className="w-72">
                        <div>
                            <label htmlFor="username" className="block text-sm text-gray-500">Email</label>
                            <input
                                type="text"
                                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-40"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label htmlFor="password" className="block text-sm text-gray-500">Password</label>
                            <input
                                type="password"
                                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-40"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button style={{ backgroundColor: '#db0007' }}
                            onClick={handleLogin}
                            className="w-full mt-6 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                            Masuk
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}