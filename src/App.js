import './App.css';
import { Route, Routes } from "react-router-dom";
import SignUp from "./Signup/SignUp";
import SignIn from "./Signin/SignIn";
import ProfileSetup from "./profile/profile";
import Home from "./home/home";
import Dash from "./dash/dash";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>} />
         <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/profile" element={<ProfileSetup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/dash" element={<Dash/>}/>
      </Routes>
    </div>
  );
}

export default App;
