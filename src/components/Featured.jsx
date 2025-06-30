import React from "react";
import { Link } from "react-router-dom";
import blogImage1 from "../assets/Switzerland.jpg"; // Replace with your actual image paths
import blogImage2 from "../assets/Bali.jpg";
import blogImage3 from "../assets/tokyo.jpg";

const Featured = () => {
  const blogs = [
    {
      id: 1,
      image: blogImage1,
      title: "Exploring the Alps: A Journey through Switzerland",
      link: "/blog/1", // Replace with actual blog link
    },
    {
      id: 2,
      image: blogImage2,
      title: "The Beauty of Bali: A Tropical Paradise",
      link: "/blog/2", // Replace with actual blog link
    },
    {
      id: 3,
      image: blogImage3,
      title: "Urban Adventures: Discovering New York City",
      link: "/blog/3", // Replace with actual blog link
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 h-1/2">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-10">
        {/* Full Width Card */}
        <Link to={blogs[0].link} className="relative col-span-1 md:row-span-2">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-full object-cover rounded-lg"
          />
          <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded">
            {blogs[0].title}
          </h2>
        </Link>

        {/* Right Side Cards */}
        {blogs.slice(1).map((blog) => (
          <Link key={blog.id} to={blog.link} className="relative col-span-1">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black bg-opacity-50 p-2 rounded">
              {blog.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
