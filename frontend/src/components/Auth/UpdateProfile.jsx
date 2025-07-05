import React, { useState } from "react";
import AuthHeader from "../Header/AuthHeader.jsx";
import {
  House,
  Bookmark,
  LayoutDashboard,
  Star,
  ListMusic,
  User,
  Mail,
} from "lucide-react";
import axios from '../../utils/axios.js'
import Logo from "../../ui/Logo";
import { ToastContainer , toast} from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function UpdateProfile() {
  const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: <House />,
    },
    {
      name: "About",
      href: "#about",
      icon: <Bookmark />,
    },
    {
      name: "Dashboard",
      href: "",
      icon: <LayoutDashboard />,
    },
    {
      name: "Favorites",
      href: "",
      icon: <Star />,
    },
    {
      name: "Playlist",
      href: "",
      icon: <ListMusic />,
    },
  ];


  const [formData, setFormData] = useState({
    fullName : "",
    coverImage : "",
    email : '',
  })

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({...formData, coverImage : file})
    }
  };

  const updateUserProfile = async(e) => {
    try{
      e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("fullName", formData.fullName);
    formPayload.append("email", formData.email);
    formPayload.append("coverImage", formData.coverImage);

    const token = localStorage.getItem('token');
    const response = await axios.patch('/users/update-details', formPayload,
      {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    }
    )

      console.log(response.data)
      toast.success("Profile Updated successfully !")
    }
    catch(error){
      const message = error.response?.data?.message || "Something went wrong"

      toast.error(message) 
    }
  }

  return (
    <section className="min-h-screen pb-20">
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
      <div className="flex flex-col">
        <div className="px-2 py-2">
          <div className="lg:block hidden px-3 py-2">
            <Logo />
          </div>
          <div className="lg:hidden block">
            <AuthHeader />
          </div>
        </div>

        <div className="w-full mx-auto flex flex-col justify-between pt-[5rem]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 items-center">
            {/* quick links */}
            <div className="flex-col gap-9 pl-12 lg:flex hidden">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  className="text-white flex gap-4 cursor-pointer items-center"
                >
                  <p className="text-(--color-purple-200) hover:text-purple-400">
                    {item.icon}
                  </p>
                  <p className="text-(--color-secondary) hover:text-purple-600">
                    {item.name}
                  </p>
                </a>
              ))}
            </div>

            {/* Update profile section */}
            <div className="flex flex-col gap-12 w-[90%] md:w-[80%] lg:w-[60%] mx-auto flex-start col-span-3">
              <div className="flex flex-col gap-4">
                <p className="text-4xl lg:text-5xl text-(--color-primary) font-semibold text-center">
                  Update Profile
                </p>
                <p className="text-(--color-secondary) text-lg text-center">
                  {" "}
                  Want to update your cover image, email, password or full name.
                  Here you go !!
                </p>
              </div>
              <form className="items-center flex flex-col gap-4"
              encType="multipart/form-data"
              >
                {/* photo */}
                <div>
                  <label
                    htmlFor="coverImage"
                    className="w-[120px] h-[120px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer border border-purple-300"
                    style={{
                      backgroundImage: image ? `url(${image})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {!image && (
                      <span style={{ fontSize: "2rem", color: "#aaa" }}>+</span>
                    )}
                    <input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {/* name */}
                <div className="w-full rounded-2xl hover:border-1 border-(--color-purple-200) px-3 py-2 flex gap-2 hover:bg-transparent bg-[#261839] mt-8">
                  <User color="#E07AFD" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="text-(--color-secondary) outline-none w-full"
                    onChange={(e) => setFormData({...formData, fullName : e.target.value})}
                  />
                </div>
                {/* email */}
                <div className="w-full rounded-2xl hover:border-1 border-(--color-purple-200) hover:bg-transparent px-3 py-2 flex gap-2 bg-[#261839]">
                  <Mail color="#E07AFD" />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="text-(--color-secondary) outline-none w-full"
                    onChange={(e) => setFormData({...formData, email : e.target.value})}
                  />
                </div>
                {/* buton */}
                <div>
                  <button 
                  type="submit"
                  onClick={updateUserProfile}
                  className="mt-5 bg-(--color-primary) px-4 py-2 rounded-4xl text-(--color-blue-900) font-semibold opacity-95 hover:bg-[#261f2f] hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) cursor-pointer transition-all duration-500 text-[16px]">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateProfile;
