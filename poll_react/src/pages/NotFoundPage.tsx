import { FC } from "react"
import Error from "../image/Error.svg"

const NotFoundPage: FC =() => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[100px]">
                <img src={Error} alt="Not Found" />
                
            </div>
            <h1 className="text-4xl font-bold ml-5"> Олдсонгүй</h1>
        </div>
    )
}

export default NotFoundPage