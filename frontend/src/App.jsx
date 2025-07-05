import './App.css'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import UpdateProfile from './components/Auth/UpdateProfile'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import About from './components/heroSection/About'
import Hero from './components/heroSection/Hero'
import UserDashboard from './dashboard/UserDashboard'
import Favourites from './favourites/Favourites'
import PlaylistCard from './playlistCard/PlaylistCard'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
   <Router>
   <div className='bg-gradient-to-bl from-blue-800 to-blue-900'>

    {/* toast notification */}
   <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>


    {/** app routing */}
    <Routes>
      <Route path='/' element={}/>
    </Routes>
   </Router>
     
    </>
  )
}

export default App
