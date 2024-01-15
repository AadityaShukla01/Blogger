import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`,
        { name, email, password, confirmPassword }
      );

      const newUser = await response.data;
      // console.log(newUser);

      if (!newUser) {
        setError("Cant register user.Please try again");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center my-4">Sign up</h2>
      {error && <p className="text-center my-4 bg-red-500 text-white max-w-xl mx-auto p-2">{error}</p>}
      <form
        className="flex flex-col gap-4 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Full name"
          value={name}
          className="p-2 rounded-md bg-white"
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          value={confirmPassword}
          className="p-2 rounded-md bg-white"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="p-2 text-white bg-purple-600 rounded-md"
          type="submit"
        >
          Register
        </button>
      </form>
      <small className="flex flex-col max-w-xl mx-auto text-center my-4">
        Already have an account?{" "}
        <Link to={"/login"} className="text-purple-600">
          Login
        </Link>
      </small>
    </div>
  );
};

export default Register;
