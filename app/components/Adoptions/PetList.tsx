import IPet from "@/app/interface/IPet";
import React from "react";
import PetCard from "./PetCard";
import Image from "next/image";

interface PetListProps {
  filteredPets: IPet[];
}

const PetList: React.FC<PetListProps> = ({ filteredPets }) => {
  return filteredPets.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {filteredPets.map((pet) => (
        <PetCard key={pet.pet_id} pet={pet} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-4 text-black">
      <Image
        src={`/img/pet-not-found.png`}
        alt="Pet Not Found"
        width={200}
        height={200}
      />
      <p className="text-2xl font-bold">Pet Not Found</p>
    </div>
  );
};

export default PetList;
