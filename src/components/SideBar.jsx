import { IoMdHome } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isHome = currentPath === "/";
  const isArchive = currentPath === "/archived-notes";
  return (
    <div className="border-r bg-[#0E121B] pb-8 border-r-[#232530] h-screen gap-8 flex flex-col items-start px-5 py-6">
      <div className="flex items-center justify-center ">
        <img src="/images/logo.svg" className="-mr-14" alt="logo" />
        <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
          Notes
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border-b flex pb-4 flex-col gap-2 border-b-[#232530]">
          <div
            className={`flex   ${
              isHome ? "border-[#E0E4EA] bg-[#232530] rounded-lg border" : ""
            } px-3 py-2 items-center gap-18 justify-between cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center">
              <IoMdHome
                className={`${
                  isHome ? "text-[#335CFF]" : "text-[#E0E4EA]"
                }  w-6 h-6`}
              />
              <span className="text-[#E0E4EA] font-inter font-medium tracking-[-0.2px] pl-1.5 leading-[120%] text-sm">
                All Note
              </span>
            </div>
            <MdKeyboardArrowRight className="text-[#E0E4EA] w-6 h-6" />
          </div>
          <div
            className={`flex   ${
              isArchive ? "border-[#E0E4EA] bg-[#232530] rounded-lg border" : ""
            } px-3 py-2 items-center gap-18 justify-between cursor-pointer `}
            onClick={() => navigate("/archived-notes")}
          >
            <div className="flex items-center w-full">
              <IoArchiveOutline
                className={`${
                  isArchive ? "text-[#335CFF]" : "text-[#E0E4EA]"
                }  w-6 h-6`}
              />
              <span className="text-[#E0E4EA] font-inter font-medium tracking-[-0.2px] pl-1.5 leading-[120%] text-sm">
                Archived Notes
              </span>
            </div>
            <MdKeyboardArrowRight className="text-[#E0E4EA] w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <span className="text-[#717784] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
            Tags
          </span>
          <div className="flex flex-col items-start gap-4">
            <div
              className="flex items-center gap-2 justify-start cursor-pointer pr-48"
              onClick={() => navigate(`/selected-tag/Cooking`)}
            >
              <CiHashtag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div
              className="flex items-center gap-2 justify-start pr-48  cursor-pointer"
              onClick={() => navigate(`/selected-tag/Dev`)}
            >
              <FaHashtag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Dev
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <CiHashtag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <GoTag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <CiHashtag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
            <div className="flex items-center gap-2 justify-start">
              <CiHashtag className="text-[#E0E4EA] w-6 h-6" />
              <span className="text-[#E0E4EA] font-inter font-medium text-sm tracking-[-0.2px] leading-[120%]">
                Cooking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
