import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

interface MessageModalProps {
  title: string;
  message: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ title, message }) => {
  const { isMessageModalOpen, handleCloseMessageModal } = useGlobal();

  return (
    <div
      className={`${
        !isMessageModalOpen
          ? "hidden"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-gray-600 font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleCloseMessageModal}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
