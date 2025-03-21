"use client";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { useServices } from "@/app/context/ServicesContext";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ServiceDetail = () => {
  const params = useParams();
  const slug = params.slug as string;

  const { service, fetchServiceDetail, loading, error } = useServices();

  useEffect(() => {
    if (!slug) return;
    fetchServiceDetail(slug);
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
            <h1 className="text-black">{service.name}</h1>
          </div>
        </NormalContent>
      )}
    </>
  );
};

export default ServiceDetail;
