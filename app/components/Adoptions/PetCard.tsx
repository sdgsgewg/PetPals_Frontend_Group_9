import IPet from "@/app/interface/IPet";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PetCardProps {
  pet: IPet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const splitBreed = pet.breed.split(" ");
  const modifiedBreed = splitBreed.map((word) => word.toLowerCase()).join("-");

  const formattedPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Link href={`/adoptions/${pet.slug}`}>
      <div className="w-full h-full flex flex-col items-center border rounded-md shadow-md overflow-hidden mb-4 hover:scale-105 transition ease-in-out duration-300 cursor-pointer">
        <div className="w-full h-[60%] overflow-hidden">
          <Image
            src={`/img/breed/${modifiedBreed}.jpg`}
            alt={pet.name}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[40%] flex flex-col justify-between p-3">
          <div>
            <p className="text-sm font-semibold text-slate-300">{pet.breed}</p>
            <p className="text-lg font-bold text-slate-500">{pet.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-slate-400">
                {pet.age < 1
                  ? `Age: ${Math.round(pet.age * 12)} months`
                  : `Age: ${pet.age} ${pet.age > 1 ? "years" : "year"}`}
              </span>
            </div>
          </div>
          <div className="text-md font-semibold text-slate-400">
            <p>{"Rp " + formattedPrice(pet.price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
