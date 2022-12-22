import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Client from './pages/Client';
import Cart from './components/Cart';
import Receipts from './pages/Receipts';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "/client",
    element:<Client/>,
  },
  {
    path: "/receipts",
    element:<Receipts/>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
