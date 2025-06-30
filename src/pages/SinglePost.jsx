import React, { useContext, useEffect, useRef, useState } from "react";
import { ArrowCircleLeft2 } from "iconsax-react";
import picDef from "../assets/bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import { url } from "../url";

function SinglePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const like = useRef(false);
  const [content, setContent] = useState();
  const { user } = useContext(Context);
  const [enableEdit, setEnableEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = () => {
      axios
        .get(`${url}posts/` + path)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPost();
  }, []);

  const Update = async () => {
    try {
      await axios.put(`${url}posts/${post._id}`, {
        username: user,
        title: title,
        content: content,
      });
      setEnableEdit(false);
      setPost(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    like.current = true;
    try {
      await axios.post(`http://localhost:4000/posts/${post._id}/like`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    like.current = false;
    try {
      await axios.post(`http://localhost:4000/posts/${post._id}/unlike`);
    } catch (error) {
      console.log(error);
    }
  };

  const Delete = async () => {
    try {
      let confirmation = window.confirm("Are you sure you want to delete this post?");
      if (confirmation) {
        await axios.delete(`${url}posts/` + path, {
          data: { username: user },
        });

        alert("Post deleted");
        navigate("/");
      }
    } catch (error) {
      alert("Some error occurred !!");
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center bg-gray-100 py-6">
      <Link to={"/"}>
        <ArrowCircleLeft2 size="32" color="#03C988" variant="Bold" />
      </Link>
      <div className="flex flex-col items-center mt-6 p-4 bg-white rounded-xl shadow-lg max-w-2xl w-full">
        {/* Image that takes almost full height */}
        <img
          className="sm:w-full sm:h-[60vh] h-64 w-full rounded-xl object-cover"
          alt="Scene"
          src={post.pic ? post.pic : picDef}
        />
        <span className="flex flex-row justify-between w-full mt-4">
          <h1 className="text-xl font-bold text-emerald-600 font-serif">{post.username}</h1>
          <h1 className="text-xl text-emerald-600 italic font-serif">{new Date(post.createdAt).toDateString()}</h1>
        </span>
        <span className="flex flex-row mt-2">
          {like.current ? (
            <button className="p-2 m-2 bg-sky-400 text-white rounded-xl font-serif hover:bg-sky-500" onClick={handleUnlike}>
              Unlike
            </button>
          ) : (
            <button className="p-2 m-2 bg-sky-400 text-white rounded-xl font-serif hover:bg-sky-500" onClick={handleLike}>
              Like ❤
            </button>
          )}
          <p className="font-serif m-2 p-2 text-sm">{post.likes <= 0 ? 0 : post.likes} (like feature in the next update)</p>
        </span>

        <span className={`flex-row justify-end w-full ${user === post.username ? "flex" : "hidden"}`}>
          {enableEdit ? (
            <>
              <button className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2" onClick={Update}>
                Update
              </button>
              <button className="rounded text-xl bg-red-400 hover:bg-red-600 text-white py-1 px-3 m-2" onClick={() => setEnableEdit(false)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2" onClick={() => setEnableEdit(true)}>
                Edit
              </button>
              <button className="rounded text-xl bg-red-400 hover:bg-red-600 text-white py-1 px-3 m-2" onClick={Delete}>
                Delete
              </button>
            </>
          )}
        </span>
        {enableEdit ? (
          <input
            type="text"
            className="font-serif m-4 p-3 border rounded-md w-full"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={post.title}
          />
        ) : (
          <h1 className="text-2xl font-extrabold font-serif m-4">{post.title}</h1>
        )}
        {enableEdit ? (
          <textarea className="font-serif w-full p-4 border rounded-md h-48" defaultValue={post.content} onChange={(e) => setContent(e.target.value)} />
        ) : (
          <p className="sm:w-full w-full font-serif text-md">{post.content}</p>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
