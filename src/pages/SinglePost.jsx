import React, { useContext, useEffect, useRef, useState } from "react";
// import Blog from '../components/Blog'
// import Navbar from '../components/Navbar'
import { ArrowCircleLeft2 } from "iconsax-react";
import picDef from "../assets/bg.jpg";
import { Link, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import { url } from "../url";
import loader from "../assets/Loading.json"

function SinglePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  //Updating with likes
  const like = useRef(false);
  const [content, setContent] = useState();
  const { user } = useContext(Context);
  const [enableEdit, setEnableEdit] = useState(false);
  // const uploadLink = `${url}images/`;
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location)
  const path = location.pathname.split("/")[2];
  // console.log(path)

  useEffect(() => {
    const getPost = () => {
      axios
        .get(`${url}posts/` + path)
        .then((res) => {
          // console.log("the response is " + JSON.stringify(res.data));
          setPost(res.data);
          
        })
        .catch((err) => {
          console.log(err);
        });
      };
      getPost();
    }, []);
    // console.log(post.pic);
    
    const Update = async()=>{
      try {
        
        await axios.put(`${url}posts/${post._id}`,
        {
           username:user,
          title:title,
          content:content

        }
        )
        setEnableEdit(false)
        // window.location.reload(true);
        setPost(post);
      } catch (error) {
        console.log(error)
      }

  }
  const handleLike = async (e)=>{
    e.preventDefault();
    like.current = true;
    try{
      await axios.post(`http://localhost:4000/posts/${post._id}/like`)

    }catch(error){
      console.log(error);
    }
  }

  const handleUnlike = async(e)=>{
    e.preventDefault();
    like.current = false;
    try {
      
      await axios.post(`http://localhost:4000/posts/${post._id}/unlike`)
    } catch (error) {
      console.log(error)
    }
  }

  const Delete = async () => {
    try {
      let confirmation = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmation) {
        await axios.delete(`${url}posts/` + path, {
          data: { username: user },
        });

        alert("Post deleted");
        navigate("/");
      }
    } catch (error) {
      alert("Some error occured !!");
    }
  };

  return (
    <div className="h-full w-full">
      <Link to={"/"}>
        <ArrowCircleLeft2 size="32" color="#03C988" variant="Bold" />
      </Link>
      <div className="flex flex-col items-center mt-10 p-3">


        <img
          className="sm:w-2/3 sm:h-80 w-full  rounded-xl   object-cover"
          alt="Scene"
          src={post.pic ? post.pic : picDef}

        />
        <span className="flex flex-row justify-between w-2/3">
          <h1 className="text-xl font-bold text-emerald-500 font-serif">
            {post.username}
          </h1>
          <h1 className="text-xl  text-emerald-500 italic font-serif">
            {new Date(post.createdAt).toDateString()}
          </h1>
        </span>
        <span className="flex flex-row">
        {
          like.current?<button className="p-2 m-2 bg-sky-400 text-white rounded-xl font-serif hover:bg-sky-500" onClick={handleUnlike}>Unlike</button>
          :
          <button className="p-2 m-2 bg-sky-400 text-white rounded-xl font-serif hover:bg-sky-500"
          onClick={handleLike}
          >Like ❤</button>
        }
        <p className="font-serif m-2 p-2 text-sm">{post.likes <= 0 ? 0:post.likes} (like feature in the next update)</p>
        </span>

        <span
          className={`${
            user === post.username ? "flex" : "hidden"
          } flex-row justify-end w-2/3`}
        >
          {enableEdit ? (
            <>
              <button
                className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2"
                onClick={Update}
              >
                Update
              </button>
              <button
                className="rounded text-xl bg-red-400 hover:bg-red-600 text-white py-1 px-3 m-2"
                onClick={(e)=>{setEnableEdit(false)}}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2"
                onClick={(e) => {
                  setEnableEdit(true);
                }}
              >
                Edit
              </button>
              <button
                className="rounded text-xl bg-red-400 hover:bg-red-600 text-white py-1 px-3 m-2"
                onClick={Delete}
              >
                Delete
              </button>
            </>
          )}
        </span>
        {enableEdit ? (
          <input
            type=""
            className="font-serif m-4 p-3"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={post.title}
          />
        ) : (
          <h1 className="text-xl font-extrabold font-serif m-4 ">{post.title}</h1>
        )}
        {enableEdit ? (
          <textarea className="font-serif w-2/3 p-4" defaultValue={post.content} onChange={(e)=>setContent(e.target.value)} />
        ) : (
          <p className="sm:w-2/3 w-full font-serif">{post.content}</p>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
