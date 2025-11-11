import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../regexValid/valid";
import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/fire/firebase";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const { isPending, mutate: sendMail } = useMutation({
    mutationFn: async ({ email }) => {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/reset-password",
        handleCodeInApp: true,
      });
      return { email };
    },
    onSuccess: ({ email }) => {
      toast.success("Sıfırlama linki mailinize Gönderildi: " + email);
    },
    onError: (error) => {
      console.error("Firebase Reset Hatası:", error);
      let errorMessage = "Şifre sıfırlama başarısız oldu. Tekrar deneyin.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage =
            "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.";
          break;
        case "auth/invalid-email":
          errorMessage = "Lütfen geçerli bir e-posta adresi girin.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin.";
          break;
        default:
          errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
  const _onsubmit = (data) => {
    sendMail({ email: data.email });
  };
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(_onsubmit)}
        className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 relative border border-[#232530] rounded-2xl p-12 m-3 flex flex-col gap-4"
      >
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Şifrenizi mi unuttunuz?
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-center text-[#CACFD8]">
            E-posta adresinizi aşağıya girin, size şifre sıfırlama bağlantısı
            gönderelim.
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="email" className="text-white text-sm font-medium">
            E-posta Adresi
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
            {...register("email", {
              required: {
                value: true,
                message: "Email adresi giriniz",
              },
              pattern: {
                value: EMAIL_REGEX,
                message: "Lütfen geçerli bir email adresi giriniz",
              },
            })}
            className="text-white px-4 py-3 border border-[#717784] rounded-sm w-full bg-transparent placeholder-[#717784]"
          />
          {errors.email && (
            <div className="p-3 bg-red-900/20 border border-red-400 rounded-lg mt-4">
              <p className="text-red-400 text-sm text-center">
                {errors.email.message}
              </p>
            </div>
          )}
          <button
            disabled={!isValid}
            className="bg-[#335CFF] text-white rounded-lg py-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4fd8] transition-colors cursor-pointer"
          >
            {isPending ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
        <div
          className="absolute top-5 left-5 flex items-center justify-center text-[#CACFD8] hover:text-[#eaeaeb] cursor-pointer transition-colors"
          onClick={() => navigate("/sign-in")}
        >
          <MdKeyboardArrowLeft className="w-6 h-6" />
          <span className="font-inter font-normal text-sm tracking-[130%] leading-[-0.2px]">
            Geri
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
