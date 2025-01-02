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
    console.log("A", currentIndex)
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
      console.log("B",currentIndex)
      console.log(currentData[category].images.length)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData[category].images.length);
      console.log("C", currentIndex)
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentData[category].images.length);
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
          className="card relative flex flex-col items-center  h-[8em] w-full justify-center overflow-clip rounded-[1.5em] bg-[#B7DFFB] p-4 shadow-[0px_2px_2px_0px_#1a4766,0px_2px_8px_0px_#3083bb] gap-2 "
        >
          <div>
            <span
              className="max-w-[15ch] text-center font-Poppin text-[-0.8em] font-bold text-[#085991] mt-4"
            >
              {currentData[subcategory].question}
            </span>
          </div>

          <div className="flex flex-row gap-6">
            <div
              className="flex flex-col justify-center before:hidden before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 rounded-full p-1"
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
            >
              <img className="w-12 rounded-full" src={currentData[subcategory].options[0].image} />
              <p className="flex justify-center text-sm pt-1">{currentData[subcategory].options[0].optionName}</p>
            </div>
            <div
              className="before:hidden before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 rounded-full p-1"
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
            >
              <img className="w-12 rounded-full" src={currentData[subcategory].options[1].image} />
              <p className="flex justify-center text-sm pt-1">{currentData[subcategory].options[1].optionName}</p>
            </div>
            <div
              className="before:hidden before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 rounded-full p-1"
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
            >
              <img className="w-12 rounded-full" src={currentData[subcategory].options[2].image} />
              <p className="flex justify-center text-sm pt-1">{currentData[subcategory].options[2].optionName}</p>
            </div>
            <div
              className="before:hidden before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 rounded-full p-1"
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
            >
              <img className="w-12 rounded-full" src={currentData[subcategory].options[3].image} />
              <p className="flex justify-center text-sm pt-1">{currentData[subcategory].options[3].optionName}</p>
            </div>
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
                  href={`https://edu-chain-testnet.blockscout.com/tx/${txhash}`}
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
