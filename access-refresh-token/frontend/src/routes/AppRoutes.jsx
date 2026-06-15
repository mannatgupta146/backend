import React from 'react'
import { createBrowserRouter, ReactProvider } from "react-router"
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'

const AppRoutes = () => {

    let router = createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                {
                    path: "",
                    element: <Login />                
                },

                {
                    path: "/register",
                    element: <Register />                
                }
            ]
        },

        {
            path: "/home",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <Home />
                }
            ]
        }
    ])

  return <ReactProvider router={router}>

  </ReactProvider>
}

export default AppRoutes