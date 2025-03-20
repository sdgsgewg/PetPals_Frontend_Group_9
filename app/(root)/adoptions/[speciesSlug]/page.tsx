"use client";
import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/PageNotFound";
import { useGlobal } from "@/app/context/GlobalContext";
import IPet from "@/app/interface/IPet";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Species = () => {
  const params = useParams();

  const { pets } = useGlobal();

  const [species, setSpecies] = useState<string>("");
  const [filteredPets, setFilteredPets] = useState<IPet[]>(pets);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPets = useCallback(
    (searchQuery: string = "") => {
      const speciesSlug = params.speciesSlug as string;

      try {
        setLoading(true);
        setError(false);

        let filtered = [];
        switch (speciesSlug) {
          case "dog":
            setSpecies("Dog");
            filtered = pets.filter((pet) => pet.species_id === 1);
            break;
          case "cat":
            setSpecies("Cat");
            filtered = pets.filter((pet) => pet.species_id === 2);
            break;
          default:
            throw new Error("Pets not available");
        }

        // Jika ada searchQuery, lakukan filtering tambahan
        if (searchQuery) {
          filtered = filtered.filter(
            (pet) =>
              pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
              pet.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setFilteredPets(filtered);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [params.speciesSlug, pets]
  );

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return (
    <>
      {loading ? (
        <NormalContent>
          <Loading />
        </NormalContent>
      ) : error ? (
        <NormalContent>
          <ItemNotFound
            image_url="/img/pet-not-found.png"
            size={350}
            message=""
          />
        </NormalContent>
      ) : (
        <BigHeroContent>
          <PetHero
            species={species}
            fetchPets={fetchPets} // Kirim fetchPets ke PetHero
          />
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
            <PetList filteredPets={filteredPets} />
          </div>
        </BigHeroContent>
      )}
    </>
  );
};

export default Species;
