import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Sidebar(){
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }



    return (
        <>
        <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
            <a href="#">
                <img
                className="w-auto h-7"
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/McDonald%27s_square_2020.svg"
                alt=""
                />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav className="-mx-3 space-y-6">
                <div className="space-y-3">
                    <label className="px-3 text-xs text-gray-500 uppercase">
                    Views
                    </label>
                    <Link to="/"
                    className="flex items-center px-3 py-2 text-violet-600 hover:text-white hover:bg-violet-500 transition-colors duration-300 transform rounded-lg"
                    href="#"
                    >
                        <span className="mx-2">Cuisines</span>
                        
                    </Link>
                    <Link to="/category"
                        className="flex items-center px-3 py-2 text-emerald-600 hover:text-white hover:bg-emerald-600 transition-colors duration-300 transform rounded-lg"
                        href="#"
                        >
                        <p className="mx-2">Categories</p>
                        
                    </Link>
                </div>
                <div className="space-y-3">
                    <label className="px-3 text-xs text-gray-500 uppercase">
                    Actions
                    </label>
                    <Link to="/addcuisine"
                        className="flex items-center px-3 py-2 text-violet-600 hover:text-white hover:bg-violet-600 transition-colors duration-300 transform rounded-lg"
                        href="#"
                        >
                        <span className="mx-2">Add Cuisine</span>
                    </Link>
                    <Link to="/adduser"
                        className="flex items-center px-3 py-2 text-orange-600 hover:text-white hover:bg-orange-600 transition-colors duration-300 transform rounded-lg"
                        href="#"
                        >
                        <p className="mx-2">Add User</p>
                    </Link>
                    <a
                        className="flex items-center px-3 py-2 text-red-600 hover:text-white hover:bg-red-600 transition-colors duration-300 transform rounded-lg"
                        onClick={handleLogout}
                        >
                        <span className="mx-2">Log out</span>
                    </a>
                </div>
                </nav>
            </div>
        </aside>

        </>
    )
}