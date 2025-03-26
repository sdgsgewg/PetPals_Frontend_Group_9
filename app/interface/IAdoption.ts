export enum AdoptionStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

interface IAdoption {
  adoptionId: number;
  adopterId: number;
  petId: number;
  adoption_date: string;
  status: AdoptionStatus;
}

export default IAdoption;
