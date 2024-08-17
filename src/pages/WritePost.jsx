import React, { useContext, useState } from "react";
import { PenAdd, AddSquare, ArrowCircleLeft2 } from "iconsax-react";
// import pic from '../assets/bg.jpg'
import storage from "../Services/Firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import { url } from "../url";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function WritePost() {
  const [post, setPost] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();


  //Choosing file
  const upload = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      // console.log(image)
      setImage(e.target.files[0])
    }
    // console.log(image)
  
  };
  

  //Uploading the selected file to cloud
  const uploadPic = async(e) => {
    e.preventDefault();
    if(image){
      const storageRef = ref(storage, `images/${v4()}`);
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
          // console.log(url);
          alert("Image uploaded")
          
        })
        .catch((er) => console.log(er));
      });

    }
    else{
      alert("No image selected")
    }
  };

  //Posting post details to database
  const handlePost = async (e) => {
    e.preventDefault();
    if(!title ){
      alert("Please add a title to your post !")
    }
    else if(!post){
      alert("Post cannot be empty")
    }
    else if(!post && !title){
      alert("Post cannot be empty")
    }
    else{
    const newPost = {
      title: title,
      content: post,
      username: user,
      pic: imageUrl,
    };


      try {
        // console.log(newPost.pic);
         await axios.post(`${url}posts`, newPost);
        alert("Posted Succesfully");
        // console.log(response)
        navigate("/");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="w-full justify-begin">
        <Link to={"/"}>
          <ArrowCircleLeft2 size="32" color="#03C988" variant="Bold" />
        </Link>
      </span>
      <span className="flex flex-row justify-center text-xl font-bold mt-5">
        Write a post{" "}
        <PenAdd className="mx-5" size="25" color="#03C988" variant="Bold" />
      </span>
      <button className="mt-5"></button>
      {image && (
        <img
          className="w-2/3 h-[400px] rounded-xl"
          src={URL.createObjectURL(image)}
          alt=""
        />
      )}
      <form
        className="w-2/3 h-full flex flex-col  items-center"
        onSubmit={handlePost}
      >
          
        <label htmlFor="fileInput">
        <span className="w-full flex justify-center">
          <AddSquare size="35" color="#03C988" variant="Bold" />
            </span>
          <p>
            {
              
              image ?`above image selected`: "Select an image"
            }
            </p>
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={upload}
        />
        <button
          onClick={uploadPic}
          className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2"
        >
          Add image
        </button>
        <input
          type="text"
          placeholder="Title"
          className="p-2 mt-5 rounded text-xl outline-pink-400"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="What's your story ?"
          className="mt-10 w-2/3  outline-blue-400 p-2 h-[200px]"
          onChange={(e) => setPost(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="rounded text-xl bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 m-2"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default WritePost;
