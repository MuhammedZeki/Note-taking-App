import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { GoTag } from "react-icons/go";
const SelectedTag = () => {
  const { name } = useParams();
  return (
    <div className="h-screen flex">
      <div className="lg:w-[20%] lg:block hidden">
        <SideBar />
      </div>
      <div className="w-full lg:w-[80%]  bg-[#0E121B] flex flex-col">
        <div className="flex items-center justify-between px-8 py-4 border-b border-b-[#232530]">
          <span className="text-[#E0E4EA] font-inter font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            Notes Tagged: {name}
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
            <button className="flex items-center justify-center gap-2 bg-[#335CFF] rounded-lg px-4 py-3 text-[#E0E4EA] font-,nter font-medium tracking-[120%] leading-[-0.2px] text-md">
              <GoPlus className="text-[#E0E4EA] w-6 h-6" />
              Create New Note
            </button>
            <div className="text-[#E0E4EA] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
              All notes with the ”{name}” tag are shown here.
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 bg-[#232530] rounded-lg p-3">
                <div className="text-[#E0E4EA] font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] ">
                  React Performance Optimization
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Dev
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    React
                  </span>
                </div>
                <div>
                  <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                    29 Oct 2024
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-[#0E121B] border-b border-b-[#232530] rounded-lg p-3">
                <div className="text-[#E0E4EA] font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] ">
                  React Performance Optimization
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Dev
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    React
                  </span>
                </div>
                <div>
                  <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                    29 Oct 2024
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-[#0E121B] border-b border-b-[#232530] rounded-lg p-3">
                <div className="text-[#E0E4EA] font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] ">
                  React Performance Optimization
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Dev
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    React
                  </span>
                </div>
                <div>
                  <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                    29 Oct 2024
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-[#0E121B] border-b border-b-[#232530] rounded-lg p-3">
                <div className="text-[#E0E4EA] font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] ">
                  React Performance Optimization
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Dev
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    React
                  </span>
                </div>
                <div>
                  <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                    29 Oct 2024
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-[#0E121B] border-b border-b-[#232530] rounded-lg p-3">
                <div className="text-[#E0E4EA] font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] ">
                  Fitness Goals 2025
                </div>
                <div className="flex items-center justify-start gap-2">
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Fitness
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Health
                  </span>
                  <span className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]">
                    Personal
                  </span>
                </div>
                <div>
                  <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                    22 Sep 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0E121B] w-full lg:w-[55%] border-r border-r-[#232530] px-6 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full lg:hidden">
              <div className="flex items-center gap-1">
                <MdKeyboardArrowLeft className="text-[#CACFD8] w-6 h-6" />
                <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
                  Back
                </span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <RiDeleteBin5Line className="text-[#CACFD8] w-5 h-5" />
                <IoArchiveOutline className="text-[#CACFD8] w-5 h-5" />
                <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
                  Cancel
                </span>
                <span className="text-[#335CFF] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
                  Save Note
                </span>
              </div>
            </div>
            <div className="text-[#E0E4EA] font-inter font-bold text-2xl leading-[-0.5px] tracking-[120%]">
              React Performance Optimization
            </div>
            <div className="flex flex-col gap-6 text-[#CACFD8] border-b border-b-[#232530] pb-8">
              <div className="flex items-center gap-x-30">
                <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                  <FaHashtag className="w-6 h-6" />
                  <span>Tags</span>
                </div>
                <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                  <span>React,Dev</span>
                </div>
              </div>
              <div className="flex items-center gap-20">
                <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                  <GoClock className="w-6 h-6" />
                  <span>Last edited</span>
                </div>
                <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                  <span>29 Oct 2024</span>
                </div>
              </div>
            </div>
            <div className="w-full border-b border-b-[#232530]">
              <textarea
                name=""
                id=""
                rows={22}
                className="w-full text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] py-2 resize-none"
              >
                Key performance optimization techniques: 1. Code Splitting - Use
                React.lazy() for route-based splitting - Implement dynamic
                imports for heavy components 2. Memoization - useMemo for
                expensive calculations - useCallback for function props -
                React.memo for component optimization 3. Virtual List
                Implementation - Use react-window for long lists - Implement
                infinite scrolling TODO: Benchmark current application and
                identify bottlenecks
              </textarea>
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-4 lg:pt-4">
              <button className="bg-[#335CFF] text-white rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Save Note
              </button>
              <button className="bg-[#232530] text-[#99A0AE] rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
                Cancel
              </button>
            </div>
            <div className="lg:hidden mt-6 flex items-center justify-around">
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-2.5 sm:py-1 bg-[#2B303B] rounded-sm">
                <TiHomeOutline className="text-[#335CFF] w-5 h-5" />
                <span className="text-[#335CFF] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                  Home
                </span>
              </div>
              <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm">
                <IoIosSearch className="text-[#99A0AE] w-5 h-5" />
                <span className="text-[#99A0AE] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                  Search
                </span>
              </div>
              <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

              <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm">
                <IoArchiveOutline className="text-[#99A0AE] w-5 h-5" />
                <span className="text-[#99A0AE] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                  Archived
                </span>
              </div>
              <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

              <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm">
                <GoTag className="text-[#99A0AE] w-5 h-5" />
                <span className="text-[#99A0AE] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                  Tags
                </span>
              </div>
              <div className=" h-12 border-r border-r-[#232530] hidden sm:block"></div>

              <div className="flex flex-col items-center justify-center gap-2 px-5 py-1  rounded-sm">
                <CiSettings className="text-[#99A0AE] w-5 h-5" />
                <span className="text-[#99A0AE] hidden sm:block font-inter font-normal text-xs tracking-[120%] leading-[-0.2px]">
                  Settings
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#0E121B] hidden  lg:w-[20%] lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4">
            <div className="border border-[#232530] rounded-lg flex items-center gap-4 px-4 py-3">
              <IoArchiveOutline className="text-[#CACFD8] w-5 h-5" />
              <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm text-[#CACFD8]">
                Archive Note
              </span>
            </div>
            <div className="border border-[#232530] rounded-lg flex items-center gap-4 px-4 py-3">
              <RiDeleteBin5Line className="text-[#CACFD8] w-5 h-5" />
              <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm text-[#CACFD8]">
                Delete Note
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedTag;
