import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/login`,
        { email, password }
      );

      const user = await response.data;
      setCurrentUser(user);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log({ email, password });
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center my-4">Login</h2>
      <form
        className="flex flex-col gap-4 max-w-xl mx-auto"
        onSubmit={loginUser}
      >
        {error && (
          <p className="p-2 bg-red-500 text-white text-center">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="p-2 rounded-md bg-white"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          className="p-2 rounded-md bg-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="p-2 text-white bg-purple-600 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
      <small className="flex flex-col max-w-xl mx-auto text-center my-4">
        New user ?
        <Link to={"/register"} className=" text-purple-600">
          Register
        </Link>
      </small>
    </div>
  );
};

export default Login;
