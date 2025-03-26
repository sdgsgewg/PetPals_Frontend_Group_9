import Image from "next/image";
import SearchBox from "../SearchFilter/SearchBox";
import FilterBox from "../SearchFilter/FilterBox";
import SearchFilterBox from "../SearchFilter/SearchFilterBox";
import { usePets } from "@/app/context/pets/PetsContext";

const PetHero = () => {
  const { filters } = usePets();

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
          <SearchBox searchType="pets" placeholder="Search by name or breed" />
          <FilterBox />
        </SearchFilterBox>
      </div>
    </div>
  );
};

export default PetHero;
