import IUser from "../user/IUser";

interface IService {
  serviceId: number;
  categoryId: number;
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
