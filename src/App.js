
import { useContext } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/LoginPage/Login";
import Register from "./components/LoginPage/Register";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";

import "./style.css"

function App() {
  
  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
    <div className="App">
        <Router>
          <Routes>
              <Route path="/" />
                <Route index element={<ProtectedRoute>
                    <Home />
                </ProtectedRoute>} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

          </Routes>  
        </Router> 
    </div>
  );
}


export default App
