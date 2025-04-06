import { ISpecies } from "@/app/interface/pet/ISpecies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SpeciesCardProps {
  species: ISpecies;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  return (
    <Link href={`/adoptions/${species.slug}`}>
      <div className="relative w-full h-full flex flex-col items-center border-2 rounded-md shadow-md overflow-hidden mb-4 hover:scale-105 transition duration-300 ease-in-out">
        <div className="w-full h-full overflow-hidden">
          <Image
            src={species.image}
            alt={species.name}
            width={100}
            height={100}
            className="w-full h-full object-cover opacity-85"
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-full flex items-center justify-center py-4 opacity-60">
          <h2 className="text-2xl font-extrabold text-white">{species.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SpeciesCard;
