export type ServiceCategory =
  | "Cleaning"
  | "Dishwashing"
  | "Cooking"
  | "Laundry"
  | "Event Helper";

export type VerificationBadge = "Phone Verified" | "ID Verified" | "Background Checked";

export type Worker = {
  id: string;
  name: string;
  area: string;
  services: ServiceCategory[];
  ratePerHourNpr: number;
  rating: number;
  completedJobs: number;
  availableNow: boolean;
  badges: VerificationBadge[];
  about: string;
  yearsExperience: number;
};

export type BookingStatus =
  | "Requested"
  | "Accepted"
  | "Enroute"
  | "Started"
  | "Completed"
  | "Declined";

export type Booking = {
  id: string;
  customerName: string;
  workerId: string;
  service: ServiceCategory;
  dateTime: string;
  durationHours: number;
  address: string;
  notes: string;
  status: BookingStatus;
  rating?: number;
  review?: string;
};

export type RatingInput = {
  bookingId: string;
  stars: number;
  review: string;
};
