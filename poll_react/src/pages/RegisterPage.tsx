import { FC, useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate  } from "react-router-dom";

import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify"


const RegisterPage: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstname] = useState<string>('');
  const [lastName, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
 const navigate = useNavigate();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ username, password, firstName, lastName, email });
      if (data) {
        toast.success('Бүртгэл амжилттай.');
        navigate("/login");
      
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error);
    }
  };
  


  return (
    <div className="bg-indigo-100 flex justify-center items-center h-screen">
      <form onSubmit={registrationHandler} className="bg-gray-50 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <h1 className="text-4xl mb-2 text-center font-medium m-8 pb-8">Бүртгүүлэх</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="lastname">
              
            </label>  
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Овог"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="firstname">
              
            </label>  
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Нэр"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="email">
            
          </label>  
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline my-4"
            placeholder="И-Мэйл"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline my-4"
            placeholder="Нэрээ оруулна уу"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline my-4"
            placeholder="Нууц үгээ оруулна уу"
          />
        </div>
        
        <p className="pt-1 pb-2 float-right text-gray-500 text-sm">Та бүртгүүлэх бол <Link to="/login" className="text-indigo-500 hover:text-[#ff6a6a]">Энд дар</Link></p>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-[#ff6a6a] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full mt-3"
        >
          Бүртгүүлэх
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
