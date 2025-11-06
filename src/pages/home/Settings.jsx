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
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [tabs, setTabs] = useState(0);
  const [selectedTabs, setSelectedTabs] = useState(null);
  const navigate = useNavigate();
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
          <div
            className={`bg-[#0E121B] lg:w-[25%] ${
              selectedTabs !== null ? "hidden" : "w-full"
            }  p-5 border-r border-r-[#232530] lg:flex lg:flex-col lg:gap-4 lg:px-7 lg:py-5`}
          >
            <button
              className={`flex items-center justify-between cursor-pointer ${
                tabs === 0 ? "bg-[#232530]" : ""
              }  p-3 rounded-md `}
              onClick={() => handleTabs(0)}
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
              onClick={() => handleTabs(1)}
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
              onClick={() => handleTabs(2)}
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
            <div className="border-t my-2 border-t-[#232530]"></div>
            <button
              className={`flex items-center justify-between cursor-pointer p-3 rounded-md `}
            >
              <div
                className="flex items-center justify-start gap-4 text-[#E0E4EA] font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]"
                onClick={() => mutate()}
              >
                <IoIosLogOut className={`h-6 w-6 text-[#E0E4EA]`} />
                {isPending ? "Çıkış yapılıyor..." : "Logout"}
              </div>
              <MdKeyboardArrowRight className="h-6 w-6 text-[#E0E4EA] " />
            </button>
            <BottomMenuBar cls={"mt-130"} />
          </div>
          <div
            className={`bg-[#0E121B] ${
              selectedTabs !== null ? "w-full" : "hidden"
            }  lg:w-[55%] border-r border-r-[#232530] px-6 py-5 lg:flex lg:flex-col gap-4`}
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
          <div className="bg-[#0E121B] hidden  lg:w-[20%] lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
