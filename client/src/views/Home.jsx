import { useEffect, useState } from "react";
import loadCircle from '../assets/circleRoll.svg'

import axios from "axios";
import Cards from "../components/Cards";

export default function Home({ url }) {
    const [cuisine, setCuisine] = useState([])
    const [category, setCategory] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [sort, setSort] = useState('')
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false)

    // const 

    async function fetchCuisines() {
        try {
            setLoading(true)
            // console.log(search)
            // console.log(filter, `<<<<<<<`)
            // console.log(sort)
            const {data} = await axios.get(`${url}/pub?search=${search}&filter=${filter}&sort=${sort}&page[number]=${pageNumber}&page[size]=${pageSize}`)
            setCuisine(data.data)
            // console.log(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchCategory(){
        try {
            const {data} = await axios.get(`${url}/pubcategory`)
            setCategory(data.category)
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = (e) => {
        const value = e.target.value === 'Ascending' ? 'ASC' : 'DESC'
        setSort(value)
    }

    const handlePageChange = (newPageNumber) => {
        setPageNumber(newPageNumber);
    };
    
    useEffect(() => {
        fetchCuisines();
    }, [search, filter, sort, pageNumber, pageSize])

    useEffect(()=> {
        fetchCategory()
    }, [])

    return (
        <>
            <div className="h-96 mb-20" style={{ backgroundColor: '#FEF9EC' }}>
                <div className="flex justify-center gap-28">
                    <div className="mt-12">
                        <a href="https://www.mcdonalds.co.id/" target="_blank" rel="noopener noreferrer">
                            <div className="items-center mb-20 flex gap-2 hover:text-red-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 rtl:-scale-x-100"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                    />
                                </svg>
                                <p>HOME</p>
                            </div>
                        </a>
                        <h1 className="text-4xl font-bold" style={{ color: '#333333' }}>
                            Nikmati menu <br /> pilihan terbaik
                        </h1>
                    </div>
                    <div className="z-0">
                        <img
                            style={{ height: '55vh' }}
                            src="https://www.mcdonalds.co.id/assets/img/menu/menu-pages_.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="z-30 justify-center">
                <div className="block w-screen items-center p-5 mb-5" style={{ borderBottom: 'solid 1px gray' }}>
                    <div className="flex w-full justify-center h-auto gap-20">
                        <div className="w-72">
                            <label htmlFor="email" className="block text-sm text-zinc-800">
                                Search
                            </label>

                            <form action="">
                                <input
                                    type="search"
                                    name="search"
                                    className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </form>

                            <p className="mt-3 text-xs text-zinc-800">
                                Pencarian berdasarkan nama makanan.
                            </p>
                        </div>
                        <div className="w-72">
                            <label htmlFor="item-type" className="block text-sm text-gray-500 ">Categories</label>
                            <select id="item-type" onChange={(e) => {setFilter(e.target.value)}}
                            defaultValue={""}
                                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40">
                                <option className="" value="">Select All..</option>
                                {category.map(cat => {
                                    return (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="w-72">
                            <label htmlFor="item-type" className="block text-sm text-gray-500 ">Sort</label>
                            <select id="item-type" 
                                onChange={handleSort}
                                className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-40">
                                {sort}
                                <option>Ascending</option>
                                <option>Descending</option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                <div className="text-center h-24 mt-12">
                    <h1 className="text-4xl font-bold" style={{ color: '#333333' }}>
                        Menu Kami
                    </h1>
                </div>
                <div className="flex justify-center">
                    {loading ? (
                        <div>
                            <img src={loadCircle} alt="Loading.."/>
                        </div>
                    ):(
                        <div className="flex justify-center">
                            <div className="grid grid-cols-4 gap-10">
                                {cuisine.map(food => {
                                    return <Cards key={food.id} food={food} url={url} fetchCuisines={fetchCuisines}></Cards>
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex w-full justify-center mt-5">
                    <a
                        href="#"
                        className="border-2 flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber === 1}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className="border-2 hidden px-4 py-2 mx-1 text-zinc-800 transition-colors duration-300 transform bg-white rounded-md hover:border-yellow-400 sm:inline hover:text-white hover:bg-yellow-400"
                        >
                        {pageNumber}
                    </a>
                    <a
                        href="#"
                        className="border-2 flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                        onClick={() => handlePageChange(pageNumber + 1)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="flex w-screen bg-gray-100 h-64 justify-center items-center mt-5">
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
    );
}