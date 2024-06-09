import { RouterProvider } from "react-router-dom";
import router from "./routers";

export default function App() {
  // const [page, setPage] = useState('home')

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

