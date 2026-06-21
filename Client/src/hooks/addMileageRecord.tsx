import { url } from "../data/Api";

export async function addMileageRecord(
  vehicleProfileId: number,
  mileage: number,
  notes?: string
) {
  try {
    const response = await fetch(`${url}/addMileageRecord`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleProfileId,
        mileage,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Couldn't add mileage record:", error);
    throw error;
  }
}
