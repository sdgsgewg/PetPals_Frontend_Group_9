import { useGlobal } from "@/app/context/GlobalContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useState } from "react";

interface BookServiceProps {
  title: string;
  message: string;
  isModalOpen: boolean;
  onClose: () => void;
}

const BookServiceModal: React.FC<BookServiceProps> = ({
  title,
  message,
  isModalOpen,
  onClose,
}) => {
  const { handleOpenMessageModal } = useGlobal();
  const { loggedInUser } = useUsers();
  const { service, bookService } = useServices();

  const [bookingDate, setBookingDate] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBookingDate(e.target.value);
  };

  const handleBooking = () => {
    if (bookingDate === "") {
      alert("Please select a date");
      return;
    }

    bookService(
      loggedInUser.userId,
      service.provider.userId,
      service.serviceId,
      bookingDate
    );
    onClose();
    handleOpenMessageModal();
  };

  return (
    <div
      className={`${
        !isModalOpen
          ? "hidden"
          : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg text-gray-600 font-bold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        <input
          type="date"
          name="bookingDate"
          value={bookingDate}
          onChange={handleInputChange}
          className="border border-gray-500 text-black rounded-md p-2 w-full mt-2"
        />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-3 py-1 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookServiceModal;
