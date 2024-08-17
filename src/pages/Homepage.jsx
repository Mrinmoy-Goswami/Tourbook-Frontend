import React, { Suspense, useEffect,lazy } from "react";
import Navbar from "../components/Navbar";
import Lazyvideo from "../components/Lazyvideo";
import "./Homepage.css";
import Blogs from "../components/Blogs";
import oyo from "../assets/oyo.png";
import goib from "../assets/goibipng.png";
import mmt from "../assets/mmt.png";
import yatra from "../assets/yatra.png";
import Lottie from 'lottie-react'
import travel from '../assets/travel.json'
import traveller from '../assets/traveller.json'
import { useState } from "react";
import axios from 'axios'
import Footer from "../components/Footer";
import { url } from "../url";
import Loading from '../assets/Loading.json'
import Loader from "../components/Loader";



function Homepage() {

  const[load,setLoad] = useState(false);
  const [posts,setPosts] = useState([]);
 const[promptText,setPromptText] = useState("");
 const[itinerary,setItinerary] = useState("");
 const[formatedData,setFormatedData] = useState("");
 const [promptLoad,setPromptLoad] = useState(false)

  useEffect(()=>{
    const fetchPosts = async()=>{

      await axios.get(`${url}posts`).then((res)=>{
        setPosts(res.data);
        setLoad(true);
        // console.log(res)
      }).catch((err)=>
      alert(err.response.data)
      );
      // console.log(response); 
    } 
    fetchPosts();
  },[]) 


  const handlePrompt = async ()=>{
     if(!promptText){
      alert("Please add a destination for generating itinerary")
     }
     else{

       try {
         setPromptLoad(true)
         await axios.post("http://localhost:4000/prompt",{
        prompt:`Write me an itinerary for the destination ${promptText} and include travel packages or any other related links as well.Write all the links as reference at the last  `
  }).then((res)=>setItinerary(res.data.replaceAll("**"," \n ")));
  
  
  setItinerary(itinerary=>itinerary.replaceAll("*"," \n "))
  setPromptLoad(false)
} catch (error) {
  alert("Some error occured !");
  setPromptLoad(false)
}
}
}

const Lazyvid = React.lazy(()=>import('../components/Lazyvideo'))
  return (
    <>
    <div className="flex flex-col w-full h-screen items-center ">
      <div>
        <span className="w-full left-0 right-0">
          <Navbar />
        </span>

        <div className="flex ">
        <Suspense fallback={<Loader/>}>
          <Lazyvid/>
        </Suspense>
        </div>
      </div>
      <div className="flex flex-col items-center">
         
      <p className="text-[40px] text-gray-500 font-semibold font-serif p-5 m-2">
        Get a full itinerary for your destination with our AI</p>
        <p className="text-xl text-gray-500 font-semibold font-serif p-5 m-5">Tell us where do you want to travel ?</p>
        <input className="p-3 w-1/2 shadow-lg focus:outline-sky-300" type="text"
        onChange={(e)=>setPromptText(e.target.value)}
        />
        <button
          onClick={handlePrompt}
          className="rounded text-xl bg-pink-500 hover:bg-pink-300 text-white py-2 px-3 mt-4 mb-5 shadow-lg"
          disabled = {promptLoad}
        >
          {promptLoad ? <Lottie animationData={Loading} className="h-8 w-28"/>:"Generate itinerary"}
        
        </button>
        <p className="w-full bg-white p-5 rounded m-4 tracking-widest font-serif">
       
         {itinerary ? itinerary :<span className="text-gray-300"> Your itinerary here </span>}
        </p>
      </div>

    <h1 className="font-serif font-black sm:text-[100px] text-[30px] text-center text-gray-500">travel the world with our partners</h1>
    <Lottie className="h-40 w-40 sm:h-50 sm:w-50" animationData={travel}></Lottie>
    <div className="flex flex-row justify-around mt-10 mb-10 w-full" >
      <img className="sm:h-40 sm:w-40 h-10 w-10 mx-5 rounded shadow-lg" src={mmt}alt="mmt" />
      <img className="sm:h-40 sm:w-40 h-10 w-10 mx-5 rounded shadow-lg" src={oyo}alt="oyo" />
      <img className="sm:h-40 sm:w-40 h-10 w-10 mx-5 rounded shadow-lg" src={yatra} alt="yatra"/>
      <img className="sm:h-40 sm:w-44 h-10 w-10 mx-5 rounded shadow-lg" src={goib}alt="gpibibo" />
    </div>
    <h1 className="font-serif font-black sm:text-[100px] text-[30px] text-center text-gray-500 mb-10">Share your stories</h1>
    <Lottie className="h-40 mb-10 w-40" animationData={traveller}></Lottie>

{
load?
      <Blogs posts={posts} />
      :
       <Lottie animationData={Loading} className="w-full h-40" />
}
      
      <Footer/>
    </div>
    
    </>
  )
}

export default Homepage;
