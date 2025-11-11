import SideBar from "../../components/SideBar";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import CreateNewNote from "../../components/CreateNewNote";
import CreateNewNoteButton from "../../components/CreateNewNoteButton";
import { useNavigate } from "react-router-dom";
import BottomMenuBar from "../../components/menu/BottomMenuBar";
import NoteDetails from "../../components/note/NoteDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "../../firebase/fire/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { archiveNote, fetchNotes } from "../../firebase/queries/notes";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";

const Home = () => {
  const queryClient = useQueryClient();

  const [isNewNote, setIsNewNote] = useState(false);
  const [isSelectedId, setIsSelectedId] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsub();
  }, []);
  const { data: notes = [] } = useQuery({
    queryKey: ["notes", userId],
    queryFn: fetchNotes,
    enabled: !!userId,
  });

  const handleDetailNote = (id) => {
    setIsNewNote(false);
    setIsSelectedId(id);
  };
  const handleCreateNewNote = () => {
    setIsNewNote(!isNewNote);
    setIsSelectedId(null);
  };
  const handleBackToList = () => {
    setIsNewNote(false);
    setIsSelectedId(null);
  };
  const { mutate: archiveMutate, isPending: isArchiving } = useMutation({
    mutationFn: archiveNote,
    onMutate: async (noteId) => {
      await queryClient.cancelQueries(["notes", userId]);
      const previousNotes = queryClient.getQueryData(["notes", userId]);

      queryClient.setQueryData(["notes", userId], (old) => {
        if (!old) return []; // eski veri yoksa boş array döndür
        return old.map((note) =>
          note.id === noteId ? { ...note, archived: true } : note
        );
      });

      return { previousNotes };
    },
    onError: (err, noteId, context) => {
      toast.error(`Arşivleme hatası: ${err.message}`);
      queryClient.setQueryData(["notes", userId], context.previousNotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["notes", userId]);
    },
    onSuccess: () => {
      setIsSelectedId(null);
      setIsNewNote(false);
      toast.success("Not arşivlendi!");
    },
  });
  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: async (noteId) => {
      const noteRef = doc(db, "notes", noteId);
      await deleteDoc(noteRef);
    },
    onMutate: async (noteId) => {
      await queryClient.cancelQueries(["notes", userId]);

      const previousNotes = queryClient.getQueryData(["notes", userId]);

      queryClient.setQueryData(["notes", userId], (old) => {
        if (!old) return [];
        return old.filter((note) => note.id !== noteId);
      });

      return { previousNotes };
    },
    onError: (err, noteId, context) => {
      toast.error(`Not silinemedi: ${err.message}`);
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes", userId], context.previousNotes);
      }
    },
    onSuccess: () => {
      toast.success("Not başarıyla silindi!");
      queryClient.invalidateQueries(["notes", userId]);
    },
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
    <div className="h-screen  flex">
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
          <span className="text-primary font-inter font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            All Notes
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
        <div className="h-screen max-h-[90%] flex">
          <div
            className={`bg-primary ${
              isDetailViewActive ? "hidden " : "w-full"
            } lg:w-[25%] lg:flex overflow-y-auto lg:grow custom-scrollbar custom-scrollbar border-r border-dark  lg:flex-col lg:gap-4 lg:px-7 lg:py-5 relative`}
          >
            <div
              className="fixed bottom-15 right-4 z-10 lg:relative lg:bottom-0 lg:right-0 cursor-pointer"
              onClick={handleCreateNewNote}
            >
              <CreateNewNoteButton handleCreateNewNote={handleCreateNewNote} />
            </div>
            <div className="flex flex-col gap-4 px-8 py-3 lg:py-0 lg:px-0 ">
              {filteredNotes && filteredNotes.length > 0 ? (
                filteredNotes
                  .filter((note) => !note.archived)
                  .map((i) => (
                    <div
                      key={i.id}
                      className={`flex flex-col gap-2 ${
                        i.id === isSelectedId ? "bg-secondary" : ""
                      } p-3 cursor-pointer hover:bg-secondary/50 border-b border-dark transition-colors`}
                      onClick={() => handleDetailNote(i.id)}
                    >
                      <div className="text-primary font-inter font-semibold text-md tracking-[120%] leading-[-0.3px] line-clamp-2">
                        {i.title || "Untitled Note"}
                      </div>
                      <div className="flex items-center justify-start gap-2 flex-wrap">
                        {i.tags && Array.isArray(i.tags)
                          ? i.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-tag px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-tag"
                              >
                                {tag}
                              </span>
                            ))
                          : null}
                      </div>
                      <div>
                        <p className="text-secondary font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                          {format(
                            i.updatedAt?.toDate?.() ||
                              i.createdAt?.toDate?.() ||
                              new Date(),
                            "dd MMM yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  {searchTerm ? (
                    <div className="text-placeholder font-inter font-normal text-sm">
                      No notes found for "{searchTerm}"
                    </div>
                  ) : (
                    <div className="text-placeholder font-inter font-normal text-sm">
                      No notes found
                    </div>
                  )}
                </div>
              )}
              <BottomMenuBar />
            </div>
          </div>
          <div
            className={`bg-primary ${
              isDetailViewActive ? "w-full" : "hidden"
            }  lg:w-[55%]  border-r border-dark px-6 py-5 lg:flex lg:flex-col gap-4`}
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
                Lütfen soldan bir not seçin.
              </div>
            )}
          </div>
          <div className="bg-primary hidden  lg:w-[20%]  lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4">
            {isNewNote ? (
              ""
            ) : (
              <>
                <div
                  onClick={() => {
                    if (activeNote) archiveMutate(activeNote.id);
                  }}
                  className={`border border-dark ${
                    isArchiving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent hover:text-primary"
                  } text-secondary rounded-lg flex items-center gap-4 px-4 py-3 cursor-pointer`}
                >
                  <IoArchiveOutline className="w-5 h-5" />
                  <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm">
                    {isArchiving ? "Archiving..." : "Archive Note"}
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

export default Home;
