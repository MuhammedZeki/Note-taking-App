import { GoSun } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useState } from "react";
const ColorTheme = () => {
  const [colorTheme, setColorTheme] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-[#E0E4EA] font-inter font-semibold text-[1rem] tracking-[120%] leading-[-0.3px]">
          Color Theme
        </p>
        <p className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Choose your color theme:
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            colorTheme === 0 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setColorTheme(0)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <GoSun className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Light Mode
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Pick a clean and classic light theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 0 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            colorTheme === 1 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setColorTheme(1)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <MdOutlineDarkMode className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Dark Mode
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Select a sleek and modern dark theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 1 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            colorTheme === 2 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setColorTheme(2)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <GrSystem className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                System
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Adapts to your device’s theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 2 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
