import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/fire/firebase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/reset-password",
        handleCodeInApp: true,
      });
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 relative border border-[#232530] rounded-2xl p-12 m-3 flex flex-col gap-4">
        <div className="flex items-center justify-center ">
          <img src="/images/logo.svg" className="-mr-14" alt="logo" />
          <p className="text-white font-pacifico text-2xl tracking-[-0.2px]">
            Notes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-white font-inter font-bold text-2xl leading-[1.2] tracking-[-0.5px]">
            Forgotten your password?
          </span>
          <p className="text-sm font-inter font-normal tracking-[-0.2px] text-center text-[#CACFD8]">
            Enter your email below, and we’ll send you a link to reset it.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label htmlFor="email" className="text-white text-sm font-medium">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-[#717784] px-4 py-3 border border-[#717784] rounded-sm w-full"
          />
          <button
            onClick={handleResetPassword}
            className="bg-[#335CFF] text-white rounded-lg py-3 mt-4"
          >
            Send Reset Link
          </button>
          {message && <p className="text-green-400">{message}</p>}
          {error && <p className="text-red-400">{error}</p>}
        </div>
        <div
          className="absolute top-5 left-5 flex items-center justify-center text-[#CACFD8] hover:text-[#eaeaeb] cursor-pointer"
          onClick={() => navigate("/sign-in")}
        >
          <MdKeyboardArrowLeft className=" w-6 h-6 " />
          <span className=" font-inter font-normal  text-sm tracking-[130%]  leading-[-0.2px]">
            Back
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
