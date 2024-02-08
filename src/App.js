
import Signup from "./components/signup/Signup"
import Login from "./components/login/login"
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import FrontPage from "./components/FrontPage/FrontPage";
import Quote from "./components/Quote/Quote";
import Setting from "./components/Setting/Setting";
import {BrowserRouter ,Routes ,Route} from "react-router-dom"



function App() {
 
  return (
    <BrowserRouter>
       
        
        <Routes>
         <Route path="/"  element={<FrontPage/>} />
         <Route path="/home"  element={<Home/>} />
         <Route path="/login"  element={<Login />} />
         <Route path="/signup"  element={<Signup/>} />
         <Route path="/dashboard"  element={<Dashboard />} />
         <Route path="/quote"  element={<Quote/>} />
         <Route path="/setting"  element={<Setting/>} />
         
         </Routes>
         
       

    </BrowserRouter>
  );
}

export default App;
