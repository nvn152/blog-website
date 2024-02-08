// SignIn.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoFacebook } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

const SignIn = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    currentUser,
    isLoggedIn,
    error: serverError,
    loading,
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      //not tested yet
      if (data.success === false) {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
      }

      if (data.error) {
        toast.error("Email or password is incorrect");
        dispatch(signInFailure(data.error));
      }

      if (res.ok) {
        toast.success("Logged In successfully"); //make this work in home page
        dispatch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const results = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/googleLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: results.user.displayName,
          email: results.user.email,
          photo: results.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Logged In successfully"); //make this work in home page
        dispatch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center backdrop-blur-lg bg-[url('/images/bg2.jpg')] bg-cover">
      <div className="flex bg-white/10 backdrop-blur-sm	border border-indigo-500	items-center flex-col rounded-lg p-10">
        <div className="text-center ">
          <div className="flex text-gray-200 gap-4 flex-col text-6xl font-extrabold">
            <span className="text-start">Hello! 👋</span>
            <span>Good Morning</span>
          </div>
        </div>
        <div className="mt-5 font-semibold text-white text-2xl ">
          Sign In to your Account
        </div>
        <div className="flex items-center gap-4 w-full mt-10 mb-5 flex-col md:flex-row">
          <div
            className="bg-white w-1/2 h-14 rounded-2xl cursor-pointer p-[1px]"
            onClick={handleGoogleClick}
          >
            <div className="flex items-center justify-center gap-3 text-black font-semibold h-full">
              <FcGoogle size={24} />
              <span>Login With Google</span>
            </div>
          </div>

          <div
            className="bg-[#1877F2] w-1/2 h-14 rounded-2xl cursor-pointer p-[1px]"
            onClick={() => {}}
          >
            <div className="flex items-center justify-center gap-3 text-white font-semibold h-full rounded-md">
              <IoLogoFacebook size={24} />
              <span>Login With Facebook</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 ">
          <span className="w-40 h-[1px] bg-black"></span>
          <span className="text-black font-semibold ">OR</span>
          <span className="w-40 h-[1px] bg-black"></span>
        </div>
        <form
          className="flex flex-col items-center gap-3 w-[500px] mt-5"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="md:w-full w-[400px] h-14 rounded-xl placeholder-white/40 bg-white/10 outline-none text-white px-5"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="md:w-full w-[400px] h-14 rounded-xl placeholder-white/40 bg-white/10 outline-none text-white px-5"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex w-[400px] md:w-full justify-end text-white">
            <span onClick={() => {}} className="cursor-pointer">
              Forget Password?
            </span>
          </div>
          <button
            disabled={loading}
            type="submit"
            className=" mt-4 md:w-full w-[400px] h-14 rounded-xl outline-none text-base font-semibold bg-[#1877F2] text-white"
          >
            {loading ? (
              <div>
                {" "}
                <Spinner size="sm" /> <span>Loading</span>{" "}
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="flex text-white justify-center text-c3 gap-1 mt-5">
          <span>Don't have and account?</span>

          <Link
            to="/auth/sign-up"
            className="font-semibold  underline underline-offset-2 cursor-pointer  text-blue-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SignIn;
