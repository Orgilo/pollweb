import { FC } from "react"
import { useState } from "react";
import { Link } from "react-router-dom";


const Recover: FC =() => {
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Replace this with your actual authentication logic
        console.log('password:', password);
      };
      
    return (
        <div className="bg-indigo-100 flex justify-center items-center h-screen">
        <form onSubmit={handleLogin} className="bg-gray-50 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-[350px]">
          <h1 className="text-4xl mb-2 text-center font-medium text-slate-700 m-8 pb-6">Сэргээх</h1>
          
          <div className="mb-2">
            <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="password">
              {/* Нууц үг: */}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline "
              placeholder="6 оронтой код оруулна уу"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
          </div>
          <span className="text-right text-indigo-500 cursor-pointer">Код дахин илгээх</span>
          <Link to='/login'><button
            type="submit"
            className="bg-indigo-500 hover:bg-[#ff6a6a] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full mt-3"
            >
            Үргэлжлүүлэх
          </button></Link>
            
        </form>
      </div>
    )
}

export default Recover