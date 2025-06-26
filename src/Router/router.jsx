import {
  createBrowserRouter,
  
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import About from "../Pages/About";

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
    }
   ]
  },
]);