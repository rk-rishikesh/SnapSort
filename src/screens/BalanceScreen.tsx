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
        <div className="flex flex-col min-h-screen bg-home">
            <div className="flex-grow overflow-y-auto p-2">
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-36 sm:h-40 bg-white rounded-xl mt-4 relative p-12">
                    <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 rounded-full">
                        <button onClick={logout}>
                            <img

                                src="/images/user-profile.jpg"
                                alt="User Profile"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white"
                            />
                        </button>

                    </div>
                </div>

                {ready && authenticated ?
                    <div className="flex-grow flex flex-col items-center justify-start p-4 mt-6">
                        <div className="mt-2 text-2xl sm:text-3xl text-center flex justify-center items-center space-x-2">
                            <span className="truncate max-w-xs text-white">{displayText}</span>
                            <FaCopy
                                className="cursor-pointer text-white hover:text-white"
                                onClick={handleCopy}
                            />

                            {isCopied && <span className="text-sm text-green-500">Copied!</span>}
                            <img onClick={openPopup} className="w-8 h-8" src="/images/verified.png" />
                        </div>
   
                        <button className="group relative w-full mt-12 flex justify-center">
                            <div
                                className="w-60 h-60 absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-50 group-hover:blur-2xl"
                            ></div>
                            <div
                                className="w-60 h-60 relative flex justify-center items-center gap-2 rounded-full border border-slate-800 bg-slate-950 p-1 pr-4 "
                            >
                                <div className="flex items-center gap-3 rounded-lg  px-3 py-2">
                                    <div className="relative">
                                        <div
                                            className="absolute -inset-1 rounded-lg 0 blur-sm transition-all duration-300 group-hover:bg-teal-500/30 group-hover:blur-md"
                                        ></div>

                                    </div>



                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-bold text-white">{`${addressData?.formatted.slice(0, 10)} ${addressData?.symbol}`}</span>

                                        </div>
                                        <span className="text-[10px] font-medium text-slate-400">Balance</span>
                                    </div>


                                </div>
                            </div>
                        </button>
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
