import React from "react";

// components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import UpdateProfile from './components/Auth/UpdateProfile';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import About from './components/heroSection/About';
import Hero from './components/heroSection/Hero';
import UserDashboard from './dashboard/UserDashboard';
import Favourites from './favourites/Favourites';
import PlaylistCard from './playlistCard/PlaylistCard';
import Help from './ui/Help.jsx'
import Error400 from './ui/Error400';

// routes
import { Routes, Route } from "react-router-dom";
import { ToastContainer} from "react-toastify";

function App() {
  return (
    <div className='bg-gradient-to-bl from-blue-800 to-blue-900 min-h-screen flex flex-col'>

      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/update-profile' element={<UpdateProfile />} />
          <Route path='/#about' element={<About />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/help' element={<Help/>} />
          <Route path='/playlist-card' element={<PlaylistCard />} />
          <Route path='/error' element={<Error400/>}/>
          <Route path='*' element={<Error400/>} />
        </Routes>
      </main>

      <Footer />

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
  );
}

export default App;
