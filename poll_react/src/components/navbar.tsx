import { FC } from "react"
import { FcFaq } from "react-icons/fc";
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlineHome } from "react-icons/ai"
import { Link } from "react-router-dom";


const Navbar: FC= () => {
    return (   
        <nav className="w-full bg-white sticky top-0 z-10">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Link to='/'><h1 className="flex items-center p-3 text-2xl font-bold cursor-pointer">QuestionPoll<FcFaq className="ml-1" /></h1></Link>
                <ul className="flex gap-5 p-5 font-normal">
                   <Link to='/'><li className="flex items-center cursor-pointer"><AiOutlineHome className="mr-1"/>Нүүр</li></Link>
                   <Link to='/login'> <li className="flex items-center cursor-pointer"><AiOutlineUser className="mr-1"/>Нэвтрэх</li></Link>
                   {/* <li className="px-4 py-2 bg-emerald-400 rounded-lg cursor-pointer hover:bg-emerald-500 ">Бүртгүүлэх</li>  */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;