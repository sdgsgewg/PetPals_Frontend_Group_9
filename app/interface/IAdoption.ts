export enum AdoptionStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

interface IAdoption {
  adoption_id: number;
  adopter_id: number;
  pet_id: number;
  adoption_date: string;
  status: AdoptionStatus;
}

export default IAdoption;
