import { CiSettings } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import SideBar from "../../components/SideBar";
import { GoSun, GoTag } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import ColorTheme from "../../components/settings/ColorTheme";
import FontTheme from "../../components/settings/FontTheme";
import ChangePassword from "../../components/settings/ChangePassword";
import BottomMenuBar from "../../components/menu/BottomMenuBar";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/fire/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFontTheme } from "../../hooks/useFontTheme";

const Settings = () => {
  const [tabs, setTabs] = useState(0);
  const [selectedTabs, setSelectedTabs] = useState(null);
  const navigate = useNavigate();
  const { fontTheme } = useFontTheme();

  const handleTabs = (id) => {
    setTabs(id);
    setSelectedTabs(id);
  };

  const backToSettings = (id) => {
    setTabs(id);
    setSelectedTabs(null);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      toast.success("Çıkış yapıldı!");
      navigate("/sign-in");
    },
    onError: (err) => {
      toast.error(`Çıkış başarısız:${err.message}`);
    },
  });

  const getCurrentFontName = () => {
    switch (fontTheme) {
      case 0:
        return "Sans-serif";
      case 1:
        return "Serif";
      case 2:
        return "Monospace";
      default:
        return "Sans-serif";
    }
  };

  return (
    <div className="h-screen flex">
      <div className="lg:w-[20%] lg:block hidden">
        <SideBar />
      </div>
      <div className="w-full lg:w-[80%] bg-primary flex flex-col">
        <div className="flex items-center px-8 py-4 bg-secondary lg:hidden">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-primary font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-b border-dark">
          <span className="text-primary font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            Settings
          </span>
          <div className="lg:flex lg:items-center lg:gap-6 hidden">
            <label
              className="border rounded-lg border-dark flex items-center px-5 py-3 gap-2"
              htmlFor="search"
            >
              <IoIosSearch className="text-tertiary w-6 h-6" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search by title, content, or tags…"
                className="text-tertiary font-normal text-sm -pt-3 border-none outline-none bg-transparent"
              />
            </label>
            <CiSettings className="text-tertiary w-6 h-6" />
          </div>
        </div>
        <div className="h-screen flex">
          <div
            className={`bg-primary lg:w-[25%] ${
              selectedTabs !== null ? "hidden" : "w-full"
            }  p-5 border-r border-dark lg:flex lg:flex-col lg:gap-4 lg:px-7 lg:py-5`}
          >
            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 0 ? "bg-secondary" : ""
              }  p-3 rounded-md `}
              onClick={() => handleTabs(0)}
            >
              <div className="flex items-center justify-start gap-4 text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <GoSun
                  className={`h-6 w-6 ${
                    tabs === 0 ? "text-accent" : "text-primary"
                  }`}
                />
                Color Theme
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-primary " />
            </button>

            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 1 ? "bg-secondary" : ""
              }  p-3 rounded-md `}
              onClick={() => handleTabs(1)}
            >
              <div className="flex items-center justify-start gap-4 text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <AiOutlineFontSize
                  className={`h-6 w-6 ${
                    tabs === 1 ? "text-accent" : "text-primary"
                  }`}
                />
                <div className="flex flex-col items-start">
                  <span>Font Theme</span>
                  <span className="text-secondary font-normal text-xs">
                    Current: {getCurrentFontName()}
                  </span>
                </div>
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-primary " />
            </button>

            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 2 ? "bg-secondary" : ""
              }  p-3 rounded-md `}
              onClick={() => handleTabs(2)}
            >
              <div className="flex items-center justify-start gap-4 text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]">
                <TbLockPassword
                  className={`h-6 w-6 ${
                    tabs === 2 ? "text-accent" : "text-primary"
                  }`}
                />
                Change Password
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-primary " />
            </button>

            <div className="border-t my-2 border-dark"></div>

            <button
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md `}
            >
              <div
                className="flex items-center justify-start gap-4 text-primary font-medium text-sm tracking-[120%] leading-[-0.2px]"
                onClick={() => mutate()}
              >
                <IoIosLogOut className={`h-6 w-6 text-primary`} />
                {isPending ? "Çıkış yapılıyor..." : "Logout"}
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-primary " />
            </button>

            <BottomMenuBar cls={"mt-130"} />
          </div>

          <div
            className={`bg-primary ${
              selectedTabs !== null ? "w-full" : "hidden"
            }  lg:w-[55%] border-r border-dark px-6 py-5 lg:flex lg:flex-col gap-4`}
          >
            {tabs === 0 && (
              <ColorTheme tabs={tabs} backToSettings={backToSettings} />
            )}
            {tabs === 1 && (
              <FontTheme tabs={tabs} backToSettings={backToSettings} />
            )}
            {tabs === 2 && (
              <ChangePassword tabs={tabs} backToSettings={backToSettings} />
            )}
            <BottomMenuBar cls={"mt-80"} />
          </div>

          <div className="bg-primary hidden lg:w-[20%] lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
