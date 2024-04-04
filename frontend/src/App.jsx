
import Form from "./component/Form.jsx";
import AppForm from "./appform.jsx";
import Header from './Header.jsx';
import {BrowserRouter,Routes,Route} from "react-router-dom";




function App(){

  return (
    
    <div className="App">
      <BrowserRouter>
      <Header/>
      <AppForm/>
     <div>
<Routes>
<Route path='/appform' element={<appform />}/>


</Routes>

      </div>
      
      </BrowserRouter>

</div>
  );


}


export default App;