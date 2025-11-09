import { FaHashtag } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiArchiveOut } from "react-icons/bi";
import BottomMenuBar from "../menu/BottomMenuBar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNoteMutations } from "../../hooks/useNoteMutations";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NoteDetails = ({ noteDetail: note, handleBackToList }) => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  const isArchivedPage = location.pathname === "/archived-notes";

  const { deleteMutation, archiveMutation, updateMutation, restoreMutation } =
    useNoteMutations(queryClient, userId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      tags: "",
      content: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (note) {
      setValue("title", note.title || "");
      setValue("content", note.content || "");

      if (note.tags && Array.isArray(note.tags)) {
        setValue("tags", note.tags.join(", "));
      } else if (typeof note.tags === "string") {
        setValue("tags", note.tags);
      } else {
        setValue("tags", "");
      }
    }
  }, [note, setValue]);

  const onSubmit = (data) => {
    const formattedTags = data.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    updateMutation.mutate({
      noteId: note.id,
      updatedData: {
        title: data.title,
        content: data.content,
        tags: formattedTags,
      },
    });
  };

  const handleDelete = () => {
    if (note) {
      deleteMutation.mutate(note.id, {
        onSuccess: () => {
          handleBackToList();
        },
      });
    }
  };

  const handleArchive = () => {
    if (note && !isArchivedPage) {
      archiveMutation.mutate(note.id, {
        onSuccess: () => {
          handleBackToList();
        },
      });
    }
  };

  const handleRestore = () => {
    if (note && isArchivedPage) {
      restoreMutation.mutate(note.id, {
        onSuccess: () => {
          handleBackToList();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex items-center justify-between w-full lg:hidden">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleBackToList}
        >
          <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
          <span className="text-secondary text-sm">Go Back</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <RiDeleteBin5Line
            className={`text-secondary w-5 h-5 cursor-pointer ${
              deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDelete}
          />

          {isArchivedPage ? (
            <BiArchiveOut
              className={`text-secondary w-5 h-5 cursor-pointer ${
                restoreMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleRestore}
              title="Restore Note"
            />
          ) : (
            <IoArchiveOutline
              className={`text-secondary w-5 h-5 cursor-pointer ${
                archiveMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleArchive}
              title="Archive Note"
            />
          )}

          <span
            className="text-secondary text-sm cursor-pointer"
            onClick={handleBackToList}
          >
            Cancel
          </span>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className={`${
              updateMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            } text-accent font-normal text-sm`}
          >
            {updateMutation.isPending ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>

      <input
        className="text-primary  p-1 border border-transparent outline-none 
        font-bold text-2xl leading-[-0.5px] tracking-[120%] bg-transparent
        focus:border-accent focus:rounded-sm focus:ring-0 transition-all duration-200 mt-4 lg:mt-0"
        type="text"
        {...register("title", {
          required: {
            value: true,
            message: "Bu alan zorunludur!",
          },
          minLength: {
            value: 3,
            message: "Başlık en az 3 karakter olmak zorundadır!",
          },
        })}
        placeholder="Enter a title..."
      />

      {errors.title && (
        <div className="flex text-[#df3b3b] items-center mt-2 font-normal text-sm gap-2">
          <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
          {errors.title.message}
        </div>
      )}

      <div className="flex flex-col gap-6 text-secondary border-b border-dark pb-8 mt-4">
        <div className="flex items-center gap-x-30">
          <div className="flex items-center gap-1 font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <FaHashtag className="w-6 h-6" />
            <span>Tags</span>
          </div>
          <label
            htmlFor="tags"
            className="flex items-center py-1 border border-transparent focus-within:border-accent focus-within:rounded-sm focus-within:py-1 transition-all duration-200 gap-1 font-normal leading-[-0.2px] tracking-[130%] text-sm"
          >
            <input
              type="text"
              id="tags"
              {...register("tags")}
              className="border-none outline-none bg-transparent text-secondary w-64"
              placeholder="react, javascript, web"
            />
          </label>
        </div>

        <div className="flex items-center gap-20">
          <div className="flex items-center gap-1 font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <GoClock className="w-6 h-6" />
            <span>Last edited</span>
          </div>
          <div className="flex items-center gap-1 font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>
              {format(
                note.updatedAt?.toDate?.() ||
                  note.createdAt?.toDate?.() ||
                  new Date(),
                "dd MMM yyyy"
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <textarea
          {...register("content", {
            required: {
              value: true,
              message: "Bir içerik giriniz",
            },
            minLength: {
              value: 1,
              message: "En az 1 karakter giriniz",
            },
          })}
          rows={22}
          placeholder="Start typing your note here…"
          className="w-full text-secondary font-normal text-sm tracking-[130%]
          leading-[-0.2px] p-2 resize-none outline-none border border-transparent bg-transparent
          focus:border-accent focus:ring-0 focus:rounded-sm transition-all duration-200 flex-1"
        />
        {errors.content && (
          <div className="flex text-[#df3b3b] items-center mt-2 font-normal text-sm gap-2">
            <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
            {errors.content.message}
          </div>
        )}
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-4 lg:pt-4">
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-accent cursor-pointer text-white rounded-lg px-4 py-3 font-medium text-sm tracking-[120%] leading-[-0.2px] disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save Note"}
        </button>
        <button
          type="button"
          className="bg-secondary text-tertiary rounded-lg px-4 py-3 font-medium text-sm tracking-[120%] leading-[-0.2px] cursor-pointer"
          onClick={() => {
            reset();
            if (note) {
              setValue("title", note.title || "");
              setValue("content", note.content || "");
              if (note.tags && Array.isArray(note.tags)) {
                setValue("tags", note.tags.join(", "));
              }
            }
          }}
        >
          Cancel
        </button>
      </div>

      <BottomMenuBar />
    </form>
  );
};

export default NoteDetails;
