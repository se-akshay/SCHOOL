import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Hero from "./component/Hero";
import Info from "./component/Info";
import Footer from "./component/Footer";
import AddSchool from "./Pages/AddSchool";
import ShowSchools from "./Pages/ShowSchools";

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
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/show-schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
