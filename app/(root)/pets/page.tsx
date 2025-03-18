"use client";
import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

const Pets = () => {
  const { pets } = useGlobal();

  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-500 mb-2">All Pets</h1>
      </div>

      <div>
        {pets.map((pet) => (
          <div key={pet.petId} className="flex flex-col items-center mb-4">
            <h2
              className="text-2xl font-bold text-slate-500 mb-2
                "
            >
              {pet.name}
            </h2>
            <p className="text-lg text-slate-400">{pet.breed}</p>
            <p className="text-lg text-slate-400">{pet.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pets;
