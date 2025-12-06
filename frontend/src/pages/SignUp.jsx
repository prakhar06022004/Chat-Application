function SignUp() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-2">
      <div className="w-full max-w-[500px] h-[500px] border-2 border-[#20c7ff] shadow-xl shadow-gray-300 rounded-[10px] flex flex-col overflow-hidden">
        <div className="bg-[#20c7ff] w-full sm:h-[150px] h-[120px] rounded-b-full flex justify-center items-center text-center">
          <h1 className="font-lobster sm:text-4xl text-3xl sm:mb-0 mb-5 font-bold">
            Welcome to <span className="text-[#ededed]">Pakhiii</span>
          </h1>
        </div>
        <form className="flex flex-col justify-center items-center w-full mt-4 gap-5 px-2">
          <input
            type="text"
            placeholder="Username"
            className="
    w-full p-2 rounded-2xl outline-none
    border border-[#20c7ff]
    focus:border-[#20c7ff]
    focus:ring-1 focus:ring-[#20c7ff]
    transition-all duration-300
  "
          />

          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="    w-full p-2 rounded-2xl outline-none
    border border-[#20c7ff]
    focus:border-[#20c7ff]
    focus:ring-1 focus:ring-[#20c7ff]
    transition-all duration-300"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            className="    w-full p-2 rounded-2xl outline-none
    border border-[#20c7ff]
    focus:border-[#20c7ff]
    focus:ring-1 focus:ring-[#20c7ff]
    transition-all duration-300"
          />
          <button className="bg-[#20c7ff] py-2 px-4 cursor-pointer rounded-3xl text-white">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
