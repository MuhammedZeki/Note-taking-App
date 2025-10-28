import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";

const ChangePassword = ({ backToSettings, tabs }) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-[#CACFD8] w-6 h-6" />
        <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Settings
        </span>
      </div>
      <div className="font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] text-[#E0E4EA]">
        Change Password
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2  ">
          <label
            htmlFor="oldPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-[#E0E4EA]"
          >
            Old Password
          </label>
          <div className="border border-[#525866] rounded-lg px-4 py-3 flex items-center justify-between ">
            <input
              type="text"
              id="oldPassword"
              name="oldPassword"
              className="border-none outline-none text-[#E0E4EA] pr-20 lg:pr-56"
            />
            <IoMdEye className="text-[#525866] h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="newPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-[#E0E4EA]"
          >
            New Password
          </label>
          <div className="border border-[#525866] rounded-lg px-4 py-3 flex items-center justify-between ">
            <input
              type="text"
              id="newPassword"
              name="newPassword"
              className="border-none outline-none text-[#E0E4EA] pr-20 lg:pr-56"
            />
            <IoMdEye className="text-[#525866] h-5 w-5" />
          </div>
          <div className="flex items-center gap-2 text-[#99A0AE]">
            <CiCircleInfo className="w-5 h-5" />
            <span className="font-inter font-normal text-xs tracking-[140%] leading-[0%]">
              At least 8 characters
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="confirmPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-[#E0E4EA]"
          >
            Confirm New Password
          </label>
          <div className="border border-[#525866] rounded-lg px-4 py-3 flex items-center justify-between ">
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              className="border-none outline-none text-[#E0E4EA] pr-20 lg:pr-56"
            />
            <IoMdEye className="text-[#525866] h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button className="px-4 py-3 rounded-lg bg-[#335CFF] text-[#E0E4EA]">
          Save Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
