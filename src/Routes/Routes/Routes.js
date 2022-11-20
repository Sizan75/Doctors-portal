import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Appointment from "../../Pages/Appoinment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


export const router= createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/appointment',
                element: <Appointment></Appointment>
            }
            ,
            {
                path:'/login',
                element: <Login></Login>
            }
            ,
            {
                path:'/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    }
])