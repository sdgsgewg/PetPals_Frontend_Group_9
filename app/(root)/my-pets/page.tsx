"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/ItemNotFound";
import Header from "@/app/components/ManageItem/Header";
import MyPetTable from "@/app/components/ManageItem/MyPetTable";
import MessageModal from "@/app/components/modals/MessageModal";
import RemoveItemModal from "@/app/components/modals/RemoveItemModal";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/pets/PetsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { IPet } from "@/app/interface/pet/IPet";
import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";

const MyPets = () => {
  const { loggedInUser } = useUsers();
  const { ownerPets, fetchOwnerPets, removePet, error, loading } = usePets();

  const [selectedPet, setSelectedPet] = useState<IPet>({} as IPet);
  const [showRemoveItemModal, setShowRemoveItemModal] =
    useState<boolean>(false);

  const updateSelectedPet = (pet: IPet) => {
    setSelectedPet(pet);
  };

  const handleOpenRemoveItemModal = () => {
    setShowRemoveItemModal(true);
  };
  const handleCloseRemoveItemModal = () => {
    setShowRemoveItemModal(false);
  };

  useEffect(() => {
    fetchOwnerPets(loggedInUser.userId);
  }, []);

  useEffect(() => {
    fetchOwnerPets(loggedInUser.userId);
  }, [removePet]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NormalContent>
            <div className="w-full max-w-lg sm:max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto">
              <Header
                title="My Pets"
                redirectUrl="/adoptions/new"
                addText="Add New Pet"
              />
              {ownerPets.length > 0 ? (
                <MyPetTable
                  updateSelectedPet={updateSelectedPet}
                  onOpen={handleOpenRemoveItemModal}
                />
              ) : (
                <ItemNotFound
                  image_url="/img/pet-not-found.png"
                  size={200}
                  message="Pet Not Found"
                />
              )}
            </div>

            <RemoveItemModal
              title="Remove Pet Confirmation"
              message="Are you sure you want to remove this pet?"
              item={selectedPet}
              itemType="Pet"
              isOpen={showRemoveItemModal}
              onClose={handleCloseRemoveItemModal}
            />

            <MessageModal title="Remove Pet" message="Pet has been removed" />
          </NormalContent>
        </>
      )}
    </>
  );
};

export default MyPets;
