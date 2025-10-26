import React from "react";
import { GoPlus } from "react-icons/go";

const CreateNewNoteButton = ({ setIsNewNote, isNewNote }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 bg-[#335CFF] rounded-lg px-4 py-3 text-[#E0E4EA] font-,nter font-medium tracking-[120%] leading-[-0.2px] text-md cursor-pointer"
      onClick={() => setIsNewNote(!isNewNote)}
    >
      <GoPlus className="text-[#E0E4EA] w-6 h-6" />
      Create New Note
    </button>
  );
};

export default CreateNewNoteButton;
