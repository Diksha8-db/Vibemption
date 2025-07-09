import React,{useState} from "react";
import "../../index.css";
import axios from "../../utils/axios.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
   const [formData, setFormData] = useState({
    email : '',
    password : '',
   })

   const navigate = useNavigate();

   const loginUser = async(event) => {
      event.preventDefault();

      try{
        const response = await axios.post('/users/login', formData, {withCredentials: true});
        
        
        toast.success("Logged in successfully.Redirecting...")
        console.log(response.data.data)
        navigate('/dashboard')

      }
      catch(error){
        const message = error.response?.data?.message || 'Something went wrong!'
        toast.error(message)
      }
   }

  return (
    <section className="w-full px-3 pb-8 min-h-screen">

      <div className="lg:w-[60%] w-[80%] mx-auto flex flex-col items-center justify-center pt-8">
        <div className="flex flex-col gap-10 w-[80%] mx-auto">
          <h1 className="text-white text-center text-5xl font-semibold pt-20">
            Log In
          </h1>
          {/* form section */}
          {/* email authentication */}

          <div className="text-white grid grid-cols-1 gap-4">
            <form className="grid grid-cols-1 gap-3">
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setFormData({...formData, email : e.target.value})}
                  className="inputDiv"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setFormData({...formData, password : e.target.value})}
                  placeholder="Enter password"
                  required
                  minLength={8}
                  maxLength={20}
                  className="inputDiv"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                 onClick={loginUser}
                  className="px-2 py-2 text-center bg-[#2a2037] rounded-xl w-full hover:border-1 border-(--color-purple-200) transition-opacity duration-500 hover:opacity-75"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <p className="text-center text-(--color-secondary) pt-2">
                New to Vibemption, let's create?{" "}
                <Link
                to='/signup'
                className="text-white font-semibold">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
