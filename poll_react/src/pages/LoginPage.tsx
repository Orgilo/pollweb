import { FC, useState } from "react"
import "../styles/Login.css"
import facebooklogo from "../image/facebooklogo-com.svg"
import googlelogo from "../image/googlelogo.svg"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../services/auth.service";
import { setTokenToLocalStorage } from "../helpers/local.strorage.helper";
import { useAppDispatch } from "../store/hook";
import { login } from "../store/user/userSlice";

const LoginPage: FC =() => {
        const [username, setUsername] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const navigate = useNavigate();
        const dispatch = useAppDispatch();
      
         const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
             try{       
               e.preventDefault()
               const data = await AuthService.login({username,password})
                 if(data){
                  setTokenToLocalStorage('token', data.token) 
                  dispatch(login(data))
                  toast.success('Амжилттай нэвтэрлээ.')
                  navigate("/");
                 }
             } catch (err:any){
              const error = err.response?.data.message;
             toast.error(error);
              
             }
         }


        return (
          <div className="bg-indigo-100 flex justify-center items-center h-screen">
            <form onSubmit={loginHandler} className="bg-gray-50 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4 w-[350px]">
              <h1 className="text-4xl mb-2 text-center font-medium text-slate-700 m-8 pb-6">Нэвтрэх</h1>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="username">
                  {/* Хэрэглэгчийн нэр: */}
                </label>  
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none border-b-2 border-slate-300 w-full py-2 px-3 bg-slate-50 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Нэр"
                />
              </div>
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
                  placeholder="Нууц үг"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                {/* checkbox */}
                <div className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" id="mycheck"/>
                    <label htmlFor="mycheck">Намайг сана</label>
                </div>
                <Link to='/forgetpassword'><span className="text-indigo-600 hover:text-[#ff6a6a] cursor-pointer">Нууц үг мартсан ?</span></Link>
              </div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-[#ff6a6a] text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full mt-3"
                >
                Нэвтрэх
              </button>
                <div className="border-solid border-2 border-gray-200 mt-5 rounded-[50%] relative"><p className="absolute -top-3 right-[115px] bg-slate-50 px-1 text-slate-600">эсвэл</p>
                </div>
                {/* Google, fb auth */}
                <div className="flex-col">
                  <img src={facebooklogo} alt="facebooklogo" className="m-auto my-5 border-2 border-slate-300 py-2 w-full h-10 rounded-md cursor-pointer hover:bg-blue-400 hover:border-blue-400 "/>
                  <img src={googlelogo} alt="googlelogo" className="m-auto my-5  border-2 border-slate-300 py-2 w-full h-10 rounded-md cursor-pointer hover:bg-slate-300"/>
                </div>
              <p className="text-sm mt-3 text-center text-slate-500 font-medium">Хэрвээ та бүртгэлгүй бол <Link to='/register' className="text-indigo-600 hover:text-[#ff6a6a]">Энд дар</Link></p>
            </form>
          </div>
        );
      };


export default LoginPage