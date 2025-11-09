import { GoSun } from "react-icons/go";
import { MdKeyboardArrowLeft, MdOutlineDarkMode } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { useEffect, useState } from "react";

const ColorTheme = ({ backToSettings, tabs }) => {
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") return 0;
    if (saved === "dark") return 1;
    return 2;
  });

  const applyTheme = (mode) => {
    const body = document.body;
    const html = document.documentElement;

    body.classList.remove("dark", "light");
    html.classList.remove("dark", "light");

    if (mode === "light") {
      body.classList.add("light");
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else if (mode === "dark") {
      body.classList.add("dark");
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      const isDark = systemDark.matches;

      if (isDark) {
        body.classList.add("dark");
        html.classList.add("dark");
      } else {
        body.classList.add("light");
        html.classList.add("light");
      }

      localStorage.setItem("theme", "system");

      const handler = (e) => {
        body.classList.remove("dark", "light");
        html.classList.remove("dark", "light");
        if (e.matches) {
          body.classList.add("dark");
          html.classList.add("dark");
        } else {
          body.classList.add("light");
          html.classList.add("light");
        }
      };

      systemDark.addEventListener("change", handler);
      return () => systemDark.removeEventListener("change", handler);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "system";
    const cleanup = applyTheme(saved);

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleApply = () => {
    let themeMode;
    if (colorTheme === 0) themeMode = "light";
    else if (colorTheme === 1) themeMode = "dark";
    else themeMode = "system";

    const cleanup = applyTheme(themeMode);

    if (cleanup) cleanup();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden cursor-pointer"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
        <span className="text-secondary font-normal text-sm tracking-[130%]">
          Settings
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-primary font-semibold text-[1rem]">Color Theme</p>
        <p className="text-secondary font-normal text-sm">
          Choose your color theme:
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            colorTheme === 0 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setColorTheme(0)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <GoSun className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm">
                Light Mode
              </span>
              <span className="text-secondary font-normal text-xs">
                Pick a clean and classic light theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 0 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            colorTheme === 1 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setColorTheme(1)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <MdOutlineDarkMode className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm">
                Dark Mode
              </span>
              <span className="text-secondary font-normal text-xs">
                Select a sleek and modern dark theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 1 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div
          className={`border flex items-center justify-between border-dark rounded-xl ${
            colorTheme === 2 ? "bg-secondary" : ""
          } cursor-pointer p-4`}
          onClick={() => setColorTheme(2)}
        >
          <div className="flex items-center gap-4">
            <div className="border border-dark bg-primary rounded-xl p-3">
              <GrSystem className="text-secondary w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-medium text-sm">System</span>
              <span className="text-secondary font-normal text-xs">
                Adapts to your device's theme
              </span>
            </div>
          </div>
          <div
            className={`border-6 rounded-full ${
              colorTheme === 2 ? "border-accent" : "border-dark"
            } w-6 h-6`}
          ></div>
        </div>

        <div className="flex items-center justify-start">
          <button
            onClick={handleApply}
            className="px-4 text-white py-3 cursor-pointer rounded-lg bg-accent font-medium"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorTheme;
