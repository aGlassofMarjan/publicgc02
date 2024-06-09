import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import loadSvg from "../assets/circleRoll.svg"
import axios from "axios"
import Toastify from 'toastify-js'

export default function Detail({ url }){
    const [cuisine, setCuisine] = useState([])
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    // console.log(cuisine, ">>>>>>>>>>>>>>>>>>>>>>>>")
    
    async function fetchCuisines(){
        try {
            setLoading(true)
            const {data} = await axios.get(`${url}/pub/${id}`)
            // console.log(data.data[0])
            setCuisine(data.data[0])
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
                    fontWeight: "bold"
                }
            }).showToast();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCuisines()
    }, [])

    return (
        <>
            <div className="flex justify-center items-center w-screen h-auto py-28" style={{ backgroundColor: '#FEF9EC' }}>
                {loading ? (
                        <img src={loadSvg} alt=""/>
                ):(
                    <div className="flex">
                        <div className="h-1/3">
                            <Link to="/">
                                <div className="items-center flex gap-2 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                    </svg>
                                    <p>MENU</p>
                                </div>
                            </Link>
                            <img className="h-80" src={cuisine.imgUrl} alt="" />
                        </div>
                        <div className="h-1/3 w-96">
                            <h1 className="text-4xl font-bold" style={{ color: '#333333' }}>{cuisine.name}</h1>
                            <h2 className="text-xl py-5 text-gray-500">{cuisine.price}</h2>
                            <p className="text-lg" style={{ color: '#666666' }}>{cuisine.description}</p>
                            <a href="https://www.mcdelivery.co.id/id/" target="_blank" rel="noopener noreferrer">
                            <button className="flex mt-5 text-white py-3 font-bold rounded-md bg-red-600 hover:bg-red-700 px-8">
                                <img className="h-8 hover:scale-125 hover:duration-300" src={cuisine.imgUrl}  alt="" />
                                Pesan Sekarang
                            </button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-screen bg-gray-100 h-64 justify-center items-center">
                <div className="flex items-center">
                    <div className="text-4xl font-bold" style={{ color: '#333333' }}>
                        <p>Makin Hemat & Praktis <br /> dengan Aplikasi McDonald’s. <br /> Download Sekarang!</p> 
                        <div className="flex gap-5 mt-5">
                            <img className="w-32" src="https://www.mcdonalds.co.id/assets/img/common/button_appstore.png" alt="Download on App Store!"/>
                            <img className="w-32" src="https://www.mcdonalds.co.id/assets/img/common/button_playstore.png" alt="Download on Play Store!"/>
                        </div>
                    </div>
                    <div className="">
                        <img className="h-64" src="https://d2vuyvo9qdtgo9.cloudfront.net/app-section-footers/April2024/OoB6ngCmJ9f8q3CHEKbv.png" alt="Download Now!"/>
                    </div>
                </div>
            </div>
            <div className="flex w-screen bg-white h-64 justify-around gap-36 items-center">
                <div className="block">
                    <div className="text-xl font-extrabold" style={{ color: '#333333' }}>
                        <p className="mb-5">McDonald’s</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-64 gap-y-5 text-xl" >
                        <p className="hover:text-yellow-500">Hubungi Kami</p>
                        <p className="hover:text-yellow-500">Tentang Kami</p>
                        <p className="hover:text-yellow-500">Newsroom</p>
                        <p className="hover:text-yellow-500">Karier</p>
                        <p className="hover:text-yellow-500">Layanan</p>
                        <p className="hover:text-yellow-500">Sertifikasi & Jaminan Kualitas</p>
                        <p className="hover:text-yellow-500">CSR</p>
                        <p className="hover:text-yellow-500">Aplikasi McDonald’s</p>
                    </div>
                </div>
            </div>
            <footer className="flex w-screen bg-gray-300 justify-between items-center p-5 pl-64 pr-64 text-gray-600">
                <p >© 2024 McDonald’s Indonesia </p>
                <div className="flex gap-5">
                    <p className="">Syarat & Ketentuan</p>
                    <p>Kebijakan Privasi</p>
                </div>
                
            </footer>
        </>
    )
}