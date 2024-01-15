import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar1 from "../../public/avatar2.jpg";
import { FaEdit, FaCheck } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token;

  //redirect user to login if they arent logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  //filling the form from database info
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${currentUser?.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        setEmail(response?.data?.email);
        setName(response?.data?.name);
        setAvatar(response?.data?.avatar);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `http://localhost:5000/api/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCurrentUser(null);
        navigate("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const avatarHandler = async () => {
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `http://localhost:5000/api/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto my-8 px-3">
      <div className="text-center mb-10">
        <Link
          to={`/myposts/${currentUser?.id}`}
          className="px-3 py-2 bg-gray-200 mb-10 rounded-md"
        >
          My posts
        </Link>
      </div>
      <div>
        <div className="flex flex-col gap-8">
          <div className="mx-auto">
            <img
              src={`http://localhost:5000/upload/${avatar}`}
              alt="image"
              className="rounded-full text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <form onSubmit={avatarHandler}>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <button
                type="submit"
                className="bg-gray-200 p-2 rounded-md text-gray-700"
              >
                Change
              </button>
            </form>
          </div>
        </div>
        <h1 className="text-center mt-10 font-bold">{currentUser.name}</h1>
        {error && (
          <p className="bg-red-600 text-white p-2 text-center my-4">{error}</p>
        )}
        <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="p-2 rounded-md bg-white"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            className="p-2 rounded-md bg-white"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={currentPassword}
            className="p-2 rounded-md bg-white"
            placeholder="Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            className="p-2 rounded-md bg-white"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmNewPassword}
            className="p-2 rounded-md bg-white"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button className="p-2 text-white bg-purple-600 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
