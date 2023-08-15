import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Homepage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PollPage from "../pages/PollPage";
import Recover from "../pages/Recover";
import ForgetPassword from "../pages/Forgetpassword";
import Layout from "../pages/Layout";
import QuestionForm from "../components/Poll";
import Polladmin, { pollloader } from "../dashbourd/pages/admin";
import { ProtectedRoute } from "../dashbourd/pages/ProtectedRoute";





export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <HomePage/>,
            },
            {
                // Login Page
                path: '/login',
                element: <LoginPage/>
              },
              {
                // Register Page
                path: '/register',
                element: <RegisterPage/>
              },
              {
                // Poll Page
                path: '/poll',
                element: <PollPage/>
              },
              {
                // Pass Recover Page
                path: '/recover',
                element: <Recover/>
              },
             
              {
                //  Forget password page
                path: '/forgetpassword',
                element: <ForgetPassword/>
              },
              {
                path: '/QuestionForm',
                element: <QuestionForm/>
              },
              {
                path: '/Polladmin',
                loader: pollloader,
                element: (
                  <ProtectedRoute>
                    <Polladmin data={[]}/>
                  </ProtectedRoute>
                )
              },
              

        ],
        
    },
])