import SideBar from "../../components/SideBar";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosReturnLeft } from "react-icons/io";
import BottomMenuBar from "../../components/menu/BottomMenuBar";
import CreateNewNote from "../../components/CreateNewNote";
import CreateNewNoteButton from "../../components/CreateNewNoteButton";
import NoteDetails from "../../components/note/NoteDetails";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchArchivedNotes,
  restoreNote,
  deleteNote,
} from "../../firebase/queries/notes";
import { format } from "date-fns";
import { toast } from "react-toastify";

const ArchivedNotes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [isSelectedId, setIsSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["archivedNotes", userId],
    queryFn: fetchArchivedNotes,
    enabled: !!userId,
  });

  const handleDetailNote = (id) => {
    setIsNewNote(false);
    setIsSelectedId(id);
  };
  // const handleCreateNewNote = () => {
  //   setIsNewNote(!isNewNote);
  //   setIsSelectedId(null);
  // };
  const handleBackToList = () => {
    setIsNewNote(false);
    setIsSelectedId(null);
  };

  const { mutate: restoreMutate, isPending: isRestoring } = useMutation({
    mutationFn: restoreNote,
    onSuccess: () => {
      toast.success("Not geri alındı!");
      queryClient.invalidateQueries(["archivedNotes", userId]);
      queryClient.invalidateQueries(["notes", userId]);
    },
    onError: (err) => toast.error("Geri alma hatası: " + err.message),
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Not kalıcı olarak silindi!");
      queryClient.invalidateQueries(["archivedNotes", userId]);
    },
    onError: (err) => toast.error("Silme hatası: " + err.message),
  });
  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.tags &&
        Array.isArray(note.tags) &&
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );
  const activeNote = filteredNotes.find((i) => i.id === isSelectedId);
  const isDetailViewActive = isNewNote || activeNote;
  return (
    <div className="h-screen flex">
      <div className="lg:w-[20%] lg:block hidden">
        <SideBar />
      </div>
      <div className="w-full lg:w-[80%] bg-[#0E121B] flex flex-col">
        {/* Üst Bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-b-[#232530]">
          <span className="text-[#E0E4EA] font-inter font-bold text-2xl tracking-[-0.5px]">
            Archived Notes
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
                className="text-[#99A0AE] font-inter font-normal text-sm -pt-3 border-none outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <CiSettings
              className="text-[#99A0AE] w-6 h-6 cursor-pointer"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>

        {/* İçerik */}
        <div className="h-screen flex max-h-[90%]">
          {/* Sol Liste */}
          <div
            className={`bg-[#0E121B] ${
              isDetailViewActive ? "hidden" : "w-full"
            } lg:w-[25%] lg:flex overflow-y-auto border-r border-r-[#232530] flex-col gap-4 px-7 py-5`}
          >
            {isLoading ? (
              <div className="text-[#99A0AE]">Loading archived notes...</div>
            ) : notes.length === 0 ? (
              <div className="text-[#99A0AE]">Hiç arşivlenmiş not yok.</div>
            ) : (
              filteredNotes.map((i) => (
                <div
                  key={i.id}
                  onClick={() => handleDetailNote(i.id)}
                  className={`flex flex-col gap-2 ${
                    i.id === isSelectedId ? "bg-[#232530]" : ""
                  } rounded-lg p-3 cursor-pointer`}
                >
                  <div className="text-[#E0E4EA] font-semibold">{i.title}</div>
                  <div className="flex gap-2">
                    {i.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#525866] px-1.5 py-0.5 text-xs rounded-sm text-[#E0E4EA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#CACFD8] text-xs">
                    {format(
                      i.createdAt?.toDate?.() || new Date(),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              ))
            )}
            <BottomMenuBar cls={"mt-6"} />
          </div>

          {/* Orta Detay Alanı */}
          <div
            className={`bg-[#0E121B] ${
              isDetailViewActive ? "w-full" : "hidden"
            } lg:w-[55%] border-r border-r-[#232530] px-6 py-5 lg:flex flex-col gap-4`}
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
                Soldan bir not seçin.
              </div>
            )}
          </div>

          {/* Sağ Menü */}
          <div className="bg-[#0E121B] hidden lg:w-[20%] lg:px-6 lg:py-5 lg:flex flex-col gap-4">
            {activeNote && (
              <>
                <div
                  onClick={() => {
                    if (activeNote) restoreMutate(activeNote.id);
                  }}
                  className={`border border-[#232530] ${
                    isRestoring
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#335CFF] hover:text-white"
                  } text-[#CACFD8] rounded-lg flex items-center gap-4 px-4 py-3 cursor-pointer`}
                >
                  <IoIosReturnLeft className="w-5 h-5" />
                  <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm">
                    {isRestoring ? "Restoring..." : "Restoring"}
                  </span>
                </div>
                <div
                  onClick={() => {
                    if (activeNote) deleteMutate(activeNote.id);
                  }}
                  className={`border border-[#232530] ${
                    isDeleting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-white hover:bg-red-700"
                  } text-[#CACFD8] rounded-lg flex items-center gap-4 px-4 py-3 cursor-pointer`}
                >
                  <RiDeleteBin5Line className="w-5 h-5" />
                  <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm">
                    {isDeleting ? "Deleting..." : "Delete Note"}
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

export default ArchivedNotes;
