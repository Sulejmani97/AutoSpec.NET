import { url } from "../data/Api";

interface Record {
      VehicleProfileID: number;
      maintenanceType: string;
      date: string;
      cost: number;
      brand: string;
      notes: string;
      mileage: number;
}

export default async function createMaintenanceRecord(record: Record) {
  try {
    const response = await fetch(`${url}/createMaintenanceRecord`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return;
    }
  } catch (error) {
    console.error("Error creating maintenance record:", error);
  }
}
