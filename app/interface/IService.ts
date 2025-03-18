export enum ServiceCategory {
  Grooming = "grooming",
  Penitipan = "penitipan",
  Pelatihan = "pelatihan",
}

interface IService {
  serviceId: number;
  provider_id: number;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
}

export default IService;
