import { VehicleProfile } from "../pages/VehicleProfilesPage";
import { url } from "../data/Api";

export default async function fetchVehicleProfiles(
  setProfiles: React.Dispatch<React.SetStateAction<VehicleProfile[]>>,
  setError: React.Dispatch<React.SetStateAction<Error | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    const response = await fetch(`${url}/getVehicleProfiles`);

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const result = await response.json();
    setProfiles(result[0]);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "An error occurred");
    setError(error instanceof Error ? error : new Error("An error occurred"));
  } finally {
    setIsLoading(false);
  }
}
