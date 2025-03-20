import IPet from "@/app/interface/IPet";
import Image from "next/image";
import React from "react";

interface PetCardProps {
  pet: IPet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const splitBreed = pet.breed.split(" ");
  const modifiedBreed = splitBreed.map((word) => word.toLowerCase()).join("-");
  console.log(modifiedBreed);

  return (
    <div className="w-full h-full flex flex-col items-center mb-4">
      <div className="w-full h-full overflow-hidden">
        <Image
          src={`/img/breed/${modifiedBreed}.jpg`}
          alt={pet.name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <h2
        className="text-2xl font-bold text-slate-500 mb-2
            "
      >
        {pet.name}
      </h2>
    </div>
  );
};

export default PetCard;
