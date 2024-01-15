import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    setCurrentUser(null);
    navigate("/login");
  };
  
  return (
    <>
      <div className="md:hidden mx-2">
        {open ? (
          <div className="max-w-80 mx-auto fixed right-5 flex justify-between my-4 gap-2 bg-white px-4 py-4 rounded-md z-10 font-semibold">
            <div className="flex flex-col gap-8 mx-auto">
              {currentUser?.id && (
                <>
                  <Link to={`/profile/${currentUser?.id}`}>
                    Hi, {currentUser.name}
                  </Link>
                  <Link to={"/create"}>Create Post</Link>
                </>
              )}
              <Link>Authors</Link>
              {currentUser?.id ? (
                <div onClick={logoutUser}>
                  <Link>Logout</Link>
                </div>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </div>
            <div
              className="text-right mr-2"
              onClick={() => setOpen((pre) => !pre)}
            >
              {<AiOutlineClose />}
            </div>
          </div>
        ) : (
          <div className="flex justify-between my-4 gap-2">
            <div></div>
            <div className="text-right" onClick={() => setOpen((pre) => !pre)}>
              {<FaBars />}
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto p-4">
          <nav className="flex items-center justify-between font-semibold">
            <div className="text-2xl">
              <Link to={"/"}>Logo</Link>
            </div>
            <div className="flex gap-8">
              {currentUser?.id && (
                <>
                  <Link to={`/profile/${currentUser?.id}`}>
                    Hi, {currentUser.name}
                  </Link>
                  <Link to={"/create"}>Create Post</Link>
                </>
              )}
              <Link>Authors</Link>
              {currentUser?.id ? (
                <div onClick={logoutUser}>
                  <Link>Logout</Link>
                </div>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
