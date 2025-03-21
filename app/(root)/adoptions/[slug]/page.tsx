"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/PetsContext";
import Loading from "@/app/loading";
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

  return (
    <>
      {loading ? (
        <NormalContent>
          <Loading />
        </NormalContent>
      ) : error ? (
        <NormalContent>
          <PageNotFound image_url="/img/page-not-found.png" message="" />
        </NormalContent>
      ) : (
        <NormalContent>
          <div>
            <h1 className="text-black">{pet.name}</h1>
          </div>
        </NormalContent>
      )}
    </>
  );
};

export default PetDetail;
