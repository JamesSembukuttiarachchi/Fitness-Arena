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

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Tracker /> : <Navigate to="/login" />}
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

            <Route
              path="/viewUsers"
              element={!user ? <ViewUsers /> : <Navigate to="/viewUsers" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
