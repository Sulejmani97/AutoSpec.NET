import { url } from "../data/Api";

export async function fetchMileageRecords(vehicleProfileId: number) {
  try {
    const response = await fetch(
      `${url}/getMileageRecords/${vehicleProfileId}`
    );

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Couldn't fetch mileage records:", error);
    throw error;
  }
}
