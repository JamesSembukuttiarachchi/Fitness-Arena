import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components
import Tracker from "./pages/Tracker";
import Navbar from "./components/Navbar";
import ViewUsers from "./pages/ViewUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/view-users" element={<ViewUsers />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
