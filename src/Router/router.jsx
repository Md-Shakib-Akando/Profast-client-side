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
import PrivateRoute from "../PrivateRoute";
import SendParcel from "../Pages/SendParcel";
import DashBoardLayout from "../Pages/Dashboard/DashBoardLayout";
import MyParcels from "../Components/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true, Component: Home,
      },
      {
        path: 'about', Component: About,
      },
      {
        path: 'coverage', loader: () => fetch('./serviceCenters.json'), Component: Coverage,
      },
      {
        path: 'sendParcel',
        loader: () => fetch('/serviceCenters.json').then(res => res.json()),
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login, },
      { path: 'register', Component: Register, },
      { path: 'forgot', },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        path: 'myParcel',
        Component: MyParcels,
      },
      {
        path: 'payment/:id',
        Component: Payment,
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory,
      }
    ]
  }
]);