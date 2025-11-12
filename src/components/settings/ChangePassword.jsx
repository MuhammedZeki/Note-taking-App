import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PWD_REGEX } from "../../regexValid/valid";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../firebase/fire/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { toast } from "react-toastify";

const ChangePassword = ({ backToSettings, tabs }) => {
  const [isShow, setIsShow] = useState(true);
  const [isShow1, setIsShow1] = useState(true);
  const [isShow2, setIsShow2] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ oldPassword, newPassword }) => {
      const user = auth.currentUser;
      if (!user?.email) throw new Error("Kullanıcı oturumu bulunamadı!");

      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
    },
    onSuccess: () => {
      toast.success("Şifreniz başarıyla değiştirildi!");
      reset();
    },
    onError: (err) => {
      if (err.code === "auth/wrong-password") toast.error("Eski şifre yanlış!");
      else if (err.code === "auth/weak-password")
        toast.error("Yeni şifre en az 8 karakter olmalı!");
      else toast.error("Bir hata oluştu: " + err.message);
    },
  });

  const _onsubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor!");
      return;
    }

    mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };
  return (
    <form
      onSubmit={handleSubmit(_onsubmit)}
      className="flex flex-col items-start gap-4"
    >
      <div
        className="flex items-center -ml-2 gap-1 lg:hidden cursor-pointer"
        onClick={() => backToSettings(tabs)}
      >
        <MdKeyboardArrowLeft className="text-secondary w-6 h-6" />
        <span className="text-secondary font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
          Settings
        </span>
      </div>
      <div className="font-inter font-semibold text-lg tracking-[120%] leading-[-0.3px] text-primary">
        Change Password
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col gap-2  ">
          <label
            htmlFor="oldPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            Old Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type={`${isShow ? "text" : "password"}`}
              id="oldPassword"
              name="oldPassword"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "Lütfen şifrenizi giriniz!",
                },
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "Şifreniz 8-24 karakter uzunluğunda olmalı ve en az 1 harf, 1 rakam ve 1 özel karakter içermelidir!",
                },
              })}
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Enter old password"
            />
            {isShow ? (
              <IoMdEye
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow(!isShow)}
              />
            ) : (
              <LuEyeClosed
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow(!isShow)}
              />
            )}
          </div>

          {errors.oldPassword && (
            <div className="flex text-[#df3b3b] items-center  mt-2 font-inter font-normal text-sm gap-2">
              <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
              {errors.oldPassword.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="newPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            New Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type={`${isShow1 ? "text" : "password"}`}
              id="newPassword"
              name="newPassword"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "Lütfen şifrenizi giriniz!",
                },
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "Şifreniz 8-24 karakter uzunluğunda olmalı ve en az 1 harf, 1 rakam ve 1 özel karakter içermelidir!",
                },
              })}
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Enter new password"
            />

            {isShow1 ? (
              <IoMdEye
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow1(!isShow1)}
              />
            ) : (
              <LuEyeClosed
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow1(!isShow1)}
              />
            )}
          </div>
          {errors.newPassword && (
            <div className="flex text-[#df3b3b] items-center  mt-2 font-inter font-normal text-sm gap-2">
              <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
              {errors.newPassword.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          <label
            htmlFor="confirmPassword"
            className="font-inter font-medium text-sm tracking-[120%] leading-[-0.3px] text-primary"
          >
            Confirm New Password
          </label>
          <div className="border border-theme rounded-lg px-4 py-3 flex items-center justify-between bg-transparent">
            <input
              type={`${isShow2 ? "text" : "password"}`}
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Lütfen şifrenizi giriniz!",
                },
                pattern: {
                  value: PWD_REGEX,
                  message:
                    "Şifreniz 8-24 karakter uzunluğunda olmalı ve en az 1 harf, 1 rakam ve 1 özel karakter içermelidir!",
                },
              })}
              className="border-none outline-none text-primary pr-20 lg:pr-56 bg-transparent w-full"
              placeholder="Confirm new password"
            />
            {isShow2 ? (
              <IoMdEye
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow2(!isShow2)}
              />
            ) : (
              <LuEyeClosed
                className="w-6 h-6 text-[#717784]"
                onClick={() => setIsShow2(!isShow2)}
              />
            )}
          </div>

          {errors.confirmPassword && (
            <div className="flex text-[#df3b3b] items-center  mt-2 font-inter font-normal text-sm gap-2">
              <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          disabled={!isValid}
          className="px-4 cursor-pointer py-3 rounded-lg bg-accent text-white font-inter font-medium text-sm"
        >
          {isPending ? "Saving..." : "Save Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
