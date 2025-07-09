import React, { useState } from "react";
import "../../index.css";
import {  toast } from 'react-toastify';
import axios from "../../utils/axios.js";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

function Signup() {
  // hadle image input
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({ ...formData, coverImage: file });
    }
  };

  // form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    coverImage: "",
  });

  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/users/register", formData);

      // console.log("Registered:", res.data);
      localStorage.setItem('token', res.data.refreshToken);

      toast.success("Registered Successfully!! Redirecting....")
      navigate('/dashboard')

    } catch (err) {
      toast.error("Registration failed:", err.response?.data || err.message);

      // console.log(err.response?.data.message)
      const message = err?.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  return (
    <section className="w-full px-3 pb-20">


      <div className="w-[80%] mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-10 w-[80%] mx-auto">
          <h1 className="text-white text-center text-bold text-5xl font-bold pt-20">
            Sign up
          </h1>
          {/* form section */}
          <div className="text-white grid grid-cols-1 gap-4">
            <form className="grid grid-cols-1 gap-5">
              {/* cover image */}
              <div className="flex items-center justify-center flex-col gap-2 pb-6">
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

              {/* fullName */}
              <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="inputDiv"
                  onChange={(event) =>
                    setFormData({ ...formData, fullName: event.target.value })
                  }
                  required
                />
              </div>

              {/* email */}
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="inputDiv"
                  placeholder="Enter your email address"
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  required
                />
              </div>

              {/* password */}
              <div className="flex flex-col gap-2">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  required
                  minLength={8}
                  maxLength={20}
                  className="inputDiv"
                  onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                  }
                  name="password"
                />
              </div>

              {/* button to register */}
              <div className="flex justify-center pt-3">
                <button
                  onClick={registerUser}
                  type="submit"
                  className="px-2 py-2 text-center bg-[#2a2037] rounded-xl w-full hover:border-1 border-(--color-purple-200) transition-all duration-500 "
                >
                  Sign up
                </button>
              </div>

              {/* login else */}
              <p className="text-center text-(--color-secondary)">
                Already have an account?{" "}
                <Link
                 to='/login'
                 className="text-white font-semibold" href="">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
