"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { set } from "mongoose"
const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)
  const [search, setSearch] = useState("");


  const handlechange = (e) => {
    setSearch(e.target.value);
  };

  const handleclick = () => {
    if (search.trim() === "") {
      return; // Prevent navigation if the input is empty
    }
    setSearch(""); // Clear the search input
    router.push(`/${search}`); // Navigate to the search user page
  };


  return (
    <nav className='bg-blue-950 text-white flex flex-col md:flex-row justify-between px-4 md:h-14 items-center'>
      <Link className='logo font-bold text-lg flex justify-center items-center' href={"/"}>
        <span>Get me a Chai</span>
        <img src="/tea.svg" width={52} className='pb-2 invertImg' alt="" />
      </Link>

      <div className='relative flex mt-12 mb-4 md:mb-0 md:mt-0 gap-8 justify-center items-center  md:block md:gap-4'>

        {session && <><div className="flex justify-center bottom-14 md:bottom-1 items-center absolute md:right-[208px] md:top-[4px] ">
          <img onClick={handleclick} src="/hover.gif" className=" w-[24px] h-[22px] absolute md:top-[4px] top-[6px] md:right-[250px] right-[210px] " alt="" />

          <input onChange={handlechange} type="text" value={search} name="user" placeholder="Search Creators" className="bg-white-500 text-black text-lg px-2 font-serif py-1 h-9 rounded-full focus:ring-4 focus:outline-none text-center  w-60 md:w-72" />
        </div>  </> }


        {session && <>

          <button onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
            setTimeout(() => {
              setShowdropdown(false)
            }, 300);
          }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
            </ul>
          </div>
        </>

        }

        {session && <button className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' onClick={() => { signOut() }}>Logout</button>}
        {!session && <Link href={"/login"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 '>Login</button></Link>}

      </div>
    </nav>
  )
}

export default Navbar


// "use client";
// import { useSession, signIn, signOut } from "next-auth/react";
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Navbar = () => {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [showdropdown, setShowdropdown] = useState(false);
//   const [search, setSearch] = useState("");

//   const handlechange = (e) => {
//     setSearch(e.target.value);
//   };

//   const handleclick = () => {
//     if (search.trim() === "") {
//       return; // Prevent navigation if the input is empty
//     }
//     setSearch(""); // Clear the search input
//     router.push(`/${search}`); // Navigate to the search user page
//   };

//   return (
//     <nav className="bg-blue-950 text-white flex flex-wrap justify-between items-center p-4">
//       {/* Logo Section */}
//       <div className="flex justify-between items-center w-full md:w-auto">
//         <Link
//           className="logo font-bold text-lg flex justify-center items-center"
//           href={"/"}
//         >
//           <span>Get me a Chai</span>
//           <img src="/tea.svg" width={52} className="pb-2 invertImg" alt="" />
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="flex justify-center items-center w-full md:w-auto mt-4 md:mt-0 relative">
//         {session && (
//           <>
//             <img
//               onClick={handleclick}
//               src="/hover.gif"
//               className="w-[24px] h-[20px] absolute top-[8px] left-4 md:left-auto md:right-[250px]"
//               alt=""
//             />

//             <input
//               onChange={handlechange}
//               type="text"
//               value={search}
//               name="user"
//               placeholder="Search Creators"
//               className="bg-white-500 text-black text-sm px-4 py-2 rounded-full focus:ring-4 focus:outline-none w-full md:w-72 sm:w-56"
//             />
//           </>
//         )}
//       </div>

//       {/* Account Dropdown and Buttons */}
//       <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto mt-4 md:mt-0">
//         {session && (
//           <>
//             <button
//               onClick={() => setShowdropdown(!showdropdown)}
//               onBlur={() => {
//                 setTimeout(() => {
//                   setShowdropdown(false);
//                 }, 300);
//               }}
//               id="dropdownDefaultButton"
//               data-dropdown-toggle="dropdown"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center"
//               type="button"
//             >
//               Account
//               <svg
//                 className="w-2.5 h-2.5 ms-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 10 6"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 4 4 4-4"
//                 />
//               </svg>
//             </button>

//             <div
//               id="dropdown"
//               className={`z-10 ${
//                 showdropdown ? "" : "hidden"
//               } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
//             >
//               <ul
//                 className="py-2 text-sm text-gray-700"
//                 aria-labelledby="dropdownDefaultButton"
//               >
//                 <li>
//                   <Link
//                     href={"/dashboard"}
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href={`/${session.user.name}`}
//                     className="block px-4 py-2 hover:bg-gray-100"
//                   >
//                     Your Page
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </>
//         )}

//         {session && (
//           <button
//             className="text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
//             onClick={() => {
//               signOut();
//             }}
//           >
//             Logout
//           </button>
//         )}
//         {!session && (
//           <Link href={"/login"}>
//             <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5">
//               Login
//             </button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
