// src/App.tsx

import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { getTokenFromLocalStorage } from './helpers/local.strorage.helper';
import { AuthService } from './services/auth.service';
import { useAppDispatch } from './store/hook';
import { login, logout } from './store/user/userSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
        const token = getTokenFromLocalStorage()

        try {
          if(token) {
            const data = await AuthService.getProfile()
            if(data){
              dispatch(login(data))
            } else {
              dispatch(logout)
            }

          }
        } catch (error) {
          console.log(error)
        }

  }
  useEffect(() =>{
    checkAuth()
  }, [])
  
  return <RouterProvider router={router}/>
      
}

export default App;
