import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import NavBar from "./component/NavBar";
import Hero from "./component/Hero";
import Info from "./component/Info";
import Footer from "./component/Footer";
import AddSchool from "./Pages/AddSchool";
import ShowSchools from "./Pages/ShowSchools";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Info />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route
          path="/add-school"
          element={
            <PrivateRoute>
              <AddSchool />
            </PrivateRoute>
          }
        />
        <Route path="/show-schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}
function Signout() {
  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);
  return null;
}

export default App;
