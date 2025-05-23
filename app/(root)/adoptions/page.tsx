"use client";
import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import FilterModal from "@/app/components/modals/FilterModal";
import { usePets } from "@/app/context/pets/PetsContext";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Adoptions = () => {
  const { pets, filters, fetchPets } = usePets();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the searchValue so that it updates after 500ms of inactivity
  useDebounce(
    () => {
      setDebouncedSearchTerm(filters.searchValue);
    },
    500,
    [filters.searchValue]
  );

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    fetchPets();
  }, [debouncedSearchTerm]);

  return (
    <BigHeroContent>
      <PetHero />
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
        <PetList filteredPets={pets} />
      </div>
      <FilterModal filterType="pets" />
    </BigHeroContent>
  );
};

export default Adoptions;
