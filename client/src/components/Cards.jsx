import { useNavigate } from "react-router-dom"


export default function Cards({food, url}){
    const navigate = useNavigate()

    function navigateDetail(id){
        navigate(`/detail/${id}`)
    }

    return(
        <>
            <div onClick={() => navigateDetail(food.id)} className="w-64 h-72 text-center justify-center items-center hover:duration-300 hover:shadow-2xl p-5 rounded-lg">
                <img
                    className="w-56 object-cover hover:scale-125 hover:duration-500 hover:ease-in-out"
                    src={food.imgUrl}
                    alt=""
                />
                <p className="bottom-0 pt-5 text-xl font-bold" style={{ color: '#333333' }}>
                    {food.name}
                </p>
            </div>
        </>
    )
}