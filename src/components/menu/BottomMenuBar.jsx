import { CiSettings } from "react-icons/ci";
import { IoArchiveOutline } from "react-icons/io5";
import { TiHomeOutline } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";

const BottomMenuBar = ({ cls }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";
  const isArchived = currentPath === "/archived-notes";
  const isSettings = currentPath === "/settings";
  return (
    <div
      className={`lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-around bg-secondary rounded-xl shadow-lg ${cls}`}
    >
      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isHome ? "bg-tertiary" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/")}
      >
        <TiHomeOutline
          className={` ${isHome ? "text-accent" : "text-tertiary"} w-5 h-5`}
        />
        <span
          className={` ${
            isHome ? "text-accent" : "text-tertiary"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Home
        </span>
      </div>
      <div className=" h-12 border-r border-dark hidden sm:block"></div>
      {/* <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm cursor-pointer">
        <IoIosSearch className="text-tertiary w-5 h-5" />
        <span
          className={` 
             text-tertiary
          hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Search
        </span>
      </div>
      <div className=" h-12 border-r border-dark hidden sm:block"></div> */}

      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isArchived ? "bg-tertiary" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/archived-notes")}
      >
        <IoArchiveOutline
          className={` ${isArchived ? "text-accent" : "text-tertiary"} w-5 h-5`}
        />
        <span
          className={` ${
            isArchived ? "text-accent" : "text-tertiary"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Archived
        </span>
      </div>
      <div className=" h-12 border-r border-dark hidden sm:block"></div>

      {/* <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm cursor-pointer">
        <GoTag className="text-tertiary w-5 h-5" />
        <span
          className={` text-tertiary hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Tags
        </span>
      </div>
      <div className=" h-12 border-r border-dark hidden sm:block"></div> */}

      <div
        className={`flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 ${
          isSettings ? "bg-tertiary" : ""
        }  rounded-sm cursor-pointer`}
        onClick={() => navigate("/settings")}
      >
        <CiSettings
          className={` ${isSettings ? "text-accent" : "text-tertiary"} w-5 h-5`}
        />
        <span
          className={` ${
            isSettings ? "text-accent" : "text-tertiary"
          } hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]`}
        >
          Settings
        </span>
      </div>
    </div>
  );
};

export default BottomMenuBar;
