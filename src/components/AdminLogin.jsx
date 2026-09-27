import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");

    try {

      // Create form data
      const formData = new URLSearchParams();

      formData.append("username", username.trim());
      formData.append("password", password);

      // Send login request to Java backend
      const response = await fetch(
        "http://localhost:8080/om_Saravanan_Ice/AdminLoginServlet",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          credentials: "include",

          body: formData
        }
      );

      const data = await response.json();

      // Login successful
      if (response.ok && data.success) {

        navigate("/admin/dashboard");

      } else {

        setMessage(
          data.message ||
          "Invalid username or password."
        );
      }

    } catch (error) {

      console.error("Login Error:", error);

      setMessage(
        "Unable to connect to the Java server."
      );
    }
  };

  return (

    <div className="admin-login">

      <div className="login-card">

        <h1>Admin Login</h1>

        <p>OM SARAVANAN BAVAN</p>

        <form onSubmit={handleLogin}>

          {/* Username */}

          <div className="login-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="login-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Login button */}

          <button type="submit">
            Login
          </button>

        </form>


        {/* Error / success message */}

        {message && (

          <p className="login-message">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}

export default AdminLogin;
