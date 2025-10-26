import { CiSettings } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import SideBar from "../../components/SideBar";
import { GoSun } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import ColorTheme from "../../components/settings/ColorTheme";

const Settings = () => {
  const [tabs, setTabs] = useState(0);
  return (
    <div className="h-screen flex">
      <div className="lg:w-[20%] lg:block hidden">
        <SideBar />
      </div>
      <div className="w-full lg:w-[80%]  bg-[#0E121B] flex flex-col">
        <div className="flex items-center justify-between px-8 py-4 border-b border-b-[#232530]">
          <span className="text-[#E0E4EA] font-inter font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            Settings
          </span>
          <div className="lg:flex lg:items-center lg:gap-6 hidden">
            <label
              className="border rounded-lg border-[#2B303B] flex items-center px-5 py-3 gap-2"
              htmlFor="search"
            >
              <IoIosSearch className="text-[#99A0AE] w-6 h-6" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search by title, content, or tags…"
                className="text-[#99A0AE] font-inter font-normal text-sm -pt-3 border-none outline-none"
              />
            </label>
            <CiSettings className="text-[#99A0AE] w-6 h-6" />
          </div>
        </div>
        <div className="h-screen flex">
          <div className="bg-[#0E121B] lg:w-[25%]  hidden border-r border-r-[#232530] lg:flex lg:flex-col lg:gap-4 lg:px-7 lg:py-5">
            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 0 ? "bg-[#232530]" : ""
              }  p-3 rounded-md `}
              onClick={() => setTabs(0)}
            >
              <div className="flex items-center justify-start gap-4 text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <GoSun
                  className={`h-6 w-6 ${
                    tabs === 0 ? "text-[#335CFF]" : "text-[#E0E4EA]"
                  }`}
                />
                Color Theme
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-[#E0E4EA] " />
            </button>
            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 1 ? "bg-[#232530]" : ""
              }  p-3 rounded-md `}
              onClick={() => setTabs(1)}
            >
              <div className="flex items-center justify-start gap-4 text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <AiOutlineFontSize
                  className={`h-6 w-6 ${
                    tabs === 1 ? "text-[#335CFF]" : "text-[#E0E4EA]"
                  }`}
                />
                Font Theme
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-[#E0E4EA] " />
            </button>

            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 2 ? "bg-[#232530]" : ""
              }  p-3 rounded-md `}
              onClick={() => setTabs(2)}
            >
              <div className="flex items-center justify-start gap-4 text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <TbLockPassword
                  className={`h-6 w-6 ${
                    tabs === 2 ? "text-[#335CFF]" : "text-[#E0E4EA]"
                  }`}
                />
                Change Password
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-[#E0E4EA] " />
            </button>
            <div className="border-t border-t-[#232530]"></div>
            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 3 ? "bg-[#232530]" : ""
              }  p-3 rounded-md `}
              onClick={() => setTabs(3)}
            >
              <div className="flex items-center justify-start gap-4 text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <IoIosLogOut
                  className={`h-6 w-6 ${
                    tabs === 3 ? "text-[#335CFF]" : "text-[#E0E4EA]"
                  }`}
                />
                Log out
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-[#E0E4EA] " />
            </button>
          </div>
          <div className="bg-[#0E121B] w-full lg:w-[55%] border-r border-r-[#232530] px-6 py-5 flex flex-col gap-4">
            {tabs === 0 && <ColorTheme />}
          </div>
          <div className="bg-[#0E121B] hidden  lg:w-[20%] lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
