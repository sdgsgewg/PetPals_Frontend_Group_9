import Image from "next/image";
import { useState } from "react";

interface PetHeroProps {
  species: string;
  fetchPets: (searchQuery?: string) => void;
}

const PetHero: React.FC<PetHeroProps> = ({ species, fetchPets }) => {
  const [filter, setFilter] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPets(filter);
  };

  return (
    <div className="relative w-full h-[60dvh] text-white">
      <div className="w-full h-full overflow-hidden">
        <Image
          src={`/img/species/${species.toLowerCase()}.jpg`}
          alt={species}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute w-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-extrabold mb-4">Find Your Best Pals</h1>
        <div className="bg-white rounded-sm shadow-sm text-black px-4 py-8">
          <form onSubmit={handleSearch} className="w-full flex justify-between">
            <input
              type="text"
              name="search"
              id="search"
              value={filter}
              placeholder="Search by name or breed"
              className="w-[80%] border outline-none rounded-xl px-4 py-2"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="w-[15%] bg-blue-400 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetHero;
