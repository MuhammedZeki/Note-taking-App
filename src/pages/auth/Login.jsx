import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PWD_REGEX } from "../../regexValid/valid";
import { initialState } from "../../regexValid/initialState";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialState,
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: (userCredential) => {
      toast.success(`Giriş Başarılı: ${userCredential.user.email}`);
      reset();
      navigate("/");
    },
    onError: (error) => {
      toast.error(`Giriş Başarısız: ${error.message}`);
    },
  });
  const _onsubmit = () => {
    mutate({
      email: getValues().email,
      password: getValues().password,
    });
  };
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 border border-[#232530] rounded-2xl p-12 m-3 flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Welcome to Note
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-[#CACFD8]">
            Please log in to continue
          </p>
        </div>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(_onsubmit)}
        >
          <div className="flex flex-col items-start">
            <label
              htmlFor="email"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3"
            >
              Email Address
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Lütfen bir email adres giriniz",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Lütfen geçerli bir email adresi giriniz",
                },
              })}
              type="text"
              id="email"
              name="email"
              placeholder="email@example.com"
              className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
            />
            {errors.email && (
              <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
                <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start">
            <label
              htmlFor="password"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3 w-full relative"
            >
              Password
              <input
                {...register("password", {
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
                type={`${isShow ? "text" : "password"}`}
                id="password"
                name="password"
                className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
              />
              {errors.password && (
                <div className="flex text-[#df3b3b] items-center mt-2 font-inter font-normal text-sm gap-2">
                  <CiCircleInfo className="w-6 h-6 text-[#df3b3b]" />
                  {errors.password.message}
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
            </label>
          </div>

          <button
            className={`${
              isValid
                ? "bg-[#335CFF] cursor-pointer"
                : "bg-[#c6c9d6] cursor-not-allowed"
            } ${
              isPending ? "opacity-70 cursor-wait" : "cursor-pointer"
            } flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold `}
            disabled={!isValid}
          >
            {isPending ? "Logging In..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col gap-4 items-center border-t border-t-[#232530]">
          <span className="text-[#CACFD8] font-inter font-medium tracking-[-0.2px] text-sm leading-[130%] mt-6">
            Or log in with:
          </span>
          <button className="text-white border border-[#232530] rounded-2xl w-full py-3 font-inter font-semibold text-lg tracking-[-0.3px] leading-[%120] flex items-center justify-center gap-2 cursor-pointer">
            <FaGoogle className="w-5 h-5 text-white" />
            Google
          </button>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            className="text-white font-inter font-normal text-sm tracking-[-0.2px] leading-[120%] cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Do you forgot password?
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#CACFD8] font-inter font-normal text-sm tracking-[-0.2px] leading-[120%]">
              No account yet?
            </span>
            <button
              className="text-white font-inter font-normal text-sm tracking-[-0.2px] leading-[120%] cursor-pointer hover:underline"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
