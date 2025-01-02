import { FaCopy } from "react-icons/fa";
import Header from '../components/Header';
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useBalance } from "wagmi";

const BalanceScreen = () => {

    // Privy hooks
    const { ready, authenticated, login, logout } = usePrivy();

    // WAGMI hooks
    const { address, isConnected } = useAccount();

    const { data: addressData, isError, isLoading } = useBalance({ address });

    const [isCopied, setIsCopied] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const textToCopy = address;
    const displayText = `${textToCopy?.slice(0, 6)}...${textToCopy?.slice(-6)}`;

    const handleCopy = () => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            });
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    if (!ready) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-board bg-cover">
            <div className="flex-grow overflow-y-auto p-2">
                {/* <div className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-36 sm:h-40 rounded-xl mt-4 relative p-12">
                    <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 rounded-full">
                        <button onClick={logout}>
                            X
                        </button>

                    </div>
                </div> */}
                <div className="right-2 fixed">

                    <button
                        className="group flex items-center justify-center relative z-10 [transition:all_0.5s_ease] rounded-[0.375rem] p-[5px] cursor-pointer border bg-[#1d856a] outline-none focus-visible:outline-0"
                    >
                        <svg
                            fill="currentColor"
                            stroke="none"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 overflow-visible [transition:transform_.35s_ease] group-hover:[transition-delay:.25s] [&amp;_path]:[transition:transform_.35s_ease] group-hover:rotate-45"
                        >
                            <path
                                className="group-hover:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)]"
                                d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z"
                            ></path>
                            <path
                                className="group-hover:[transform:rotate(22.5deg)_translate(15.5%,-23%)]"
                                d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z"
                            ></path>
                            <path
                                className="group-hover:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
                                d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z"
                            ></path>
                        </svg>
                    </button>

                </div>

                {ready && authenticated ?
                    <div className="flex-grow flex flex-col items-center justify-start p-4 mt-28">
                        <div className="mt-2 text-2xl sm:text-3xl text-center flex justify-center items-center space-x-2">
                            <span className="truncate max-w-xs text-white">{displayText}</span>
                            <FaCopy
                                className="cursor-pointer text-white hover:text-white"
                                onClick={handleCopy}
                            />

                            {isCopied && <span className="text-sm text-green-500">Copied!</span>}
                            <img onClick={openPopup} className="w-8 h-8" src="/images/verified.png" />
                        </div>

                        <div className="flex flex-col w-[19rem] h-[17.5rem] mt-8 items-center" style={{ backgroundImage: `url("/images/xx.png")`, backgroundSize: "cover" }}>
                            <div className="flex flex-col gap-2 mt-20 justify-center items-center">

                                <span className="text-[20px] font-medium text-slate-200 font-chalk">Reward Amount</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-rubik font-bold text-white">{`${addressData?.formatted.slice(0, 10)} ${addressData?.symbol}`}</span>
                                </div>
                            </div>
                        </div>


                    </div>
                    :
                    <div className='w-full flex gap-8 mt-16'>
                        <div className='w-full flex flex-col p-4 justify-center items-center bg-gray-300 rounded-lg'>
                            <button
                                className="px-4 py-2 text-black rounded w-full max-w-xs h-64 sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
                                onClick={login}
                                type="button"
                            >
                                Login
                            </button>
                        </div>
                    </div>}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-white p-2">
                        <div className="flex flex-col items-center justify-centerp-6 rounded-lg transform scale-100 transition-transform duration-300 hover:scale-105">
                            <img
                                src="/images/message.png"
                                alt="Captured"
                                className="w-full object-cover rounded-lg"
                            />


                            <button
                                onClick={closePopup}
                                className="mt-4 px-6 py-2 bg-gray-500 text-white text-sm font-medium rounded-md shadow hover:shadow-lg transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                )}

            </div>

            <div className="sticky bottom-0 w-full">
                <Header onOptionChange={() => { }} />
            </div>
        </div>
    );
};

export default BalanceScreen;
