import { CiSettings } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import { GoClock, GoTag } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiHomeOutline } from "react-icons/ti";

const CreateNewNote = ({ handleBackToList }) => {
  return (
    <div>
      <div
        className="flex items-center justify-between w-full lg:hidden cursor-pointer"
        onClick={() => handleBackToList()}
      >
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
        Enter a title...
      </div>
      <div className="flex flex-col gap-6 text-[#CACFD8] border-b border-b-[#232530] pb-8">
        <div className="flex items-center gap-x-30">
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <FaHashtag className="w-6 h-6" />
            <span>Tags</span>
          </div>
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>Add tags separated by commas (e.g. Work, Planning)</span>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <GoClock className="w-6 h-6" />
            <span>Last edited</span>
          </div>
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>Not yet saved</span>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-b-[#232530]">
        <textarea
          name=""
          id=""
          rows={22}
          placeholder="Start typing your note here…"
          className="w-full text-[#CACFD8] font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] p-2 resize-none"
        ></textarea>
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
  );
};

export default CreateNewNote;
