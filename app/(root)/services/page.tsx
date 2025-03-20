"use client";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import ItemNotFound from "@/app/components/PageNotFound";
import ServiceHero from "@/app/components/Services/ServiceHero";
import ServiceList from "@/app/components/Services/ServiceList";
import { useGlobal } from "@/app/context/GlobalContext";
import IService from "@/app/interface/IService";
import Loading from "@/app/loading";
import React, { useCallback, useEffect, useState } from "react";

const Services = () => {
  const { services } = useGlobal();

  const [service, setService] = useState<string>("");
  const [filteredServices, setFilteredServices] =
    useState<IService[]>(services);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchServices = useCallback((searchQuery: string = "") => {
    try {
      setLoading(true);
      setError(false);

      let filtered = [];
      filtered = services.filter(
        (svc) => svc.category.toLowerCase() === service.toLowerCase()
      );

      setFilteredServices(filtered);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <>
      {loading ? (
        <NormalContent>
          <Loading />
        </NormalContent>
      ) : error ? (
        <NormalContent>
          <ItemNotFound
            image_url="/img/pet-not-found.png"
            size={350}
            message=""
          />
        </NormalContent>
      ) : (
        <BigHeroContent>
          <ServiceHero fetchServices={fetchServices} />
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-20">
            <ServiceList filteredServices={filteredServices} />
          </div>
        </BigHeroContent>
      )}
    </>
  );
};

export default Services;
