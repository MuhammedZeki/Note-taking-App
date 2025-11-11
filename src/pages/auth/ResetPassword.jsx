import { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { LuEyeClosed } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { PWD_REGEX } from "../../regexValid/valid";
import { useMutation } from "@tanstack/react-query";
import { confirmPasswordReset, EmailAuthProvider } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase/fire/firebase";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [isShow, setIsShow] = useState(true);
  const [isShow1, setIsShow1] = useState(true);
  const [oobCode, setOobCode] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });
  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (!code) {
      toast.error("Geçersiz veya eksik bağlantı!");
      return;
    }
    setOobCode(code);
  }, [searchParams]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (newPassword) => {
      if (!oobCode) throw new Error("Kod bulunamadı!");
      await confirmPasswordReset(auth, oobCode, newPassword);
      return "Şifreniz başarıyla değiştirildi ";
    },
    onSuccess: (msg) => {
      toast.success(msg);
      setTimeout(() => navigate("/sign-in"), 2000);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message || "Bir hata oluştu!");
    },
  });

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.warn("Şifreler eşleşmiyor ");
      return;
    }
    mutate(data.newPassword);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#2B303B] h-screen flex items-center justify-center"
    >
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 border border-[#232530] rounded-2xl p-12 m-3 flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Reset Your Password
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-center text-[#CACFD8]">
            Choose a new password to secure your account.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-start">
            <label
              htmlFor="newPassword"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              New Password
              <input
                type="text"
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
                className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
              />
              {errors.newPassword && (
                <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
                  <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
                  {errors.newPassword.message}
                </div>
              )}
              <div className="text-[#717784] absolute top-8 right-4 bg-[url(/images/icon-show-password.svg)] bg-cover bg-no-repeat cursor-pointer">
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
              <div className="flex text-[#99A0AE] items-center mt-2 font-inter font-normal text-sm gap-2">
                <CiCircleInfo className="w-6 h-6 text-[#717784]" />
                At least 8 characters
              </div>
            </label>
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="confirmPassword"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              Confirm New Password
              <input
                type="text"
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
                className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
              />
              {errors.confirmPassword && (
                <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
                  <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
                  {errors.confirmPassword.message}
                </div>
              )}
              <div className="text-[#717784] absolute top-8 right-4 bg-[url(/images/icon-show-password.svg)] bg-cover bg-no-repeat cursor-pointer">
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
            </label>
          </div>

          <button
            disabled={!isValid}
            className="bg-[#335CFF] flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold cursor-pointer"
          >
            {isPending ? "Processing..." : "Update Password"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
