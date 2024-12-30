"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { parseEther } from "viem";
import type { SendTransactionVariables } from 'wagmi/query';
import type { Config } from 'wagmi';
import { useAccount, useBalance } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { CategoryState } from "../store/stringSlice";
import { RootState } from "../store/store";
import { useSelector } from 'react-redux';
import { categories } from "../data/categoryList";

const CatConfirmationScreen = () => {
  const category = useSelector((state: RootState) => state.category.category) as CategoryState;
  const subcategory = useSelector((state: RootState) => state.category.subcategory) as CategoryState;
  console.log(subcategory)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bal, setBal] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const { address, isConnected } = useAccount();
  const { data: addressData, isLoading } = useBalance({ address });

  const { ready, authenticated, login, logout } = usePrivy();

  const account = useAccount();
  const key = process.env.REACT_APP_PUBLIC_PRIVATE_KEY;
  const sa = privateKeyToAccount(
    key as `0x${string}`
  );
  const to = account.address;
  const {
    data: txhash,
    isPending,
    isError,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txhash,
    });

  useEffect(() => {
    if (addressData) {
      setBal(Number(addressData?.formatted) * 2500)
    }
  });

  const currentData = categories[category].items;
  console.log(currentData[subcategory].images)

  const onTaskComplete = async () => {
    if (currentIndex === 2) {
      setIsPopupVisible(true);
      console.log(sa)
      console.log(to)
      console.log(account.address)
      const transactionRequest: SendTransactionVariables<Config, number> = {
        account: sa,
        to: account.address,
        value: parseEther('0.00001'),
        type: 'eip1559',
      };
      console.log(transactionRequest)
      await sendTransaction(transactionRequest);
      console.log(txhash);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData.length);
    }
  };

  const handleButtonClick = (title: string) => {
    setPopupTitle(title);
    onTaskComplete();
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPopupTitle("");
  };

  const handleKeepTagging = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData.length);
    handleClosePopup();
    setBal(Number(addressData?.formatted) * 2500);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#E0E0E2]">
      <div
        id="cat-details"
        className="bg-cover bg-center bg-no-repeat flex flex-col rounded-3xl flex-grow mx-3 my-2"
        style={{ backgroundImage: `url(${currentData[subcategory].images[currentIndex]})` }}
      >
        {ready && authenticated && (
          <div className="flex justify-start p-5">
            <span className='bg-gray-300 rounded-full text-gray-800 text-2xl p-3 px-4'><b> 💰 $ {bal.toString().slice(0, 4)}</b></span>
          </div>)}
        <div className="flex flex-col items-center flex-grow p-4 sm:p-5">
          <div className="relative w-full flex-grow flex items-center justify-center"></div>
        </div>
        <div
          className="card relative flex h-[6em] w-full items-start justify-center overflow-clip rounded-[1.5em] bg-[#B7DFFB] px-[1em] py-[1em] shadow-[0px_2px_2px_0px_#1a4766,0px_2px_8px_0px_#3083bb]"
        >
          <span
            className="max-w-[15ch] text-center font-Poppin text-[-0.8em] font-bold text-[#085991]"
          >
            {currentData[subcategory].question}
          </span>
          <div
            className="group absolute bottom-[-1em] flex max-h-[6em] w-full items-center justify-center gap-[24rem]"
          >
            <label className="yes peer relative cursor-pointer" >
              <input type="checkbox" name="yes" id="yes" className="peer appearance-none" onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              } />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="43"
                height="90"
                fill="none"
                viewBox="0 0 43 90"
                className="absolute bottom-0 left-1/2 h-[6rem] w-[6rem] origin-bottom -translate-x-1/2 rotate-[45deg] hover:rotate-[40deg] duration-300"
              >
                <path
                  fill="#1269EF"
                  d="M24.87 4.21a3.52 3.52 0 0 0-7.04 0v80.96a3.52 3.52 0 1 0 7.04 0V4.21Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M21.35 89.34a4.17 4.17 0 0 1-4.17-4.17v-81a4.17 4.17 0 1 1 8.34 0v81a4.17 4.17 0 0 1-4.17 4.17Zm0-88a2.88 2.88 0 0 0-2.87 2.87v81a2.87 2.87 0 0 0 5.74 0v-81a2.88 2.88 0 0 0-2.87-2.87Z"
                ></path>
                <path
                  fill="#000"
                  d="M21.35 44.69c11.427 0 20.69-8.117 20.69-18.13 0-10.013-9.263-18.13-20.69-18.13C9.923 8.43.66 16.547.66 26.56c0 10.013 9.263 18.13 20.69 18.13Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M21.35 45.34C9.58 45.34 0 36.92 0 26.56 0 16.2 9.58 7.78 21.35 7.78c11.77 0 21.34 8.42 21.34 18.78 0 10.36-9.57 18.78-21.34 18.78Zm0-36.26c-11 0-20 7.84-20 17.48s9 17.48 20 17.48 20-7.84 20-17.48-8.95-17.48-20-17.48Z"
                ></path>
                <path fill="#ED487E" d="M.66 26.56v-4.99h41.38v3.92L.66 26.56Z"></path>
                <path
                  fill="#231F20"
                  d="M0 27.23v-6.31h42.69v5.21L0 27.23Zm1.31-5v3.66l40.08-1v-2.67l-40.08.01Z"
                ></path>
                <path
                  fill="#ED487E"
                  d="M21.35 40.6c11.427 0 20.69-8.117 20.69-18.13 0-10.013-9.263-18.13-20.69-18.13C9.923 4.34.66 12.457.66 22.47c0 10.013 9.263 18.13 20.69 18.13Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M21.35 41.26C9.58 41.26 0 32.83 0 22.47S9.58 3.69 21.35 3.69c11.77 0 21.34 8.43 21.34 18.78 0 10.35-9.57 18.79-21.34 18.79Zm0-36.26c-11 0-20 7.84-20 17.47 0 9.63 9 17.48 20 17.48s20-7.84 20-17.48S32.4 5 21.35 5Z"
                ></path>
                <path
                  fill="#fff"
                  d="M9.76 27.76v-4.28l-3.73-5.9h2.41l2.4 4 2.34-4h2.37l-3.74 5.91v4.27H9.76Zm7.59 0V17.58h7.55v1.72h-5.5v2.26h5.11v1.71H19.4v2.78h5.69v1.71h-7.74Zm9.941-3.31 2-.2a2.44 2.44 0 0 0 .73 1.44 2.21 2.21 0 0 0 1.49.48 2.28 2.28 0 0 0 1.5-.42 1.25 1.25 0 0 0 .51-1 .93.93 0 0 0-.17-.56 1.59 1.59 0 0 0-.74-.44c-.24-.09-.79-.23-1.64-.45a5.64 5.64 0 0 1-2.32-1 2.68 2.68 0 0 1-.5-3.51 2.79 2.79 0 0 1 1.27-1 5.061 5.061 0 0 1 2-.35 4.29 4.29 0 0 1 2.88.84 2.929 2.929 0 0 1 1 2.24l-2.06.09a1.72 1.72 0 0 0-.56-1.13 2.08 2.08 0 0 0-1.3-.34 2.34 2.34 0 0 0-1.41.37.71.71 0 0 0-.32.63.8.8 0 0 0 .3.62 5.679 5.679 0 0 0 1.89.68c.766.154 1.512.4 2.22.73a3 3 0 0 1 1.13 1 3.06 3.06 0 0 1-1.46 4.4 5.719 5.719 0 0 1-2.22.37 4.38 4.38 0 0 1-3-.89 3.89 3.89 0 0 1-1.22-2.6Z"
                ></path>
              </svg>
            </label>

            <label
              className="no relative cursor-pointer origin-bottom duration-300">
              <input type="checkbox" name="no" id="no" className="peer appearance-none" onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              } />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="89"
                fill="none"
                viewBox="0 0 42 89"
                className="absolute bottom-0 right-1/2 h-[6rem] w-[6rem] origin-bottom translate-x-1/2 rotate-[-45deg] duration-300 hover:rotate-[-40deg]"
              >
                <path
                  fill="#ED487E"
                  d="M21.481.49h-.48a3.35 3.35 0 0 0-3.35 3.35V85.1c0 1.85 1.5 3.35 3.35 3.35h.48c1.85 0 3.35-1.5 3.35-3.35V3.84c0-1.85-1.5-3.35-3.35-3.35Z"
                ></path>
                <path
                  fill="#FC932D"
                  d="M23.131 45.03c10.118 0 18.32-8.202 18.32-18.32S33.25 8.39 23.132 8.39c-10.117 0-18.32 8.202-18.32 18.32s8.203 18.32 18.32 18.32Z"
                ></path>
                <path
                  fill="#FDD259"
                  d="M18.801 45.03c10.118 0 18.32-8.202 18.32-18.32S28.92 8.39 18.801 8.39C8.684 8.39.481 16.592.481 26.71s8.203 18.32 18.32 18.32Z"
                ></path>
                <path
                  fill="#000"
                  d="M16.431 33.05a1.4 1.4 0 0 1-1.1-.52l-4.34-5.29v4.38a1.44 1.44 0 0 1-2.87 0v-8.37a1.44 1.44 0 0 1 1-1.35 1.42 1.42 0 0 1 1.59.44l4.28 5.28v-4.66a1.44 1.44 0 1 1 2.87 0v8.66a1.44 1.44 0 0 1-1 1.35 1.62 1.62 0 0 1-.43.08Zm8.221-.39a5.3 5.3 0 1 1 5.3-5.3 5.31 5.31 0 0 1-5.3 5.3Zm0-7.73a2.43 2.43 0 1 0 .019 4.859 2.43 2.43 0 0 0-.02-4.859Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M21.541 89h-.49a3.86 3.86 0 0 1-3.86-3.86v-40a.519.519 0 0 1 1 0v40a2.84 2.84 0 0 0 2.83 2.84h.49a2.84 2.84 0 0 0 2.83-2.84V45a.52.52 0 1 1 1 0v40.14a3.86 3.86 0 0 1-3.8 3.86Zm3.34-78.97a.51.51 0 0 1-.51-.51V3.87a.52.52 0 0 1 1 0v5.62a.51.51 0 0 1-.49.54Zm-7.18-1.21a.51.51 0 0 1-.51-.51V3.87a3.84 3.84 0 0 1 3.85-3.86h.5a.51.51 0 1 1 0 1h-.49a2.83 2.83 0 0 0-2 .84 2.78 2.78 0 0 0-.82 2v4.44a.511.511 0 0 1-.53.53Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M23.171 45.59a.52.52 0 0 1 0-1 17.81 17.81 0 0 0 14.89-27.6.51.51 0 1 1 .85-.56 18.83 18.83 0 0 1-15.74 29.16Zm10.25-33.52a.52.52 0 0 1-.29-.09 17.64 17.64 0 0 0-9.93-3 .51.51 0 0 1-.51-.51.54.54 0 0 1 .54-.51 18.75 18.75 0 0 1 10.51 3.21.53.53 0 0 1 .14.72.541.541 0 0 1-.46.18Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M18.861 45.61a18.84 18.84 0 0 1-16.87-27.27 18.85 18.85 0 0 1 31-4.09.51.51 0 0 1-.05.73.5.5 0 0 1-.72 0 17.82 17.82 0 1 0 3.57 6.18.526.526 0 1 1 1-.33 18.87 18.87 0 0 1-17.93 24.78Z"
                ></path>
                <path
                  fill="#231F20"
                  d="M16.48 32.17a.51.51 0 0 1-.39-.19l-6-7.26v6.94a.52.52 0 0 1-1 0v-8.37a.51.51 0 0 1 .34-.48.5.5 0 0 1 .57.15l6 7.27V23a.52.52 0 1 1 1 0v8.66a.52.52 0 0 1-.52.51Zm8.221-.39a4.38 4.38 0 1 1 4.38-4.38 4.39 4.39 0 0 1-4.38 4.38Zm0-7.73a3.35 3.35 0 1 0 .02 6.7 3.35 3.35 0 0 0-.02-6.7Z"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Header onOptionChange={() => { }} />
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/3 text-center">
            <h3 className="text-lg font-semibold mb-4">{popupTitle}</h3>

            {isConfirming && (
              <div className="flex justify-center items-center">
                <div
                  className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
                              aspect-square w-8 flex justify-center items-center text-yellow-700"
                ></div>
              </div>
            )}
            {isConfirmed && (
              <div className="flex gap-2 justify-center">
                <a
                  href={`https://testnet.bscscan.com/tx/${txhash}`}
                  target="_blank"
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  View Reward
                </a>
                <button
                  onClick={handleKeepTagging}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  Keep tagging
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatConfirmationScreen;
