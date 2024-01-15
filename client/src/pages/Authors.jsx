import React, { useEffect, useState } from "react";
import avatar1 from "../../public/avatar11.jpg";
import avatar2 from "../../public/avatar12.jpg";
import avatar3 from "../../public/avatar13.jpg";
import avatar4 from "../../public/avatar14.jpg";
import avatar5 from "../../public/avatar15.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

//dummy data
const authorsData = [
  { id: 1, avatar: avatar1, name: "Name", posts: 5 },
  { id: 2, avatar: avatar2, name: "Name", posts: 5 },
  { id: 3, avatar: avatar3, name: "Name", posts: 5 },
  { id: 4, avatar: avatar4, name: "Name", posts: 5 },
  { id: 5, avatar: avatar5, name: "Name", posts: 5 },
];

const Authors = () => {
  //when we use map never initialise with null always initialise with empty array else you will get an error of map cannot read the property of null
  const [authors, setAuthors] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setAuthors(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  console.log(authors);
  return (
    <div className="max-w-4xl mx-auto my-4">
      <div className="grid md:grid-cols-3 sm:cols-1 gap-8 ">
        {authors.map(({ _id:id, avatar, name, posts }) => {
          return (
            <div className="bg-white px-4 py-4 rounded-md">
              <Link
                key={id}
                to={`/posts/users/${id}`}
                className="flex gap-8 justify-between"
              >
                <div className="">
                  <img
                    src={`http://localhost:5000/upload/${avatar}`}
                    alt={name}
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="font-bold">{name}</h4>
                  <h4>{posts} posts</h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Authors;
