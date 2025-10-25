import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
const ResetPassword = () => {
  const [isShow, setIsShow] = useState(true);
  const [isShow1, setIsShow1] = useState(true);

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
            Reset Your Password
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-center text-[#CACFD8]">
            Choose a new password to secure your account.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-start">
            <label
              htmlFor="newPassword"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              New Password
              <input
                type="text"
                id="newPassword"
                name="newPassword"
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
          <div className="flex flex-col items-start">
            <label
              htmlFor="confirmPassword"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              Confirm New Password
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
              />
              <div className="text-[#717784] absolute top-8 right-4 bg-[url(/images/icon-show-password.svg)] bg-cover bg-no-repeat cursor-pointer">
                {isShow1 ? (
                  <IoMdEye
                    className="w-6 h-6 text-[#717784]"
                    onClick={() => setIsShow1(!isShow1)}
                  />
                ) : (
                  <LuEyeClosed
                    className="w-6 h-6 text-[#717784]"
                    onClick={() => setIsShow1(!isShow1)}
                  />
                )}
              </div>
            </label>
          </div>

          <button className="bg-[#335CFF] flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold cursor-pointer">
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
