import SideBar from "../../components/SideBar";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import CreateNewNote from "../../components/CreateNewNote";
import CreateNewNoteButton from "../../components/CreateNewNoteButton";
import { useNavigate } from "react-router-dom";
import BottomMenuBar from "../../components/menu/BottomMenuBar";
import NoteDetails from "../../components/note/NoteDetails";
const notesData = [
  {
    id: "n1",
    title: "React Performance Optimization",
    tags: ["Dev", "React"],
    date: "29 Oct 2024",
    content: "Key performance optimization techniques: 1. Code Splitting...",
  },
  {
    id: "n2",
    title: "Fitness Goals 2025",
    tags: ["Fitness", "Health", "Personal"],
    date: "22 Sep 2024",
    content: "My fitness goals for 2025 include...",
  },
  {
    id: "n3",
    title: "Merhabalar v1",
    tags: ["Work", "Alpha"],
    date: "28 Oct 2024",
    content: "Discussed new features for Project Alpha...",
  },
  {
    id: "n4",
    title: "Merhabalar v2",
    tags: ["Work", "Alpha"],
    date: "28 Oct 2024",
    content: "Discussed new features for Project Alpha...",
  },
  {
    id: "n5",
    title: "Merhabalar v3",
    tags: ["Work", "Alpha"],
    date: "28 Oct 2024",
    content: "Discussed new features for Project Alpha...",
  },
  {
    id: "n6",
    title: "Project Alpha Meeting Notes",
    tags: ["Work", "Alpha"],
    date: "28 Oct 2024",
    content: "Discussed new features for Project Alpha...",
  },
  {
    id: "n6",
    title: "Project Alpha Meeting Notes",
    tags: ["Work", "Alpha"],
    date: "28 Oct 2024",
    content: "Discussed new features for Project Alpha...",
  },
];
const Home = () => {
  const [isNewNote, setIsNewNote] = useState(false);
  const [isSelectedId, setIsSelectedId] = useState(notesData[0]?.id || null);
  const activeNote = notesData.find((i) => i.id === isSelectedId);
  const navigate = useNavigate();
  const handleDetailNote = (id) => {
    setIsNewNote(false);
    setIsSelectedId(id);
  };
  const handleCreateNewNote = () => {
    setIsNewNote(!isNewNote);
    setIsSelectedId(null);
  };
  const isDetailViewActive = isNewNote || activeNote;
  const handleBackToList = () => {
    setIsNewNote(false);
    setIsSelectedId(null);
  };
  return (
    <div className="h-screen  flex">
      <div className="lg:w-[20%] lg:block hidden">
        <SideBar />
      </div>
      <div className="w-full lg:w-[80%]  bg-[#0E121B] flex flex-col">
        <div className="flex items-center px-8 py-4 bg-[#232530] lg:hidden">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-b border-b-[#232530]">
          <span className="text-[#E0E4EA] font-inter font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            All Notes
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
            <CiSettings
              className="text-[#99A0AE] w-6 h-6 cursor-pointer"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>
        <div className="h-screen max-h-[90%] flex">
          <div
            className={`bg-[#0E121B] ${
              isDetailViewActive ? "hidden " : "w-full"
            } lg:w-[25%] lg:flex overflow-y-auto lg:grow custom-scrollbar custom-scrollbar border-r border-r-[#232530]  lg:flex-col lg:gap-4 lg:px-7 lg:py-5 relative`}
          >
            <div className="fixed bottom-4 right-4 z-10 lg:hidden ">
              <CreateNewNoteButton handleCreateNewNote={handleCreateNewNote} />
            </div>
            <div className="flex flex-col gap-4 px-8 py-3 lg:py-0 lg:px-0 ">
              {notesData.map((i) => (
                <div
                  className={`flex flex-col gap-2 ${
                    i.id === isSelectedId ? "bg-[#232530]" : ""
                  }  rounded-lg p-3 cursor-pointer`}
                  onClick={() => handleDetailNote(i.id)}
                >
                  <div className="text-[#E0E4EA] font-inter font-semibold text-md tracking-[120%] leading-[-0.3px] ">
                    {i.title}
                  </div>
                  <div className="flex items-center justify-start gap-2">
                    {i.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#525866] px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-[#E0E4EA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="text-[#CACFD8] font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                      {i.date}
                    </p>
                  </div>
                </div>
              ))}
              <BottomMenuBar cls={"mt-22"} />
            </div>
          </div>
          <div
            className={`bg-[#0E121B] ${
              isDetailViewActive ? "w-full" : "hidden"
            }  lg:w-[55%]  border-r border-r-[#232530] px-6 py-5 lg:flex lg:flex-col gap-4`}
          >
            {isNewNote ? (
              <CreateNewNote handleBackToList={handleBackToList} />
            ) : activeNote ? (
              <NoteDetails
                noteDetail={activeNote}
                handleBackToList={handleBackToList}
              />
            ) : (
              <div className="text-[#99A0AE] text-center mt-20 hidden lg:block">
                Lütfen soldan bir not seçin.
              </div>
            )}
          </div>
          <div className="bg-[#0E121B] hidden  lg:w-[20%]  lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4">
            {isNewNote ? (
              ""
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
