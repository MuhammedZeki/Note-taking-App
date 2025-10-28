import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiFontSansSerif } from "react-icons/ri";
import { RiFontSans } from "react-icons/ri";
const FontTheme = ({ backToSettings, tabs }) => {
  const [fontTheme, setFontTheme] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-[#CACFD8] w-6 h-6" />
        <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Settings
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#E0E4EA] font-inter font-semibold text-[1rem] tracking-[120%] leading-[-0.3px]">
          Font Theme
        </p>
        <p className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Choose your font theme:
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            fontTheme === 0 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setFontTheme(0)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <RiFontSansSerif className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Sans-serif
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Clean and modern, easy to read.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 0 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            fontTheme === 1 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setFontTheme(1)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <RiFontSans className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Serif
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Classic and elegant for a timeless feel.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 1 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
        <div
          className={`border flex items-center justify-between border-[#2B303B] rounded-xl ${
            fontTheme === 2 ? "bg-[#232530]" : ""
          }  cursor-pointer p-4`}
          onClick={() => setFontTheme(2)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-[#2B303B] bg-[#0E121B] rounded-xl  p-3">
              <RiFontSansSerif className="text-[#CACFD8] w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Monospace
              </span>
              <span className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Code-like, great for a technical vibe.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 2 ? "border-[#335CFF]" : "border-[#2B303B]"
            } w-6 h-6`}
          ></div>
        </div>
        <div className="flex items-center justify-start">
          <button className="px-4 py-3 rounded-lg bg-[#335CFF] text-[#E0E4EA]">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontTheme;
