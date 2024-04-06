import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { Home } from "../pages/Home";

const router = createBrowserRouter([
    {
      path: "/",     //root path
      element: <Main />,
      children: [
        {
            path:"/",
            element:<Home />
        }
      ]
    },
  ]);

  export default router;