"use client";
import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { useGlobal } from "@/app/context/GlobalContext";
import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Adoptions = () => {
  const { pets, filters, setFilters, fetchPets } = useGlobal();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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

  // useEffect(() => {
  //   fetchPets();
  // }, [debouncedSearchTerm]);

  return (
    <>
      {loading ? (
        <NormalContent>
          <Loading />
        </NormalContent>
      ) : error ? (
        <NormalContent>
          <PageNotFound
            image_url="/img/page-not-found.png"
            message=""
          />
        </NormalContent>
      ) : (
        <BigHeroContent>
          <PetHero />
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
            <PetList filteredPets={pets} />
          </div>
        </BigHeroContent>
      )}
    </>
  );
};

export default Adoptions;
