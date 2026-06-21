import { url } from "../data/Api";

export default async function deleteMaintenanceRecord(
  maintenanceRecordID: number
) {
  try {
    const response = await fetch(
      `${url}/deleteMaintenanceRecord/${maintenanceRecordID}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete maintenance record");
    }

    return true;
  } catch (error) {
    console.error("Error deleting maintenance record:", error);
    throw error;
  }
}
