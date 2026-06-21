import { url } from "../data/Api";
import { VehicleProfile } from "../pages/VehicleProfilesPage";

import fetchVehicleProfiles from "./fetchVehicleProfiles";

export default async function deleteVehicleProfile(
  id: number,
  setProfiles: React.Dispatch<React.SetStateAction<VehicleProfile[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await fetch(`${url}/deleteVehicleProfile?id=${id}`, {
      method: "delete",
    });

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    await fetchVehicleProfiles(setProfiles, setError, setIsLoading);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}
