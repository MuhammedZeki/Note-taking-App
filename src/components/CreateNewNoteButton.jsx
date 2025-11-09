import { GoPlus } from "react-icons/go";

const CreateNewNoteButton = ({ handleCreateNewNote }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 bg-[#335CFF] rounded-full lg:rounded-lg px-4 py-3 text-[#E0E4EA]  font-medium tracking-[120%] leading-[-0.2px] text-md cursor-pointer"
      onClick={() => handleCreateNewNote()}
    >
      <GoPlus className="text-[#E0E4EA] w-6 h-6" />
      <span className="hidden lg:block">Create New Note</span>
    </button>
  );
};

export default CreateNewNoteButton;
