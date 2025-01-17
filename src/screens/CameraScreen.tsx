import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CategoryState } from "../store/stringSlice";


const CameraScreen = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const category = useSelector((state: RootState) => state.category.category) as CategoryState;

  useEffect(() => {
    if (isCameraOpen) {
      openCamera();
    } else {
      closeCamera();
    }
    return () => {
      closeCamera();
    };
  }, [isCameraOpen, isFrontCamera]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as MediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setPhoto(canvasRef.current.toDataURL("image/png"));
        setShowPhoto(true);
      }
    }
  };

  const handleCameraFlip = () => {
    setIsFrontCamera((prev) => !prev);
  };

  const handlePublish = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowPhoto(false);
    setPhoto(null);
    setIsCameraOpen(true);
    navigate("/screen3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FD] to-[#E0E0E2] relative overflow-hidden flex justify-center">
      {!showPhoto ? (

        <div id="camera-div" className="flex-grow relative mt-8 md:mt-0">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover fixed inset-0 z-0"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            width={640}
            height={480}
          ></canvas>
          <div className="fixed transform -translate-x-1/2 left-1/2" onClick={handleCameraFlip}>
            <div>
              <div className="bg-home rounded-full w-76 h-14 md:w-76 md:h-16 flex items-center justify-center p-4">
                <h1 className="text-xl md:text-2xl font-bold text-white">Rotate Camera</h1>
              </div>
            </div>
          </div>
          <div className="fixed  bottom-4 left-1/2 transform -translate-x-1/2 w-full overflow-x-auto flex gap-2 justify-center">

            <div
              className="flex p-4"
            >
              <div
                className={`w-16 h-16 mx-2 bg-gradient-to-r from-[#e0e4e8] to-[#ffffff] shadow-lg rounded-full border-4 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300`}
                onClick={() => {
                  capturePhoto();
                }}
              >
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="show-picture"
          className="flex flex-col items-center justify-center h-full"
        >
          {photo && !showPopup && (
            <>
              <img
                src={photo}
                alt="Captured"
                className="w-[100%] h-[100vh] object-cover rounded-lg shadow-lg border border-gray-200"
              />
              <button
                onClick={handlePublish}
                className="fixed bottom-8 z-10 mt-6 px-8 py-3 bg-home text-white text-lg font-medium rounded-full shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                Publish
              </button>
            </>
          )}
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-home">
          <div className="flex flex-col items-center justify-center p-6 rounded-lg transform scale-100 transition-transform duration-300 hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5899/5899697.png"
              alt="Captured"
              className="w-full object-cover rounded-lg"
            />
            <h2 className="flex items-center justify-center font-chalk text-xl text-gray-200 font-semibold">
              Data stored on Filecoin
            </h2>

            <button
              onClick={closePopup}
              className="mt-4 px-6 py-2 bg-button text-black text-sm font-medium rounded-full shadow hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default CameraScreen;
