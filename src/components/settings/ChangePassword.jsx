import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ChangePassword = ({ backToSettings, tabs }) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden cursor-pointer"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
        <span className="text-secondary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Settings
        </span>
      </div>
      <div className="font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] text-primary">
        Change Password
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2  ">
          <label
            htmlFor="oldPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            Old Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type="text"
              id="oldPassword"
              name="oldPassword"
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Enter old password"
            />
            <IoMdEye className="text-tertiary h-5 w-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="newPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            New Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Enter new password"
            />
            <IoMdEye className="text-tertiary h-5 w-5 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 text-tertiary">
            <CiCircleInfo className="w-5 h-5" />
            <span className="font-inter font-normal text-xs tracking-[140%] leading-[0%]">
              At least 8 characters
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="confirmPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            Confirm New Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Confirm new password"
            />
            <IoMdEye className="text-tertiary h-5 w-5 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="px-4 cursor-pointer py-3 rounded-lg bg-accent text-white font-inter font-medium text-sm">
          Save Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
