import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Tracker from "./pages/Tracker";
import Navbar from "./components/Navbar";
import ViewUsers from "./pages/ViewUser";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile";
import Notifications from "./components/Notifications";
import HomeTesting from "./pages/HomeTesting";
import Home from "./pages/Home.jsx";
import "./App.css";
import Operation from "./pages/Operation.jsx";
import ViewPackage from "./pages/ViewPackage.jsx";
import CreatePackage from "./pages/CreatePackage.jsx";
import Approval from "./components/Admin/Approval.jsx";
import Testing from "./pages/Testing.jsx";

function App() {
  const { user } = useAuthContext();

  // Define a function to check if the user has the admin role
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                isUser ? (
                  <Tracker />
                ) : isAdmin ? (
                  <ViewUsers />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/userprofile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/homes" element={<Home />} />
        <Route path="/test" element={<Operation />} />
        <Route path="view-packages" element={<ViewPackage />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path="/appr" element={<Testing/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}



export default App;
