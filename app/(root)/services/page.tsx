"use client";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import ServiceHero from "@/app/components/Services/ServiceHero";
import ServiceList from "@/app/components/Services/ServiceList";
import { useServices } from "@/app/context/ServicesContext";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Services = () => {
  const { services, filters, fetchServices, error } = useServices();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(filters.searchValue);
    },
    500,
    [filters.searchValue]
  );

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [debouncedSearchTerm]);

  return (
    <>
      {error ? (
        <NormalContent>
          <PageNotFound image_url="/img/page-not-found.png" message="" />
        </NormalContent>
      ) : (
        <BigHeroContent>
          <ServiceHero />
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
            <ServiceList filteredServices={services} />
          </div>
        </BigHeroContent>
      )}
    </>
  );
};

export default Services;
