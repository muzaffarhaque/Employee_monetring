import React from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import {Dashboard, EmployeeDetail, Employees, Home, Rotes} from './pages';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import './App.scss'
import { NotFound } from "./components";
import ThemeProvider from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (false) {
        return <Navigate to="/login" />;
    }
    return children;
};


function App() {
    const router = createBrowserRouter([
        // {
        //     path: "/",
        //     element: <Home/>
        // },
        {
            path: "/",
            element: <Rotes/>,
            errorElement:<NotFound/>,
            children:[
                {
                    path: "/",
                    element: <ProtectedRoute children={<Dashboard/>}/>
                },
                {
                    path: "/nav/:tab",
                    element: <ProtectedRoute children={<Dashboard/>}/>
                },
                {
                    path: "/employee",
                    element: <ProtectedRoute children={<Employees/>}/>
                },
                  {
                    path: "/employee/:id",
                    element: <ProtectedRoute children={<EmployeeDetail/>}/>
                },
                {
                    path: "/*",
                    element: <NotFound/>
                }
            ]
        },
    ]);
    return (
    <ThemeProvider>
      <ThemeToggle />
      <RouterProvider router={router}/>
      <ToastContainer />
    </ThemeProvider>)
}

export default App
