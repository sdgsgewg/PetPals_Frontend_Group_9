import IPet from "./IPet";
import IService from "./IService";

export interface ITransaction {
  transactionId: number;
  transactionType: string;
  petOrServiceName: string;
  bookingDate: string;
  price: string;
  item: IPet | IService;
}
