// import logo from './logo.svg';
import './App.css';
// import { ReactDOM } from 'react-dom';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import PostCard from './components/PostCard';
import Homepage from './pages/Homepage';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
// import WritePost from './pages/WritePost';
import Register from './pages/Register';
import WritePost from './pages/WritePost';
import { lazy, Suspense, useContext } from 'react';
import { Context } from './context/Context';
import Loader from './components/Loader';

function App() {
  const {user} = useContext(Context);

  const LazyPost = lazy(()=>import("./pages/SinglePost"))
  return (
    <BrowserRouter>
  
     <Routes>

    
      <Route exact path='/' element={<Homepage/>}/>
      <Route path='/login' element={user?<Homepage/> : <Login/>}/>
      <Route path='/register' element={user?<Homepage/> : <Register/>}/>
      <Route path='/write' element={user?<WritePost/> : <Login/>}/>
      <Route path='/post/:postId'
       element={<Suspense fallback={<Loader/>}>
        <LazyPost/>
      </Suspense>}/>


     </Routes>


    </BrowserRouter>
  );
}

export default App;
