import { useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/avatar-icon.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/captains", display: "Find a Captain" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const { user, role, token, dispatch } = useContext(authContext); // Get user from context
  console.log(user);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // Navigate to login or home page after logout if needed
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/*====== Logo ======*/}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/*====== Menu ======*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/*====== Nav Right ======*/}
          <div className="flex items-center gap-4">
            {user ? (
              // If user is logged in, show their info
              <>
              <Link
  to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}
  className="flex items-center gap-2" // Flex container with a gap between image and text
>
  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
    <img
      src={user.profilePicture || userImg}
      alt="User"
      className="w-full h-full rounded-full object-cover" // Ensure the image fills the container and maintains aspect ratio
    />
  </figure>
  <span className="text-md font-semibold text-textColor"> {/* Adjust text styling */}
    {user.name}
  </span>
</Link>

              </>
            ) : (
              // If no user, show login button
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
