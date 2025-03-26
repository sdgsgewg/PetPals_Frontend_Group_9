import Image from "next/image";
import React from "react";

interface ItemNotFoundProps {
  image_url: string;
  message: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({ image_url, message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-black dark:text-white">
      <Image src={image_url} alt={message} width={200} height={200} />
      <p className="text-2xl font-bold">{message}</p>
    </div>
  );
};

export default ItemNotFound;
