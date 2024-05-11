import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home.jsx";
import Menu from "../pages/Menu.jsx";
import CartPage from "../pages/CartPage.jsx";
import AddProduct from "../pages/AddProduct.jsx";
import ManageProducts from "../pages/ManageProducts.jsx";
import UpdateProduct from "../pages/UpdateProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Menu /> },
      { path: "/cart-page", element: <CartPage /> },
    ],
  },
  { path: "/addproduct", element: <AddProduct /> },
  { path: "/manageproduct", element: <ManageProducts /> },
  { path: "/updateproduct/:id", element: <UpdateProduct /> },
]);

export default router;
