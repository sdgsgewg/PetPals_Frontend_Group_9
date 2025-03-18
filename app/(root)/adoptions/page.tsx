"use client";
import SpeciesCard from "@/app/components/Adoptions/SpeciesCard";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";

const Adoptions = () => {
  const { species } = useGlobal();

  return (
    <NormalContent>
      <div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-500 mb-2">Adoptions</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {species.map((species) => (
            <SpeciesCard key={species.speciesId} species={species} />
          ))}
        </div>
      </div>
    </NormalContent>
  );
};

export default Adoptions;
