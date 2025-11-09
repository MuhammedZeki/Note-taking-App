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
import { auth } from "../../firebase/fire/firebase";
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
      <div className="w-full lg:w-[80%] bg-primary flex flex-col">
        <div className="flex items-center px-8 py-4 bg-secondary lg:hidden">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-primary font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-b border-dark">
          <span className="text-primary font-inter font-bold text-2xl tracking-[-0.5px]">
            Archived Notes
          </span>
          <div className="lg:flex lg:items-center lg:gap-6 hidden">
            <label
              className="border rounded-lg border-dark flex items-center px-5 py-3 gap-2"
              htmlFor="search"
            >
              <IoIosSearch className="text-tertiary w-6 h-6" />
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search by title, content, or tags…"
                className="text-tertiary font-inter font-normal text-sm -pt-3 border-none outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
            <CiSettings
              className="text-tertiary w-6 h-6 cursor-pointer"
              onClick={() => navigate("/settings")}
            />
          </div>
        </div>

        <div className="h-screen flex max-h-[90%]">
          <div
            className={`bg-primary ${
              isDetailViewActive ? "hidden" : "w-full"
            } lg:w-[25%] lg:flex overflow-y-auto border-r border-dark flex-col gap-4 px-7 py-5 custom-scrollbar`}
          >
            {isLoading ? (
              <div className="text-tertiary">Loading archived notes...</div>
            ) : notes.length === 0 ? (
              <div className="text-tertiary">Hiç arşivlenmiş not yok.</div>
            ) : (
              filteredNotes.map((i) => (
                <div
                  key={i.id}
                  onClick={() => handleDetailNote(i.id)}
                  className={`flex flex-col gap-2 ${
                    i.id === isSelectedId ? "bg-secondary" : ""
                  } border-b border-dark p-3 cursor-pointer hover:bg-secondary/50 transition-colors`}
                >
                  <div className="text-primary font-semibold">{i.title}</div>
                  <div className="flex gap-2">
                    {i.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-tag px-1.5 py-0.5 text-xs rounded-sm text-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-secondary text-xs">
                    {format(
                      i.createdAt?.toDate?.() || new Date(),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              ))
            )}
            <BottomMenuBar />
          </div>

          <div
            className={`bg-primary ${
              isDetailViewActive ? "w-full" : "hidden"
            } lg:w-[55%] h-screen overflow-y-auto custom-scrollbar border-r border-dark px-6 py-5 lg:flex flex-col gap-4`}
          >
            {isNewNote ? (
              <CreateNewNote handleBackToList={handleBackToList} />
            ) : activeNote ? (
              <NoteDetails
                noteDetail={activeNote}
                handleBackToList={handleBackToList}
              />
            ) : (
              <div className="text-tertiary text-center mt-20 hidden lg:block">
                Soldan bir not seçin.
              </div>
            )}
          </div>

          <div className="bg-primary hidden lg:w-[20%] lg:px-6 lg:py-5 lg:flex flex-col gap-4">
            {activeNote && (
              <>
                <div
                  onClick={() => {
                    if (activeNote) restoreMutate(activeNote.id);
                  }}
                  className={`border border-dark ${
                    isRestoring
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent hover:text-primary"
                  } text-secondary rounded-lg flex items-center gap-4 px-4 py-3 cursor-pointer`}
                >
                  <IoIosReturnLeft className="w-5 h-5" />
                  <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm">
                    {isRestoring ? "Restoring..." : "Restore Note"}
                  </span>
                </div>
                <div
                  onClick={() => {
                    if (activeNote) deleteMutate(activeNote.id);
                  }}
                  className={`border border-dark ${
                    isDeleting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-primary hover:bg-red-700"
                  } text-secondary rounded-lg flex items-center gap-4 px-4 py-3 cursor-pointer`}
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
