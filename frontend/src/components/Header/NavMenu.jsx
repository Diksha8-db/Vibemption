import React from 'react'

function NavMenu() {
    const navItems = [
        {
            name : "Home",
            href : "#home",
        },
        {
            name : "About",
            href : "#about",
        },
        {
            name : "Explore",
            href : "",
        },
        {
            name : "Dashboard",
            href : "",
        },
        { 
            name : "Help",
            href : ""
        }
    ]
  return (
    <div className='w-[90%] px-2 py-2 mx-auto'>
        <div className='flex flex-col gap-3 justify-center items-center'>
            {navItems.map((item, index) => (
                <a
                key={index}
                href={item.href}
                className='text-white hover:text-purple-200 duration-500 transition-all text-[16px]'
                >
                    {item.name}
                </a>
            ))}
        </div>
    </div>
  )
}

export default NavMenu