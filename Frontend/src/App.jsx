import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route path="/" element={<HomeTesting/>} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/viewUsers" element={<ViewUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userprofile" element={<UserProfile/>} />
            <Route path="/notifications" element={<Notifications/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
