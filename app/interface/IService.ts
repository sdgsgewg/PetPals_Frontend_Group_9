import IUser from "./IUser";

interface IService {
  serviceId: number;
  providerName: string;
  providerPhone: string;
  name: string;
  slug: string;
  categoryName: string;
  description: string;
  price: number;
  address: string;
  city: string;
  provider: IUser;
}

export default IService;
