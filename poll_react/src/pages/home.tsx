import { FC } from "react"

import surveylogo from "../image/surveylogo.svg"
import survey from "../image/survey.svg"
import note from "../image/note.svg"
import graph from "../image/graph.svg"
import user from "../image/user.svg"
import { FcFaq } from "react-icons/fc";
import { Link } from "react-router-dom";
import Navbarafter from "../components/navbar2";

const Нүүр: FC =() => {
    return (
        <div>
            <Navbarafter/>
            <div className="h-96 relative text-white bg-gradient-to-r from-emerald-800 to-emerald-600">
                <div className="absolute top-24 left-44">
                    <Link to='/'><h1 className="text-7xl font-bold">Санал асуулгa</h1></Link>
                    <p className="mt-4 ml-5 text-2xl">
                    Өөрийн санал асуулга, судалгааны <b>формыг</b> үүсгэ.
                    </p>
                    <button type="button" className="mt-10 ml-5 px-10 py-2 bg-orange-500 rounded-md hover:bg-orange-600 font-semibold"><Link to='/survey'>Санал асуулга үүсгэх</Link></button>
                </div>
                <div className="z-0 absolute right-56 -bottom-48 ">
                    <img src={surveylogo} alt="survey" className="w-96"/>
                    </div>
            </div>
            <div className="bg-white w-full h-80 z-10 bg-gradient-to-r from-white to-slate-200">
                <div className="flex flex-col text-2xl space-y-4 absolute left-44 bottom-8 font-semibold text-slate-600">
                    <p className="flex items-center"><span className="text-4xl font-extrabold text-emerald-500 mr-4">01</span> Хэн ч ашиглах боломжтой</p>
                    <p className="flex items-center"><span className="text-4xl font-extrabold text-emerald-500 mr-4">02</span> Маш хялбар хэрэглэгчийн интерфейстэй</p>
                    <p className="flex items-center"><span className="text-4xl font-extrabold text-emerald-500 mr-4">03</span> Open source</p>
                </div>
            </div>
            <div className=" h-[550px] w-full flex justify-center items-center">
                <div className="w-[400px] absolute right-64 text-slate-600 mt-44">
                    <h2 className="text-4xl font-semibold pb-16 ">Хэрхэн <span className="text-emerald-500 font-bold">Полл</span> үүсгэх вэ?</h2>
                    <p className="mb-6 flex items-center font-semibold"><span className="text-6xl font-extrabold text-emerald-500 mr-6 float-left ">1</span>Эхлээд та Бүртгүүлэн орно. Бүртгэлтэй бол та нэвтэрч ороорой. </p>
                    <p className="flex items-center mb-7 font-semibold"><span className="text-6xl font-extrabold text-emerald-500 mr-4">2</span>Бүртгэл үүсгэсний дараа та нэвтэрч орно.</p> 
                    <p className="mb-5 float-left font-semibold"><span className="text-6xl font-extrabold text-emerald-500 mr-4 float-left">3</span>Ингэсний дараа та Асуулт үүсгэх "Poll"-ийн хэсэгрүү орох бөгөөд энэ нь таныг асуулт үүсгэх боломжтой болгосныг илтгэнэ.</p>
                </div>
                <img src={survey} alt="survey" className="absolute left-80 mt-40"/>
            </div>
            <div className="h-[600px] w-full flex justify-center items-center">
            
                <div className="h-80 w-full rounded-3xl flex justify-around relative">
                    <img src={user} alt="user"/>
                    <img src={note} alt="notebook" />
                    <img src={graph} alt="graph" />
                </div>
            </div>
            <div className="w-full bg-slate-100 flex justify-between items-center">
            <h1 className="flex items-center p-8 pl-20 text-2xl font-bold cursor-pointer ">QuestionPoll<FcFaq className="ml-1" /></h1>
            <p className="text-slate-400"> &copy;Copyright 2023</p>
            <p className="text-slate-100">..................................................................................</p>
            </div>
        </div>
        
    );
}


export default Нүүр