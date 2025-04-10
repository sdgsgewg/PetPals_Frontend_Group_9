"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import MessageModal from "@/app/components/modals/MessageModal";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/pets/PetsContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAdoptions } from "@/app/context/adoptions/AdoptionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";
import { useGlobal } from "@/app/context/GlobalContext";

const PetDetail = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const router = useRouter();

  const { getImageUrlByBreed, formattedPrice } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { pet, fetchPetDetail, error } = usePets();
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
    if (!pet) return;
    setImageUrl(getImageUrlByBreed(pet?.species?.name, pet?.breed));
    setPrice(formattedPrice(pet.price));
    setStatus(getStatus());
  }, [pet]);

  useEffect(() => {
    if (pet && adoptions.some((adopt) => adopt.petId === pet?.petId)) {
      setIsAdopted(true);
    }
  }, [adoptions, pet]);

  const handleAdoption = () => {
    if (!pet || !pet.status || pet.status.toLowerCase() !== "available") return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    adoptPet(loggedInUser.userId, pet?.owner?.userId, pet.petId);
    setIsAdopted(true);
  };

  const getStatus = () => {
    if (!pet?.status) return "Unknown";
    return (
      pet.status.charAt(0).toUpperCase() + pet.status.slice(1).toLowerCase()
    );
  };

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
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

        {isLoggedIn &&
          loggedInUser?.role?.name?.toLowerCase() === "adopter" && (
            <ContactPersonCard itemType="pet" data={pet?.owner} />
          )}
      </div>

      <MessageModal
        title="Pet Adoption"
        message="Pet has been reserved successfully."
      />
    </NormalContent>
  );
};

export default PetDetail;
