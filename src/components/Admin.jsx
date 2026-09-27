import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AdminReviews from "./AdminReviews";
import AdminProducts from "./AdminProducts";


function Admin() {

  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    fetch(
      "http://localhost:8080/om_Saravanan_Ice/AdminAuthServlet",
      {
        method: "GET",
        credentials: "include"
      }
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error("Not logged in");
        }

        return response.json();
      })

      .then((data) => {

        if (data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }

        setChecking(false);
      })

      .catch((error) => {

        console.log(
          "Authentication error:",
          error
        );

        setLoggedIn(false);
        setChecking(false);
      });

  }, []);


  // Logout function
  const handleLogout = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/om_Saravanan_Ice/LogoutServlet",
        {
          method: "POST",
          credentials: "include"
        }
      );

      const data = await response.json();

      if (data.success) {

        navigate("/admin");

      }

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    }
  };


  // Checking session
  if (checking) {

    return (
      <div>
        <h2>Checking admin login...</h2>
      </div>
    );
  }


  // Not logged in
  if (!loggedIn) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }


  // Dashboard
  return (

    <div>

      <div className="admin-header">

        <h1>
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
      

      <AdminReviews />
      <AdminProducts />

    </div>
  );
}

export default Admin;