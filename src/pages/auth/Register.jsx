import { FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
const Register = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 border border-[#232530] rounded-2xl p-12 m-3 flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Create Your Account
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-center text-[#CACFD8]">
            Sign up to start organizing your notes and boost your productivity.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-start">
            <label
              htmlFor="email"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email@example.com"
              className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="password"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              Password
              <input
                type="text"
                id="password"
                name="password"
                className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
              />
              <div className="text-[#717784] absolute top-8 right-4 bg-[url(/images/icon-show-password.svg)] bg-cover bg-no-repeat cursor-pointer">
                {isShow ? (
                  <IoMdEye
                    className="w-6 h-6 text-[#717784]"
                    onClick={() => setIsShow(!isShow)}
                  />
                ) : (
                  <LuEyeClosed
                    className="w-6 h-6 text-[#717784]"
                    onClick={() => setIsShow(!isShow)}
                  />
                )}
              </div>
              <div className="flex text-[#99A0AE] items-center mt-2 font-inter font-normal text-sm gap-2">
                <CiCircleInfo className="w-6 h-6 text-[#717784]" />
                At least 8 characters
              </div>
            </label>
          </div>
          <button className="bg-[#335CFF] flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold cursor-pointer">
            Sign Up
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center border-t border-t-[#232530]">
          <span className="text-[#CACFD8] font-inter font-medium tracking-[-0.2px] text-sm leading-[130%] mt-6">
            Or log in with:
          </span>
          <button className="text-white border border-[#232530] rounded-2xl w-full py-3 font-inter font-semibold text-lg tracking-[-0.3px] leading-[%120] flex items-center justify-center gap-2 cursor-pointer">
            <FaGoogle className="w-5 h-5 text-white" />
            Google
          </button>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[-0.2px] mt-1 leading-[120%]">
              Already have an account?
            </span>
            <button className="text-white cursor-pointer hover:underline ">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
