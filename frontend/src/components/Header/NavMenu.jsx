import React,{useState, useEffect} from 'react'
import axios from '../../utils/axios.js'

function NavMenu() {
    const navItems = [
        {
            name : "Home",
            href : "/",
        },
        {
            name : "About",
            href : "/#about",
        },
        {
            name : "Explore",
            href : "/",
        },
        {
            name : "Dashboard",
            href : "/dashboard",
        },
        { 
            name : "Help",
            href : "/help"
        }
    ]

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("/users/user-dashboard", {
            withCredentials: true,
          });
  
          setIsAuthenticated(true);
  
          // toast.success("User Authenticated")
        } catch (error) {
          const message = error.response?.data?.message || "Something went wrong";
          setIsAuthenticated(false);
          // toast.error(message)
        }
      };
  
      checkAuth();
    }, []);

  return (
    <div className='w-[90%] px-2 py-2 mx-auto'>
        <div className='flex flex-col gap-3 justify-center items-center'>
            {navItems.map((item, index) => {
                if(item.name == "Dashboard" && !isAuthenticated){
                    item.href='/error'
                }
            return(
                <a
                key={index}
                href={item.href}
                className='text-white hover:text-purple-200 duration-500 transition-all text-[16px]'
                >
                    {item.name}
                </a>
)})}
        </div>
    </div>
  )
}

export default NavMenu