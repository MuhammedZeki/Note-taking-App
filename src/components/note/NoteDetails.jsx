import React from "react";
import { FaHashtag } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import BottomMenuBar from "../menu/BottomMenuBar";

const NoteDetails = ({ noteDetail: note, handleBackToList }) => {
  console.log("details", note);
  return (
    <>
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
        {note.title}
      </div>
      <div className="flex flex-col gap-6 text-[#CACFD8] border-b border-b-[#232530] pb-8">
        <div className="flex items-center gap-x-30">
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <FaHashtag className="w-6 h-6" />
            <span>Tags</span>
          </div>
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>{note.tags.join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <GoClock className="w-6 h-6" />
            <span>Last edited</span>
          </div>
          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>{note.date}</span>
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
          {note.content}
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
      <BottomMenuBar cls={"mt-10"} />
    </>
  );
};

export default NoteDetails;
