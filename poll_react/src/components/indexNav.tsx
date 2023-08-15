import { FC } from "react"
import { FcFaq } from "react-icons/fc";
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


const HomeNav: FC= () => {
    return (   
        // Navigation parent element
        // Nav
        <nav className="w-full bg-white sticky top-0 z-10">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Link to='/poll'><h1 className="flex items-center p-3 text-2xl font-bold cursor-pointer">QuestionPoll<FcFaq className="ml-1" /></h1></Link>
                <ul className="flex gap-5 p-5 font-normal">
                   <li className="flex items-center cursor-pointer"><AiOutlineUser className="mr-1"/></li>
                   <FiLogOut className="ml-10"/>
                </ul>
            </div>
        </nav>
    );
}

export default HomeNav;