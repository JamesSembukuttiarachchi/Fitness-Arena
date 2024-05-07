import {createBrowserRouter} from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/Home.jsx';
import Menu from '../pages/Menu.jsx';
import CartPage from '../pages/CartPage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children:[
            { path: '/', element: <Home /> },
            {path: "/product", element: <Menu/>},
            {path:"/cart-page", element: <CartPage/>},

        ]
            
    },
    

]);

export default router;
