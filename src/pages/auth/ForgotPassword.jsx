const ForgotPassword = () => {
  return (
    <div className="bg-[#2B303B] h-screen flex items-center justify-center">
      <div className="bg-[#0E121B] sm:w-[80%] lg:w-3/4 xl:w-1/3 border border-[#232530] rounded-2xl p-12 flex flex-col gap-4">
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
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-start">
            <label
              htmlFor="email"
              className="text-white font-inter text-sm font-medium tracking-[-0.2px] leading-1.3"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email@example.com"
              className="text-[#717784] px-4 py-3 font-inter text-sm font-medium tracking-[-0.2px] leading-1.4 border border-[#717784] rounded-sm w-full"
            />
          </div>

          <button className="bg-[#335CFF] flex items-center justify-center px-4 py-3 text-white rounded-lg font-inter text-lg tracking-[-0.3px] font-semibold cursor-pointer">
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
