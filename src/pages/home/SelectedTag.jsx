import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { IoIosSearch } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { GoTag } from "react-icons/go";
import { useTagNotes } from "../../hooks/useTagNotes";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archiveNote,
  updateNote,
  deleteNote,
} from "../../firebase/queries/notes";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CreateNewNoteButton from "../../components/CreateNewNoteButton";
import BottomMenuBar from "../../components/menu/BottomMenuBar";

const SelectedTag = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: notes = [], isLoading, error } = useTagNotes(name);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(null);
  const [isNewNote, setIsNewNote] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedNote) {
      setValue("title", selectedNote.title || "");
      setValue("content", selectedNote.content || "");
      setValue("tags", selectedNote.tags || []);
    } else {
      reset();
    }
  }, [selectedNote, setValue, reset]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    setIsNewNote(false);
  };

  const handleCreateNewNote = () => {
    setIsNewNote(true);
    setSelectedNote(null);
    reset();
  };

  const handleBackToList = () => {
    setIsNewNote(false);
    setSelectedNote(null);
    reset();
  };

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      toast.success("Not güncellendi!");
      queryClient.invalidateQueries(["tagNotes", name]);
      setSelectedNote(null);
    },
    onError: (error) => {
      toast.error(`Güncelleme hatası: ${error.message}`);
    },
  });

  const { mutate: archiveMutate, isPending: isArchiving } = useMutation({
    mutationFn: archiveNote,
    onSuccess: () => {
      toast.success("Not arşivlendi!");
      queryClient.invalidateQueries(["tagNotes", name]);
      setSelectedNote(null);
    },
    onError: (error) => {
      toast.error(`Arşivleme hatası: ${error.message}`);
    },
  });

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Not silindi!");
      queryClient.invalidateQueries(["tagNotes", name]);
      setSelectedNote(null);
    },
    onError: (error) => {
      toast.error(`Silme hatası: ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    if (selectedNote) {
      updateMutate({
        noteId: selectedNote.id,
        updatedData: {
          title: data.title,
          content: data.content,
          tags: data.tags,
          updatedAt: new Date(),
        },
      });
    }
  };

  const isDetailViewActive = isNewNote || selectedNote;

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
          <span className="text-primary font-inter font-bold text-2xl tracking-[-0.5px] leading-[120%]">
            Notes Tagged: {name}
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
            } lg:w-[25%] lg:flex overflow-y-auto lg:grow custom-scrollbar custom-scrollbar border-r border-dark lg:flex-col lg:gap-4 lg:px-7 lg:py-5 relative`}
          >
            <div
              className="fixed bottom-15 right-4 z-10 lg:relative lg:bottom-0 lg:right-0 cursor-pointer"
              onClick={handleCreateNewNote}
            >
              <CreateNewNoteButton handleCreateNewNote={handleCreateNewNote} />
            </div>

            <div className="text-primary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] mb-4">
              {isLoading
                ? "Loading notes..."
                : error
                ? "Error loading notes"
                : filteredNotes.length === 0
                ? `No notes found with "${name}" tag`
                : `All notes with the "${name}" tag are shown here. (${filteredNotes.length})`}
            </div>

            <div className="flex flex-col gap-4 px-8 py-3 lg:py-0 lg:px-0">
              {isLoading ? (
                <div className="text-primary text-center py-4">Loading...</div>
              ) : error ? (
                <div className="text-red-400 text-center py-4">
                  Error loading notes
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="text-placeholder text-center py-4">
                  No notes found
                </div>
              ) : (
                filteredNotes
                  .filter((note) => !note.archived)
                  .map((note) => (
                    <div
                      key={note.id}
                      className={`flex flex-col gap-2 ${
                        selectedNote?.id === note.id ? "bg-secondary" : ""
                      } rounded-lg p-3 cursor-pointer hover:bg-secondary/50 transition-colors`}
                      onClick={() => handleNoteSelect(note)}
                    >
                      <div className="text-primary font-inter font-semibold text-md tracking-[120%] leading-[-0.3px] line-clamp-2">
                        {note.title || "Untitled Note"}
                      </div>

                      <div className="flex items-center justify-start gap-2 flex-wrap">
                        {note.tags && Array.isArray(note.tags)
                          ? note.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="bg-tag px-1.5 py-0.5 font-inter font-normal text-xs tracking-[120%] leading-[-0.2px] rounded-sm text-tag"
                              >
                                {tag}
                              </span>
                            ))
                          : null}
                        {note.tags && note.tags.length > 3 && (
                          <span className="text-placeholder text-xs">
                            +{note.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="text-secondary font-inter font-normal text-xs tracking-[120%] px-1.5 py-0.5 leading-[-0.2px]">
                          {format(
                            note.updatedAt?.toDate?.() ||
                              note.createdAt?.toDate?.() ||
                              new Date(),
                            "dd MMM yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
            <div className="lg:hidden">
              <BottomMenuBar />
            </div>
          </div>

          {/* Main Content - Note Detail */}
          <div
            className={`bg-primary ${
              isDetailViewActive ? "w-full" : "hidden"
            } lg:w-[55%] border-r border-dark px-6 py-5 lg:flex lg:flex-col gap-4`}
          >
            {isNewNote ? (
              <div className="text-tertiary text-center mt-20">
                Yeni not oluşturmak için ana sayfaya gidin.
              </div>
            ) : selectedNote ? (
              <>
                {/* Mobile Header */}
                <div className="flex items-center justify-between w-full lg:hidden">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleBackToList}
                  >
                    <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
                    <span className="text-secondary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
                      Back
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <RiDeleteBin5Line
                      className="text-secondary w-5 h-5 cursor-pointer"
                      onClick={() => deleteMutate(selectedNote.id)}
                    />
                    <IoArchiveOutline
                      className="text-secondary w-5 h-5 cursor-pointer"
                      onClick={() => archiveMutate(selectedNote.id)}
                    />
                    <span
                      className="text-secondary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] cursor-pointer"
                      onClick={handleBackToList}
                    >
                      Cancel
                    </span>
                    <span
                      className="text-accent font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] cursor-pointer"
                      onClick={handleSubmit(onSubmit)}
                    >
                      {isUpdating ? "Saving..." : "Save Note"}
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 h-full"
                >
                  <input
                    {...register("title")}
                    className="text-primary font-inter font-bold text-2xl leading-[-0.5px] tracking-[120%] bg-transparent border-none outline-none w-full"
                    placeholder="Note Title"
                  />

                  <div className="flex flex-col gap-6 text-secondary border-b border-dark pb-8">
                    <div className="flex items-center gap-x-30">
                      <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                        <GoTag className="w-6 h-6" />
                        <span>Tags</span>
                      </div>
                      <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                        <span>
                          {selectedNote.tags && Array.isArray(selectedNote.tags)
                            ? selectedNote.tags.join(", ")
                            : "No tags"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-20">
                      <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                        <GoTag className="w-6 h-6" />
                        <span>Last edited</span>
                      </div>
                      <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
                        <span>
                          {format(
                            selectedNote.updatedAt?.toDate?.() ||
                              selectedNote.createdAt?.toDate?.() ||
                              new Date(),
                            "dd MMM yyyy"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <textarea
                    {...register("content")}
                    rows={22}
                    className="w-full text-secondary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px] py-2 resize-none bg-transparent border-none outline-none flex-1"
                    placeholder="Start writing your note..."
                  />

                  <div className="hidden lg:flex lg:items-center lg:gap-4 lg:pt-4">
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-accent text-white rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px] hover:bg-accent-hover transition-colors disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save Note"}
                    </button>
                    <button
                      type="button"
                      onClick={handleBackToList}
                      className="bg-secondary text-tertiary rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px] hover:bg-secondary/80 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-tertiary text-center mt-20 hidden lg:block">
                Lütfen soldan bir not seçin.
              </div>
            )}

            <div className="lg:hidden mt-6">
              <BottomMenuBar />
            </div>
          </div>

          <div className="bg-primary hidden lg:w-[20%] lg:px-6 lg:py-5 lg:flex lg:flex-col lg:gap-4">
            {selectedNote && (
              <>
                <div
                  onClick={() => {
                    if (!isArchiving) archiveMutate(selectedNote.id);
                  }}
                  className={`border border-dark ${
                    isArchiving
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-accent hover:text-primary cursor-pointer"
                  } text-secondary rounded-lg flex items-center gap-4 px-4 py-3 transition-colors`}
                >
                  <IoArchiveOutline className="w-5 h-5" />
                  <span className="font-inter font-medium tracking-[120%] leading-[-0.2px] text-sm">
                    {isArchiving ? "Archiving..." : "Archive Note"}
                  </span>
                </div>
                <div
                  onClick={() => {
                    if (!isDeleting) deleteMutate(selectedNote.id);
                  }}
                  className={`border border-dark ${
                    isDeleting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-primary hover:bg-red-700 cursor-pointer"
                  } text-secondary rounded-lg flex items-center gap-4 px-4 py-3 transition-colors`}
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

export default SelectedTag;
