import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router"
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import MainLayout from '../layouts/MainLayout'

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

  return <RouterProvider router={router}>

  </RouterProvider>
}

export default AppRoutes