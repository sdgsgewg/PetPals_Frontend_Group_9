import IPet from "@/app/interface/pet/IPet";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardLayout from "../Cards/CardLayout";
import { useGlobal } from "@/app/context/GlobalContext";

interface PetCardProps {
  pet: IPet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const { getImageUrlByBreed, formattedPrice } = useGlobal();

  return (
    <Link href={`/adoptions/${pet.slug}`}>
      <CardLayout>
        <div className="w-full h-[60%] overflow-hidden">
          <Image
            src={getImageUrlByBreed(pet?.species?.name, pet?.breed)}
            alt={pet.name}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[40%] flex flex-col justify-between p-3">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {pet.breed}
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-slate-400">
              {pet.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {pet.age < 1
                  ? `Age: ${Math.round(pet.age * 12)} months`
                  : `Age: ${pet.age} ${pet.age > 1 ? "years" : "year"}`}
              </span>
            </div>
          </div>
          <div className="text-md font-semibold text-slate-600 dark:text-slate-400">
            <p>{"Rp " + formattedPrice(pet.price)}</p>
          </div>
        </div>
      </CardLayout>
    </Link>
  );
};

export default PetCard;
