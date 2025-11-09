import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiFontSansSerif } from "react-icons/ri";
import { RiFontSans } from "react-icons/ri";
import { useFontTheme } from "../../hooks/useFontTheme";

const FontTheme = ({ backToSettings, tabs }) => {
  const { fontTheme, setFontTheme, handleFontApply } = useFontTheme();

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden cursor-pointer"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
        <span className="text-secondary font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Settings
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-primary font-semibold text-[1rem] tracking-[120%] leading-[-0.3px]">
          Font Theme
        </p>
        <p className="text-secondary font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Choose your font theme:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            fontTheme === 0 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setFontTheme(0)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <RiFontSansSerif className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Sans-serif
              </span>
              <span className="text-secondary font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Clean and modern, easy to read.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 0 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            fontTheme === 1 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setFontTheme(1)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <RiFontSans className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Serif
              </span>
              <span className="text-secondary font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Classic and elegant for a timeless feel.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 1 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            fontTheme === 2 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setFontTheme(2)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <RiFontSansSerif className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Monospace
              </span>
              <span className="text-secondary font-normal text-xs tracking-[120%] leading-[-0.2px]">
                Code-like, great for a technical vibe.
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              fontTheme === 2 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div className="flex items-center justify-start">
          <button
            onClick={handleFontApply}
            className="px-4 py-3 cursor-pointer rounded-lg bg-accent text-white"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontTheme;
