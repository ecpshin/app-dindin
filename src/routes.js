import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"
import { getItem } from './utils/storage'

function ProtectedRoutes({ component : Component }) {
  
  const isAuthenticated  = getItem('token')

  return isAuthenticated ? Component : < Navigate to='/login' /> 
}

function MainRoutes() {
  return (
    
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoutes component={<Home />}/>} />
        <Route path="register" element={<Register />} />
      </Routes>
    
  );
}

export default MainRoutes;
