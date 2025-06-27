import {
  createBrowserRouter,
  
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";
import AuthLayout from "../Pages/AuthLayout/AuthLayout";
import Login from "../Pages/AuthLayout/Login";
import Register from "../Pages/AuthLayout/Register";
import Coverage from "../Coverage.jsx/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
   Component:RootLayout,
   children:[
    {
        index:true, Component:Home,
    },
    {
        path:'about',Component:About,
    },
    {
      path:'coverage', loader: () => fetch('./serviceCenter.json'), Component:Coverage,
    }
   ]
  },
  {
    path:'authLayout',
    Component:AuthLayout,
    children:[
      {path:'login', Component:Login,},
      {path:'register',Component:Register,},
      {path:'forgot',},
    ]
  }
]);