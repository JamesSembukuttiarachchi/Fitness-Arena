
import Form from "./component/Form.jsx";
import AppForm from "./pages/Appform.jsx";
import Cancel from "./pages/Cancel.jsx";
import Edit from "./pages/Edit.jsx";
import Header from './Header.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Mainapp from "./pages/Mainapp.jsx";
import View from "./pages/View.jsx";




function App(){

  return (
    <div className="App"> 
    <Header/>
    <AppForm/>
      <BrowserRouter>
<Routes>
<Route path='/appform' element={<appform />}/>
<Route path='/cancel' element={<Cancel />}/>
<Route path='/edit' element={<Edit />}/>
<Route path='/mainapp' element={<Mainapp />}/>
<Route path='/view' element={<View />}/>

</Routes>

      </BrowserRouter>
</div>
  );

};


export default App;