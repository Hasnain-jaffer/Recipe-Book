import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home.jsx'
import Meal from './Meal.jsx'
import Recipe from './Recipe.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import Category from './components/Category.jsx'
import Applayout from './components/Applayout/Applayout.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'


const router = createBrowserRouter([
   {
    path:"/",
    element:<Applayout />,
    errorElement:<ErrorPage />,
    children:[
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/meal",
    element: <Meal />,
  },
  {
    path: "/recipe",
    element: <Recipe />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/recipe/:mealid",
  element: <Recipe />,

   }
    ]
  
  }
])

function App() {

  return (
    <>   
      <RouterProvider router={router}/>
    </>
  )
}

export default App
