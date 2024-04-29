import Form from "./component/Form.jsx";
import AppForm from "./pages/Appform.jsx";
import Cancel from "./pages/Cancel.jsx";
import Edit from "./pages/Edit.jsx";
import Header from "./component/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainapp from "./pages/Mainapp.jsx";
import View from "./pages/View.jsx";
import TrainerManager from "./pages/TrainerManager.jsx";
import Trainerupdate from "./pages/Trainerupdate.jsx";

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/appform" element={<AppForm />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/" element={<Mainapp />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/trainer" element={<TrainerManager />} />
          <Route path="/tupdate" element={<Trainerupdate/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
