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
import Main from "./layout/Main.jsx";
import ShoppingHome from "./pages/ShopingHome.jsx";
import Menu from "./pages/Menu.jsx";
import CartPage from "./pages/CartPage.jsx";
import ManageProducts from "./components/Admin/ManageProducts.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import AddProduct from "./components/Admin/AddProduct.jsx";
import Mainapp from "./pages/Mainapp.jsx";
import Edit from "./pages/Edit.jsx";
import Cancel from "./pages/Cancel.jsx";
import Appform from "./pages/Appform.jsx";
import View from "./pages/View.jsx";
import MinindiTest from "./pages/MinindiTest";
import SaveCard from "./pages/SaveCard";
import Profile from "./pages/Profile";
import ViewCards from "./pages/ViewCards";
import EditCard from "./pages/EditCard";
import DeleteCard from "./pages/DeleteCard";
import Invoice from "./pages/Invoice";
import PaymentTransaction from "./pages/PaymentTransaction";
import Cart from "./pages/Cart";
import WorkoutRecovery from "./pages/WorkoutRecovery";
import PhysioApp from "./pages/PhysioApp";
import AppHistory from "./pages/AppHistory";
import DocAppList from "./components/DocAppList";
import PhysioAppList from "./components/PhysioAppList";
import PhysioAppointment from "./pages/PhysioAppointment";
import InjuryPage from "./pages/InjuryPage";
import Appointment from "./pages/Appoitnment";

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
                path="/store"
                element={isUser ? <Main /> : <Navigate to="/login" />}
              >
                <Route path="/store" element={<ShoppingHome />} />
                <Route path="product" element={<Menu />} />
                <Route path="cart-page" element={<CartPage />} />
              </Route>

              <Route path="/minindi" element={<MinindiTest />} />
              <Route path="/invoice" element={<Invoice />} />

              <Route
                path="/userprofile"
                element={user ? <UserProfile /> : <Navigate to="/login" />}
              />
              <Route path="/save" element={<SaveCard />} />
              <Route path="/view" element={<ViewCards />} />
              <Route path="/edit/:id" element={<EditCard />} />
              <Route path="/delete/:id" element={<DeleteCard />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route path="/select" element={<WorkoutSelection />}>
                <Route path="form" element={<BioData />} />
                <Route path="goal/:id" element={<FitnessGoal />} />
                <Route path="confirm/:id" element={<FinalForm />} />
              </Route>

              <Route path="/appform" element={<Appform />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/mainapp" element={<Mainapp />} />
              <Route path="/save" element={<SaveCard />} />
              <Route path="/view/:id" element={<View />} />

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
                <Route path="/manageproduct" element={<ManageProducts />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/updateproduct/:id" element={<UpdateProduct />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={!user ? <Home /> : <Home />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


{/* <Routes>
  <Route path="/workoutform" element={<FitnessGoal />}></Route>
  <Route path="/biodata/:id" element={<BioData />} />
  <Route path="/final/:id" element={<FinalForm />} />
  <Route path="/select" element={<WorkoutSelection />}>
    <Route path="form" element={<BioData />} />
    <Route path="goal/:id" element={<FitnessGoal />} />
    <Route path="confirm/:id" element={<FinalForm />} />
  </Route>
</Routes>;

<Routes>
  <Route path="/" element={<Profile />} />
  <Route path="/view" element={<ViewCards />} />
  <Route path="/edit/:id" element={<EditBook />} />
  <Route path="/delete/:id" element={<DeleteCard />} />
  <Route path="/minindi" element={<MinindiTest />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/save" element={<SaveCard />} />
  <Route path="/invoice" element={<Invoice />} />
  <Route path="/history" element={<PaymentTransaction />} />
</Routes>;
*/}

<Routes>
      <Route path="/injury" element={<InjuryPage />} />
      <Route path="/appoinments" element={<Appointment />} />
      <Route path="/physioapp" element={<PhysioAppointment />} />
      <Route path="/recovery" element={<WorkoutRecovery />} />
      <Route path="/physio" element={<PhysioApp />} />
      <Route path="/apphistory" element={<AppHistory />}>
        <Route path="docapp" element={<DocAppList/>}/>
        <Route path="phyapp" element={<PhysioAppList/>}/>
      </Route>

    </Routes>