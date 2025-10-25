import { FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
const Login = () => {
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 border border-[#232530] rounded-2xl p-12 flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Welcome to Note
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-[#CACFD8]">
            Please log in to continue
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
                <IoMdEye className="w-6 h-6 text-[#717784]" />
              </div>
            </label>
          </div>
          <button className="bg-[#335CFF] flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold cursor-pointer">
            Login
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
          <button className="text-white font-inter font-normal text-sm tracking-[-0.2px] leading-[120%] cursor-pointer hover:underline">
            Do you forgot password?
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[-0.2px] leading-[120%]">
              No account yet?
            </span>
            <button className="text-white cursor-pointer hover:underline">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
