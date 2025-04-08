"use client";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import BookServiceModal from "@/app/components/modals/BookServiceModal";
import MessageModal from "@/app/components/modals/MessageModal";
import PageNotFound from "@/app/components/PageNotFound";
import { useGlobal } from "@/app/context/GlobalContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ServiceDetail = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const router = useRouter();

  const { getImageUrlByServiceCategory, formattedPrice } = useGlobal();
  const { isLoggedIn, loggedInUser } = useUsers();
  const { service, fetchServiceDetail, error } = useServices();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] =
    useState<boolean>(false);

  const handleOpenBookServiceModal = () => setIsBookServiceModalOpen(true);
  const handleCloseBookServiceModal = () => setIsBookServiceModalOpen(false);

  useEffect(() => {
    if (!slug) return;
    fetchServiceDetail(slug);
  }, [slug]);

  useEffect(() => {
    if (service) {
      setImageUrl(getImageUrlByServiceCategory(service?.category?.name));
      setPrice(formattedPrice(service.price));
    }
  }, [service]);

  const handleBooking = () => {
    if (!service) return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    handleOpenBookServiceModal();
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
          itemType="service"
          imageUrl={imageUrl}
          price={price}
          onClick={handleBooking}
        />

        {isLoggedIn && loggedInUser?.role?.name.toLowerCase() === "adopter" && (
          <ContactPersonCard itemType="service" data={service?.provider} />
        )}
      </div>

      {isLoggedIn && loggedInUser?.role?.name.toLowerCase() === "adopter" && (
        <BookServiceModal
          title="Book Service"
          message="Please input the booking date"
          isModalOpen={isBookServiceModalOpen}
          onClose={handleCloseBookServiceModal}
        />
      )}

      <MessageModal title="Book Service" message="Service has been booked" />
    </NormalContent>
  );
};

export default ServiceDetail;
