import React, { useContext, useState } from "react";
import { PenAdd, AddSquare, ArrowCircleLeft2 } from "iconsax-react";
import storage from "../Services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import { url } from "../url";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import loadinganimation from "../assets/Loading.json";
import Lottie from "lottie-react";

function WritePost() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  // Choosing file
  const upload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Uploading the selected file to cloud
  const uploadPic = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (image) {
      const storageRef = ref(storage, `images/${v4()}`);
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setImageUrl(url);
            alert("Image uploaded");
            setLoading(false);
          })
          .catch((er) => console.log(er));
        setLoading(false);
      });
    } else {
      alert("No image selected");
      setLoading(false);
    }
  };

  // Posting post details to database
  const handlePost = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!title) {
      setLoading(false);
      alert("Please add a title to your post!");
    } else if (!post) {
      setLoading(false);
      alert("Post cannot be empty");
    } else {
      const newPost = {
        title: title,
        content: post,
        username: user,
        pic: imageUrl,
      };

      try {
        await axios.post(`${url}posts`, newPost);
        alert("Posted Successfully");
        setLoading(false);
        navigate("/");
      } catch (err) {
        setLoading(false);
        console.log(err);
        alert(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gradient-to-r from-gray-50 to-gray-200 h-screen w-screen">
      <span className="w-full flex justify-start">
        <Link to={"/"}>
          <ArrowCircleLeft2 size="32" color="#03C988" variant="Bold" />
        </Link>
      </span>
      <span className="flex flex-row justify-center text-2xl font-pacifico text-gray-700 mt-5">
        Write a post{" "}
        <PenAdd className="mx-5" size="25" color="#03C988" variant="Bold" />
      </span>
      {image && (
        <img
          className="w-full max-w-md h-auto rounded-xl object-cover shadow-md"
          src={URL.createObjectURL(image)}
          alt=""
        />
      )}
      <form className="w-full max-w-md h-full flex flex-col items-center mt-4 shadow-lg p-5 rounded-lg bg-white">
        <label htmlFor="fileInput" className="flex flex-col items-center">
          <span className="flex justify-center">
            <AddSquare size="35" color="#03C988" variant="Bold" />
          </span>
          <p className="text-gray-600 mt-2">
            {image ? `Above image selected` : "Select an image"}
          </p>
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={upload}
        />
        {loading ? (
          <Lottie animationData={loadinganimation} className="w-full h-14" />
        ) : (
          <button
            onClick={uploadPic}
            className="rounded text-lg bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 m-2 transition duration-200 shadow-md w-full"
          >
            Add image
          </button>
        )}
        <input
          type="text"
          placeholder="Title"
          className="p-3 mt-5 rounded text-xl outline-none border border-gray-300 focus:border-emerald-400 transition duration-200 w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="What's your story?"
          className="mt-4 w-full outline-none border border-gray-300 p-3 h-48 rounded focus:border-emerald-400 transition duration-200"
          onChange={(e) => setPost(e.target.value)}
        />
        {loading ? (
          <Lottie animationData={loadinganimation} className="w-full h-14" />
        ) : (
          <button
            onClick={handlePost}
            className="rounded text-lg bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 m-2 transition duration-200 shadow-md w-full"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
}

export default WritePost;
