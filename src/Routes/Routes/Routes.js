import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import Main from "../../layout/Main";
import Appointment from "../../Pages/Appoinment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/LogIn/LogIn";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoutes/AdminRoutes";
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
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/managedoctors',
                element: <AdminRoute><ManageDoctors></ManageDoctors></AdminRoute>
            },
        ]
    }
])