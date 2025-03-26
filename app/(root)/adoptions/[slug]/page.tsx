"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/pets/PetsContext";
import { useGlobal } from "@/app/context/GlobalContext";
import Loading from "@/app/loading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAdoptions } from "@/app/context/adoptions/AdoptionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";

const PetDetail = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const router = useRouter();

  const { handleOpenMessageModal } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { pet, fetchPetDetail, loading, error } = usePets();
  const { adoptions, adoptPet } = useAdoptions();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdopted, setIsAdopted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchPetDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (pet) {
      setImageUrl(getImageUrl());
      setPrice(pet.price?.toLocaleString("id-ID") || "0");
      setStatus(getStatus());
    }
  }, [pet]);

  useEffect(() => {
    if (adoptions.some((adopt) => adopt.petId === pet?.petId)) {
      setIsAdopted(true);
    }
  }, [adoptions, pet]);

  const handleAdoption = () => {
    if (!pet || !pet.status || pet.status.toLowerCase() !== "available") return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    adoptPet(pet.petId, loggedInUser.userId);
    setIsAdopted(true);
    handleOpenMessageModal();
  };

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

  function getImageUrl() {
    if (!pet?.species || !pet?.breed) return null;
    const modifiedSpecies = pet.species?.toLowerCase() || "";
    const modifiedBreed =
      pet.breed
        ?.split(" ")
        .map((word) => word.toLowerCase())
        .join("-") || "";
    return `/img/breed/${modifiedSpecies}/${modifiedBreed}.jpg`;
  }

  function getStatus() {
    if (!pet?.status) return "Unknown";
    return (
      pet.status.charAt(0).toUpperCase() + pet.status.slice(1).toLowerCase()
    );
  }

  return (
    <NormalContent>
      <div className="max-w-lg md:max-w-3xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
        {/* Pet Information */}
        <ItemDetailCard
          itemType="pet"
          imageUrl={imageUrl}
          status={status}
          price={price}
          isAdopted={isAdopted}
          onClick={handleAdoption}
        />

        {/* Owner Information */}
        <ContactPersonCard itemType="pet" data={pet?.owner} />
      </div>

      <MessageModal
        title="Pet Adoption"
        message="Pet has been reserved successfully."
      />
    </NormalContent>
  );
};

export default PetDetail;
