import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    role: "customer", // Default role
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/customers/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);

      // Redirect to login after successful signup
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ====== img box ====== */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="signup image"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* ====== signup form ====== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066fff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                    placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066fff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                    placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066fff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                    placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066fff61] focus:outline-none
                    focus:border-b-primaryColor text-[16px] leading-7 text-headingColor 
                    placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Role:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Captain</option>
                  </select>
                </label>
              </div>

              <div className="mb-5">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Sign Up
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
