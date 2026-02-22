export type ServiceType =
  | "Cleaning"
  | "Cooking"
  | "Dishwashing"
  | "Laundry"
  | "Event Help";

export type Worker = {
  id: string;
  name: string;
  service: ServiceType;
  rating: number;
  completedJobs: number;
  pricePerHourNpr: number;
  availableNow: boolean;
  location: string;
  about: string;
};
