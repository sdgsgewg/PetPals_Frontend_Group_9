"use client";
import ContactPersonCard from "@/app/components/Cards/ContactPersonCard";
import ItemDetailCard from "@/app/components/Cards/ItemDetailCard";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import BookServiceModal from "@/app/components/modals/BookServiceModal";
import MessageModal from "@/app/components/modals/MessageModal";
import PageNotFound from "@/app/components/PageNotFound";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ServiceDetail = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const router = useRouter();

  const { isLoggedIn } = useUsers();
  const { service, fetchServiceDetail, loading, error } = useServices();

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
      setImageUrl(getImageUrl());
      setPrice(service.price?.toLocaleString("id-ID") || "0");
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

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  if (error || !service) {
    return (
      <NormalContent>
        <PageNotFound
          image_url="/img/page-not-found.png"
          message="Pet not found"
        />
      </NormalContent>
    );
  }

  const getImageUrl = () => {
    if (!service?.categoryName) return null;
    const modifiedCategoryName =
      service.categoryName
        ?.split(" ")
        .map((word) => word.toLowerCase())
        .join("-") || "";
    return `/img/services/${modifiedCategoryName}.jpg`;
  };

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

        {/* Owner Information */}
        <ContactPersonCard itemType="service" data={service?.provider} />
      </div>

      <BookServiceModal
        title="Book Service"
        message="Please input the booking date"
        isModalOpen={isBookServiceModalOpen}
        onClose={handleCloseBookServiceModal}
      />

      <MessageModal title="Book Service" message="Service has been booked" />
    </NormalContent>
  );
};

export default ServiceDetail;
