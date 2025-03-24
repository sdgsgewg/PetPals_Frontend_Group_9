"use client";
import CardDetailLayout from "@/app/components/Cards/CardDetailLayout";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/adoptions/PetsContext";
import Loading from "@/app/loading";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const PetDetail = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { pet, fetchPetDetail, loading, error } = usePets();

  useEffect(() => {
    if (!slug) return;
    fetchPetDetail(slug);
  }, [slug]);

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  if (error || !pet) {
    return (
      <NormalContent>
        <PageNotFound
          image_url="/img/page-not-found.png"
          message="Pet not found"
        />
      </NormalContent>
    );
  }

  const splitBreed = pet.breed?.split(" ") || [];
  const modifiedBreed = splitBreed.map((word) => word.toLowerCase()).join("-");

  const formattedPrice = (price: number) =>
    price?.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <NormalContent>
      <CardDetailLayout>
        {/* Left: Image */}
        <div className="flex justify-center">
          <Image
            src={`/img/breed/${modifiedBreed}.jpg`}
            alt={pet.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right: Pet Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {pet.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Species:</span> {pet.species}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Breed:</span> {pet.breed}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Age:</span> {pet.age} years
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {pet.description}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Status:</span> {pet.status}
          </p>
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Price: Rp {formattedPrice(pet.price)}
          </p>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer">
              Adopt Now
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer">
              Contact Seller
            </button>
          </div>
        </div>
      </CardDetailLayout>
    </NormalContent>
  );
};

export default PetDetail;
