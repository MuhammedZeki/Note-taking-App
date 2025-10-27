import { CiSettings } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";

const BottomMenuBar = ({ cls }) => {
  const locaiton = useLocation();
  const navigate = useNavigate();
  const currentPath = locaiton.pathname;
  const isHome = currentPath === "/";
  //const isSearch = currentPath === "/"
  //const isHome = currentPath === "/"
  const isArchived = currentPath === "/archived-notes";
  const isSettings = currentPath === "/settings";
  return (
    <div className={`lg:hidden flex items-center justify-around ${cls}`}>
      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isHome ? "bg-[#2B303B]" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <TiHomeOutline
          className={` ${isHome ? "text-[#335CFF]" : "text-[#99A0AE]"} w-5 h-5`}
        />
        <span
          className={` ${
            isHome ? "text-[#335CFF]" : "text-[#99A0AE]"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Home
        </span>
      </div>
      <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>
      <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm cursor-pointer">
        <IoIosSearch className="text-[#99A0AE] w-5 h-5" />
        <span
          className={` 
             text-[#99A0AE]
          hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Search
        </span>
      </div>
      <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isArchived ? "bg-[#2B303B]" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/archived-notes")}
      >
        <IoArchiveOutline
          className={` ${
            isArchived ? "text-[#335CFF]" : "text-[#99A0AE]"
          } w-5 h-5`}
        />
        <span
          className={` ${
            isArchived ? "text-[#335CFF]" : "text-[#99A0AE]"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Archived
        </span>
      </div>
      <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

      <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm cursor-pointer">
        <GoTag className="text-[#99A0AE] w-5 h-5" />
        <span
          className={` text-[#99A0AE] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Tags
        </span>
      </div>
      <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isSettings ? "bg-[#2B303B]" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/settings")}
      >
        <CiSettings
          className={` ${
            isSettings ? "text-[#335CFF]" : "text-[#99A0AE]"
          } w-5 h-5`}
        />
        <span
          className={` ${
            isSettings ? "text-[#335CFF]" : "text-[#99A0AE]"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Settings
        </span>
      </div>
    </div>
  );
};

export default BottomMenuBar;
