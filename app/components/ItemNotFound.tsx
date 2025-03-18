import Image from "next/image";
import React from "react";

interface ItemNotFoundProps {
  image_url: string;
  size: number;
  message: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({
  image_url,
  size,
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50dvh]">
      <Image src={image_url} alt={message} width={size} height={size} />
      <p className="text-2xl text-slate-400 font-semibold text-center">
        {message}
      </p>
    </div>
  );
};

export default ItemNotFound;
