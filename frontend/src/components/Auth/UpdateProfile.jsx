import React, { useState } from "react";
import {
  House,
  Bookmark,
  LayoutDashboard,
  Star,
  ListMusic,
  User,
  Mail,
} from "lucide-react";
import axios from "../../utils/axios.js";
import { toast } from "react-toastify";
import Loader from'../../ui/Loader.jsx'

function UpdateProfile() {
   const navItems = [
    {
      name: "Home",
      href: "#home",
      icon: <House />,
    },
    {
      name: "About",
      href: "/#about",
      icon: <Bookmark />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: "Favorites",
      href: "/favourites",
      icon: <Star />,
    },
    {
      name: "Playlist",
      href: "/explore",
      icon: <ListMusic />,
    },
  ];

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File:", file);

    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, coverImage: file }));
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    coverImage: "",
    email: "",
  });

  const updateUserProfile = async (e) => {
    
    try {
      setLoading(true)
      e.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      
      // Append file if it exists
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      console.log(formDataToSend)

      const response = await axios.patch("/users/update-details", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set header for file upload
        },
        withCredentials: true, // Send cookies (for JWT)
      });

      console.log(response.data);
      toast.success("Profile Updated successfully !");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
    {loading ? 
      <Loader/> :
    <section className="min-h-screen pb-20">
      <div className="flex flex-col">
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
              <form
                className="items-center flex flex-col gap-4"
                encType="multipart/form-data"
                onSubmit={updateUserProfile}
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
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                {/* buton */}

                <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
                  <button
                    type="submit"
                    className="mt-5 bg-(--color-primary) px-4 py-2 rounded-4xl text-(--color-blue-900) font-semibold opacity-95 hover:bg-[#261f2f] hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) cursor-pointer transition-all duration-500 text-[16px]"
                  >
                    Update Profile
                  </button>
                  <a
                    href='/dashboard'
                    className="mt-5 bg-(--color-primary) px-4 py-2 rounded-4xl text-(--color-blue-900) font-semibold opacity-95 hover:bg-[#261f2f] hover:text-(--color-primary) hover:border-2 hover:border-(--color-primary) cursor-pointer transition-all duration-500 text-[16px]"
                  >
                    Go to Dashboard
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    }
    </>
  );
}

export default UpdateProfile;
