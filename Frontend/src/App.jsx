import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
//pages and components
import Tracker from "./pages/Tracker";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./components/UserProfile";
import Home from "./pages/Home.jsx";
import Operation from "./pages/Operation.jsx";
import ViewPackage from "./pages/ViewPackage.jsx";
import CreatePackage from "./pages/CreatePackage.jsx";
import Approval from "./components/Admin/Approval.jsx";
import Testing from "./pages/Testing.jsx";
import ViewUsers from "./components/Admin/ViewUsers.jsx";
import OpsManager from "./pages/OpsManager.jsx";
import WorkoutSelection from "./pages/WorkoutSelection";
import BioData from "./components/BioData";
import FitnessGoal from "./components/FitnessGoal";
import FinalForm from "./components/FinalForm";

function App() {
  const { user } = useAuthContext();

  // Define a function to check if the user has the admin role
  const isAdmin = user && user.role === "admin";
  const isUser = user && user.role === "user";

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          {isUser ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/tracker"
                element={isUser ? <Tracker /> : <Navigate to="/login" />}
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

              <Route path="/test" element={<Operation />} />
              <Route path="view-packages" element={<ViewPackage />} />
              <Route path="/create-package" element={<CreatePackage />} />
              <Route path="/appr" element={<Testing />} />
            </Routes>
          ) : isAdmin ? (
            <Routes>
              <Route
                path="/"
                element={isAdmin ? <OpsManager /> : <Navigate to="/login" />}
              >
                <Route path="/viewuser" element={<ViewUsers />} />
                <Route path="/approval" element={<Approval />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={!user ? <Home /> : <Home />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

<Routes>
        <Route path="/workoutform" element={<FitnessGoal />}></Route>
        <Route path="/biodata/:id" element={<BioData />} />
        <Route path="/final/:id" element={<FinalForm/>}/>
        <Route path="/select" element={<WorkoutSelection/>}>
          <Route path="form" element={<BioData/>}/>
          <Route path="goal/:id" element={<FitnessGoal/>}/>
          <Route path="confirm/:id" element={<FinalForm/>}/>
        </Route>
      </Routes>