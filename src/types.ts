export interface FoodTruck {
  applicant: string;
  address: string;
  status: string;
  fooditems?: string;
  latitude?: string;
  longitude?: string;
  distance_km?: number; // 👈 optional field, computed in frontend
}