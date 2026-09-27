import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import IceBar from "./components/IceBar";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

function CustomerWebsite() {

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Menu />
        <IceBar />
        <Reviews />
        <Contact />
      </main>

      <footer>
        <p>
          © 2026 OM SARAVANAN BAVAN.
          All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<CustomerWebsite />}
        />

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;