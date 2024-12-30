"use client";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const LoginScreen = () => {
  const navigate = useNavigate();
  // Privy hooks
  const {
    ready,
    authenticated,
    login
  } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between h-screen py-8 bg-home px-4 sm:px-8">
      <div className="bg-home rounded-full w-36 h-12 flex items-center justify-center p-2 sm:w-48 sm:h-14">
        <h1 className="text-xl font-bold text-white sm:text-2xl">SnapSort</h1>
      </div>
      <div className="flex flex-col items-center mt-8 sm:mt-12">
        <div className="w-56 h-56 flex items-center justify-center">
          <img src="/images/home.jpg" />
        </div>
      </div>
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        {ready && !authenticated && (
          <>
            <div className="flex items-center gap-4">
              <button
                className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
                onClick={login}
                type="button"
              >
                Login
              </button>
            </div>
          </>
        )}
        {ready && authenticated && (
          <>
            <button
              className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
              onClick={() => navigate("/screen3")}
              type="button"
            >
              Launch
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
