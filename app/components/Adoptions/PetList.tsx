import IPet from "@/app/interface/IPet";
import React from "react";
import PetCard from "./PetCard";
import { usePets } from "@/app/context/pets/PetsContext";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";

interface PetListProps {
  filteredPets: IPet[];
}

const PetList: React.FC<PetListProps> = ({ filteredPets }) => {
  const { loading } = usePets();

  return (
    <>
      {loading ? (
        <Loading />
      ) : filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {filteredPets.map((pet, index) => (
            <PetCard key={index} pet={pet} />
          ))}
        </div>
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          message="Pet Not Found"
        />
      )}
    </>
  );
};

export default PetList;
