import { CiCircleInfo, CiSettings } from "react-icons/ci";
import { FaHashtag } from "react-icons/fa";
import { GoClock, GoTag } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoArchiveOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiHomeOutline } from "react-icons/ti";
import BottomMenuBar from "./menu/BottomMenuBar";
import { useForm } from "react-hook-form";
import { initialStateForm } from "../schema/form.schema";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const CreateNewNote = ({ handleBackToList }) => {
  const queryClient = useQueryClient();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialStateForm,
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (newNote) => {
      const user = auth.currentUser;
      await addDoc(collection(db, "notes"), {
        ...newNote,
        createdAt: serverTimestamp(),
        archived: false,
        userId: user.uid,
      });
      return user.uid;
    },
    onSuccess: (userId) => {
      toast.success("Not başarıyla eklendi!");
      queryClient.invalidateQueries(["notes", userId]);
      reset();
      handleBackToList();
    },
    onError: (err) => {
      toast.error(`Not eklenemedi: ${err.message}`);
    },
  });
  const _onsubmit = () => {
    mutate({
      title: getValues().title,
      tags: getValues()
        .tags.split(",")
        .map((tag) => tag.trim()),
      content: getValues().content,
    });
  };
  return (
    <form onSubmit={handleSubmit(_onsubmit)}>
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
      <input
        className="text-[#CACFD8] p-1 border border-transparent outline-none 
  font-inter font-bold text-2xl leading-[-0.5px] tracking-[120%]
  focus:border-[#335CFF] focus:rounded-sm focus:ring-0 transition-all duration-200"
        type="text"
        name="title"
        id="name"
        {...register("title", {
          required: {
            value: true,
            message: "Bu alan zorunludur!",
          },
          minLength: {
            value: 3,
            message: "Başlık az 3 karakter olmak zorundadır!",
          },
        })}
        placeholder="Enter a title..."
      />

      {errors.title && (
        <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
          <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
          {errors.title.message}
        </div>
      )}
      <div className="flex flex-col gap-6 my-2 text-[#CACFD8] border-b border-b-[#232530] pb-8">
        <div className="flex items-center sm:gap-x-5 ">
          <label
            htmlFor="tags"
            className="flex items-center py-1 border border-transparent focus-within:border-[#335CFF] focus-within:rounded-sm focus-within:py-1 transition-all duration-200 gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm"
          >
            <FaHashtag className="w-6 h-6" />
            <input
              type="text"
              name="tags"
              id="tags"
              {...register("tags", {
                required: {
                  value: true,
                  message: "En az bir tag giriniz",
                },
              })}
              className="border-none outline-none"
              placeholder="Enter a Tag"
            />
          </label>

          <div className="flex items-center gap-1 font-inter font-normal leading-[-0.2px] tracking-[130%] text-sm">
            <span>Add tags separated by commas (e.g. Work, Planning)</span>
          </div>
        </div>
        {errors.tags && (
          <div className="flex text-[#df3b3b] items-center -mt-5 font-inter font-normal text-sm gap-2">
            <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
            {errors.tags.message}
          </div>
        )}
        <div className="flex items-center gap-31 lg:gap-36">
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
          name="content"
          id="content"
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
          className="w-full text-[#CACFD8] font-inter font-normal text-sm tracking-[130%]
  leading-[-0.2px] p-2 resize-none outline-none border border-transparent
  focus:border-[#335CFF] focus:ring-0 focus:rounded-sm transition-all duration-200"
        ></textarea>
        {errors.content && (
          <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
            <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
            {errors.content.message}
          </div>
        )}
      </div>
      <div className="hidden lg:flex lg:items-center lg:gap-4 lg:pt-4">
        <button
          className={`bg-[#335CFF] text-white rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]  ${
            isPending ? "opacity-70 cursor-wait" : "cursor-pointer"
          }`}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Note"}
        </button>
        <button className="bg-[#232530] text-[#99A0AE] rounded-lg px-4 py-3 font-inter font-medium text-sm tracking-[120%] leading-[-0.2px]">
          Cancel
        </button>
      </div>
      <BottomMenuBar cls={"mt-2"} />
    </form>
  );
};

export default CreateNewNote;
