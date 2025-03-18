import IPet from "@/app/interface/IPet";
import React from "react";
import PetCard from "./PetCard";

interface PetListProps {
  filteredPets: IPet[];
}

const PetList: React.FC<PetListProps> = ({ filteredPets }) => {
  return filteredPets.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
      {filteredPets.map((pet) => (
        <PetCard key={pet.petId} pet={pet} />
      ))}
    </div>
  ) : (
    <div className="text-black">
      <p>Pet Not Found</p>
    </div>
  );
};

export default PetList;
