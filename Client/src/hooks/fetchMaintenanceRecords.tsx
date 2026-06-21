import { url } from "../data/Api";

interface MaintenanceRecord {
  MaintenanceID: number;
  Type: string;
  Date: string;
  Cost: number;
  Brand: string;
  Notes: string;
  Mileage: number;
  // Add other fields as needed based on your data structure
}

export default async function fetchMaintenanceRecords(
  vehicleProfileID: number,
  setRecords: (records: MaintenanceRecord[]) => void
) {
  try {
    const response = await fetch(
      `${url}/getMaintenanceRecords/${vehicleProfileID}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch maintenance records");
    }

    const data = (await response.json()) as MaintenanceRecord[];
    setRecords(data);
  } catch (error) {
    console.error("Error fetching maintenance records:", error);
    throw error;
  }
}
