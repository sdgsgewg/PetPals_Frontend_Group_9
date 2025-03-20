import Image from "next/image";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import { useState } from "react";
import SearchFilterBox from "./SearchFilterBox";
import { useGlobal } from "@/app/context/GlobalContext";

const PetHero = () => {
  const { filters, setFilters, fetchPets } = useGlobal();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative w-full h-[50dvh] xl:h-[60dvh] text-white">
      {/* Background Image */}
      <div className="w-full h-full overflow-hidden">
        <Image
          src={
            filters.species === ""
              ? "/img/species/pets.jpg"
              : `/img/species/${filters.species.toLowerCase()}.jpg`
          }
          alt={filters.species}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Search and Filter */}
      <div className="absolute w-[90%] xl:w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold mb-4">Find Your Best Pals</h1>
        <SearchFilterBox>
          <SearchBox
            filters={filters}
            setFilters={setFilters}
            fetchPets={fetchPets}
          />
          <FilterBox
            isOpen={isModalOpen}
            onOpen={handleOpenModal}
            onClose={handleCloseModal}
            filters={filters}
            setFilters={setFilters}
            fetchPets={fetchPets}
          />
        </SearchFilterBox>
      </div>
    </div>
  );
};

export default PetHero;
