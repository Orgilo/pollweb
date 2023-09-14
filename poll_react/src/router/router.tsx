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
import Polladmin, { pollAction, pollloader } from "../dashbourd/pages/admin";
import { ProtectedRoute } from "../dashbourd/pages/ProtectedRoute";
import Survey from "../pages/survey";
import Polldetials, { PollAction, Pollloader } from "../dashbourd/pages/polldetials";
import QuestionsPage from "../pages/QuestionsPage";
import Нүүр from "../pages/home";
import Useradmin from "../dashbourd/pages/adminusers";







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
                // Pass Recover Page
                path: '/Нүүр',
                element: (
                  <ProtectedRoute>
                <Нүүр/>
                </ProtectedRoute>
                )
              },
              {
                // Pass Recover Page
                path: '/Useradmin',
                element: (
                  <ProtectedRoute>
                <Useradmin data={[]}/>
                </ProtectedRoute>
                )
              },
              {
                //  Forget password page
                path: '/forgetpassword',
                element: <ForgetPassword/>
              },
             
              {
                path: '/QuestionForm',
                element: (
                  <ProtectedRoute>
                  <QuestionForm poll_id={null} closeModal={() => {}} selectedPoll={null} />
                  </ProtectedRoute>
                )
              },
              {
                path: '/Polladmin',
                loader: pollloader,
                action: pollAction,
                element: (
                  <ProtectedRoute>
                    <Polladmin data={[]}/>
                  </ProtectedRoute>
                )
              },
              {
                path: '/survey',
                element: <Survey/>
              },
              {
                path: 'Polldetials/:pollId',
                loader: Pollloader,
                action: PollAction,
                element: (
                  <ProtectedRoute>
                   <Polldetials/>
                   </ProtectedRoute>
                   )
              },
              {
                path: 'QuestionsPage/:pollId',
                element: <QuestionsPage/>
              }
        ],
    },
])